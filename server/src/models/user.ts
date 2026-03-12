import mongoose, { Schema } from "mongoose";

const AdminPermissionsSchema = new Schema(
  {
    manageProducts: { type: Boolean, default: true },
    manageOrders: { type: Boolean, default: true },
    manageUsers: { type: Boolean, default: false },
    manageCategories: { type: Boolean, default: true },
    viewReports: { type: Boolean, default: true },
    manageSiteSettings: { type: Boolean, default: false }
  },
  { _id: false }
);

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["customer", "admin", "superadmin"], default: "customer" },
    phone: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
    adminPermissions: { type: AdminPermissionsSchema },
    lastLogin: { type: Date },
    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date }
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
