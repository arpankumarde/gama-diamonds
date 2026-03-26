import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICartItem {
  productId: string;
  productSlug: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  diamondType: string;
  metal: string;
  size?: string;
  carat?: string | number;
}

export interface IAdminPermissions {
  manageProducts?: boolean;
  manageOrders?: boolean;
  manageUsers?: boolean;
  manageCategories?: boolean;
  viewReports?: boolean;
  manageSiteSettings?: boolean;
}

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: "customer" | "admin" | "superadmin";
  phone?: string | null;
  isActive: boolean;
  adminPermissions?: IAdminPermissions | null;
  lastLogin?: Date | null;
  loginAttempts: number;
  lockUntil?: Date | null;
  cart: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

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

const CartItemSchema = new Schema(
  {
    productId: { type: String, required: true },
    productSlug: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 },
    diamondType: { type: String, required: true },
    metal: { type: String, required: true },
    size: { type: String },
    carat: { type: Schema.Types.Mixed }
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
    lockUntil: { type: Date },
    cart: [CartItemSchema]
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
