import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CurrencyCode = "USD" | "EUR" | "INR";

export const supportedCurrencies: {
  code: CurrencyCode;
  label: string;
}[] = [
  { code: "USD", label: "USD ($)" },
  { code: "EUR", label: "EUR (€)" },
  { code: "INR", label: "INR (₹)" },
];

const STORAGE_KEY = "gama.currency";

const defaultRatesFromUSD: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  INR: 83,
};

type CurrencyContextValue = {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  convertFromUSD: (amountUSD: number) => number;
  formatPriceFromUSD: (amountUSD: number) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

function isCurrencyCode(value: string): value is CurrencyCode {
  return value === "USD" || value === "EUR" || value === "INR";
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && isCurrencyCode(saved)) return saved;
    } catch {
      // ignore
    }
    return "USD";
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, currency);
    } catch {
      // ignore
    }
  }, [currency]);

  const setCurrency = useCallback((next: CurrencyCode) => {
    setCurrencyState(next);
  }, []);

  const rate = defaultRatesFromUSD[currency];

  const convertFromUSD = useCallback(
    (amountUSD: number) => amountUSD * rate,
    [rate],
  );

  const formatter = useMemo(() => {
    const locale = currency === "INR" ? "en-IN" : "en-US";
    const fractionDigits = currency === "INR" ? 0 : 2;
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      currencyDisplay: "narrowSymbol",
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    });
  }, [currency]);

  const formatPriceFromUSD = useCallback(
    (amountUSD: number) => formatter.format(convertFromUSD(amountUSD)),
    [convertFromUSD, formatter],
  );

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      setCurrency,
      convertFromUSD,
      formatPriceFromUSD,
    }),
    [currency, setCurrency, convertFromUSD, formatPriceFromUSD],
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}

