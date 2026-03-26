import type { DropdownOption } from "../ui/luxury-dropdown";
import {
  Truck,
  Clock3,
  Layers3,
  Undo2,
  RefreshCcw,
  FileCheck,
  type LucideIcon,
} from "lucide-react";

export const fingerSizeOptions: DropdownOption[] = [
  { value: "D", label: "D" },
  { value: "E", label: "E" },
  { value: "F", label: "F - (14mm)" },
  { value: "G", label: "G - (14.3mm)" },
  { value: "H", label: "H - (14.7mm)" },
  { value: "I", label: "I - (14.9mm)" },
  { value: "J", label: "J - (15.3mm)" },
  { value: "K", label: "K - (15.5mm)" },
  { value: "L", label: "L - (15.9mm)" },
  { value: "M", label: "M - (16.1mm)" },
  { value: "N", label: "N - (16.5mm)" },
  { value: "O", label: "O - (16.7mm)" },
  { value: "P", label: "P - (17.1mm)" },
  { value: "Q", label: "Q - (17.3mm)" },
  { value: "R", label: "R - (17.7mm)" },
  { value: "S", label: "S - (17.9mm)" },
  { value: "T", label: "T - (18.3mm)" },
  { value: "U", label: "U - (18.5mm)" },
  { value: "V", label: "V - (18.9mm)" },
  { value: "W", label: "W - (19.1mm)" },
  { value: "X", label: "X - (19.5mm)" },
  { value: "Y", label: "Y - (19.7mm)" },
  { value: "Z", label: "Z - (20mm)" },
];

export const diamondTypeOptions: DropdownOption[] = [
  { value: "Lab Grown", label: "Lab Grown Diamond" },
  { value: "Natural", label: "Natural Diamond" },
];

export const sizeGuideRows = [
  [
    { size: "F", mm: "14mm" },
    { size: "G", mm: "14.3mm" },
    { size: "H", mm: "14.7mm" },
    { size: "I", mm: "15.1mm" },
    { size: "J", mm: "15.5mm" },
    { size: "K", mm: "15.9mm" },
    { size: "L", mm: "16.3mm" },
    { size: "M", mm: "16.7mm" },
    { size: "N", mm: "17.1mm" },
  ],
  [
    { size: "O", mm: "17.5mm" },
    { size: "P", mm: "17.9mm" },
    { size: "Q", mm: "18.3mm" },
    { size: "R", mm: "18.8mm" },
    { size: "S", mm: "19.2mm" },
    { size: "T", mm: "19.6mm" },
    { size: "U", mm: "20.0mm" },
  ],
  [
    { size: "V", mm: "20.4mm" },
    { size: "W", mm: "20.8mm" },
    { size: "X", mm: "21.2mm" },
    { size: "Y", mm: "21.6mm" },
    { size: "Z", mm: "21.8mm" },
  ],
];

export const coverageFeatures: { icon: LucideIcon; text: string; size: number }[] = [
  { icon: Truck, text: "Shipping and Delivery", size: 38 },
  { icon: Clock3, text: "Jewellery Care Guide", size: 38 },
  { icon: Layers3, text: "Diamond Knowledge", size: 38 },
  { icon: Undo2, text: "Returns & Refund Policy", size: 38 },
  { icon: RefreshCcw, text: "30 Day Exchange", size: 46 },
  { icon: FileCheck, text: "1 Year Warranty", size: 46 },
];
