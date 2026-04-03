import mongoose from "mongoose";

function parseBooleanEnv(value: string | undefined): boolean | undefined {
    if (value === undefined) return undefined;
    const normalized = value.trim().toLowerCase();
    if (["1", "true", "yes", "y", "on"].includes(normalized)) return true;
    if (["0", "false", "no", "n", "off"].includes(normalized)) return false;
    return undefined;
}

function parsePositiveIntEnv(value: string | undefined): number | undefined {
    if (value === undefined) return undefined;
    const parsed = Number.parseInt(value, 10);
    if (!Number.isFinite(parsed) || parsed < 0) return undefined;
    return parsed;
}

function formatMongoConnectError(error: unknown): string {
    if (error && typeof error === "object") {
        const anyError = error as Record<string, unknown>;
        const code = typeof anyError.code === "string" ? anyError.code : undefined;
        const syscall = typeof anyError.syscall === "string" ? anyError.syscall : undefined;
        const hostname = typeof anyError.hostname === "string" ? anyError.hostname : undefined;

        if (syscall === "querySrv" && hostname && (code === "ECONNREFUSED" || code === "ENOTFOUND" || code === "ETIMEOUT")) {
            return [
                `DNS SRV lookup failed for ${hostname} (code=${code}).`,
                "This is usually caused by VPN/corporate DNS, captive portals, or blocked DNS queries.",
                "Fix: switch DNS (1.1.1.1/8.8.8.8), disconnect VPN, or use Atlas 'Standard connection string' (mongodb://...) instead of mongodb+srv://.",
            ].join(" ");
        }
    }

    if (error instanceof Error) return error.message;
    try {
        return JSON.stringify(error);
    } catch {
        return String(error);
    }
}

async function connectToDatabase(): Promise<void> {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        console.error("MONGO_URI is not defined in environment variables");
        process.exit(1);
    }

    if (mongoose.connection.readyState === 1) {
        console.log("Connected to MongoDB");
        return;
    }

    const isProd = process.env.NODE_ENV === "production";
    const exitOnFail = parseBooleanEnv(process.env.MONGO_CONNECT_EXIT_ON_FAIL) ?? isProd;
    const maxRetries = parsePositiveIntEnv(process.env.MONGO_CONNECT_RETRIES) ?? (exitOnFail ? 5 : Number.POSITIVE_INFINITY);
    const baseDelayMs = parsePositiveIntEnv(process.env.MONGO_CONNECT_RETRY_DELAY_MS) ?? 2000;
    const maxDelayMs = parsePositiveIntEnv(process.env.MONGO_CONNECT_RETRY_MAX_DELAY_MS) ?? 30000;

    let attempt = 0;
    let delayMs = baseDelayMs;

    while (attempt <= maxRetries) {
        attempt += 1;
        try {
            await mongoose.connect(mongoUri, {
                serverSelectionTimeoutMS: 10_000,
            });
            console.log("Connected to MongoDB");
            return;
        } catch (error) {
            const message = formatMongoConnectError(error);
            const retriesLeft = Number.isFinite(maxRetries) ? Math.max(0, maxRetries - attempt) : undefined;
            console.error(`[MongoDB] Connection attempt ${attempt} failed: ${message}`);

            if (attempt > maxRetries) break;

            const retryNote =
                retriesLeft === undefined
                    ? `Retrying in ${delayMs}ms...`
                    : `Retrying in ${delayMs}ms... (${retriesLeft} retries left)`;
            console.error(`[MongoDB] ${retryNote}`);

            await new Promise((resolve) => setTimeout(resolve, delayMs));
            delayMs = Math.min(Math.round(delayMs * 1.5), maxDelayMs);
        }
    }

    console.error("[MongoDB] Failed to connect after retries.");
    if (exitOnFail) process.exit(1);
}

export default connectToDatabase;
