import { useState, useEffect } from "react";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const CUSTOMERS = [
  { id: "CUS-001", name: "Rajan Mehta", phone: "9876543210", email: "rajan@email.com", address: "12, MG Road, Mumbai", joinDate: "2024-01-15", jobs: 3 },
  { id: "CUS-002", name: "Priya Sharma", phone: "9812345678", email: "priya@email.com", address: "45, Andheri West, Mumbai", joinDate: "2024-02-20", jobs: 1 },
  { id: "CUS-003", name: "Anil Kumar", phone: "9898765432", email: "anil@email.com", address: "78, Bandra East, Mumbai", joinDate: "2024-03-05", jobs: 2 },
  { id: "CUS-004", name: "Sunita Patel", phone: "9765432109", email: "sunita@email.com", address: "23, Thane West", joinDate: "2024-03-18", jobs: 4 },
  { id: "CUS-005", name: "Vikram Singh", phone: "9654321098", email: "vikram@email.com", address: "56, Powai, Mumbai", joinDate: "2024-04-01", jobs: 1 },
  { id: "CUS-006", name: "Meena Reddy", phone: "9543210987", email: "meena@email.com", address: "34, Juhu, Mumbai", joinDate: "2024-04-12", jobs: 2 },
  { id: "CUS-007", name: "Deepak Joshi", phone: "9432109876", email: "deepak@email.com", address: "67, Malad West", joinDate: "2024-05-03", jobs: 1 },
  { id: "CUS-008", name: "Kavita Nair", phone: "9321098765", email: "kavita@email.com", address: "89, Kandivali East", joinDate: "2024-05-20", jobs: 3 },
  { id: "CUS-009", name: "Ramesh Gupta", phone: "9210987654", email: "ramesh@email.com", address: "12, Borivali West", joinDate: "2024-06-01", jobs: 1 },
  { id: "CUS-010", name: "Anita Desai", phone: "9109876543", email: "anita@email.com", address: "45, Goregaon East", joinDate: "2024-06-15", jobs: 2 },
];

const TECHNICIANS = [
  { id: "TECH-001", name: "Suresh K.", specialty: "LED/LCD TVs", activeJobs: 3, status: "Busy", avatar: "SK" },
  { id: "TECH-002", name: "Mahesh R.", specialty: "OLED/QLED", activeJobs: 1, status: "Available", avatar: "MR" },
  { id: "TECH-003", name: "Dinesh P.", specialty: "CRT & Projectors", activeJobs: 2, status: "Busy", avatar: "DP" },
  { id: "TECH-004", name: "Rajesh N.", specialty: "Smart TVs", activeJobs: 0, status: "Available", avatar: "RN" },
  { id: "TECH-005", name: "Girish V.", specialty: "All Types", activeJobs: 4, status: "Busy", avatar: "GV" },
];

const JOBS_INIT = [
  { id: "JOB-001", customerId: "CUS-001", customerName: "Rajan Mehta", device: "Sony Bravia 55\"", complaint: "No display", techId: "TECH-001", techName: "Suresh K.", status: "In Diagnosis", diagFee: 375, estAmount: 2800, payStatus: "Partial", createdAt: "2024-06-01", priority: "High", model: "KD-55X80J" },
  { id: "JOB-002", customerId: "CUS-002", customerName: "Priya Sharma", device: "LG OLED 65\"", complaint: "Intermittent flickering", techId: "TECH-002", techName: "Mahesh R.", status: "Estimation Pending", diagFee: 375, estAmount: 0, payStatus: "Paid", createdAt: "2024-06-02", priority: "Medium", model: "OLED65C1" },
  { id: "JOB-003", customerId: "CUS-003", customerName: "Anil Kumar", device: "Samsung QLED 43\"", complaint: "Remote not working + dim screen", techId: "TECH-001", techName: "Suresh K.", status: "Awaiting Approval", diagFee: 375, estAmount: 1450, payStatus: "Pending", createdAt: "2024-06-03", priority: "Low", model: "QA43Q60A" },
  { id: "JOB-004", customerId: "CUS-004", customerName: "Sunita Patel", device: "Panasonic 40\" LED", complaint: "Dead pixels", techId: "TECH-004", techName: "Rajesh N.", status: "QC Pending", diagFee: 375, estAmount: 3200, payStatus: "Paid", createdAt: "2024-06-04", priority: "High", model: "TH-40GS655D" },
  { id: "JOB-005", customerId: "CUS-005", customerName: "Vikram Singh", device: "Hisense 50\" 4K", complaint: "Sound but no picture", techId: "TECH-003", techName: "Dinesh P.", status: "Repair In Progress", diagFee: 375, estAmount: 1900, payStatus: "Partial", createdAt: "2024-06-05", priority: "Medium", model: "50A7GQ" },
  { id: "JOB-006", customerId: "CUS-006", customerName: "Meena Reddy", device: "TCL 32\" Smart TV", complaint: "WiFi not connecting", techId: "TECH-002", techName: "Mahesh R.", status: "Dispatched", diagFee: 375, estAmount: 800, payStatus: "Paid", createdAt: "2024-06-06", priority: "Low", model: "32S6500S" },
  { id: "JOB-007", customerId: "CUS-007", customerName: "Deepak Joshi", device: "Philips 55\" OLED", complaint: "Power cycling issue", techId: "TECH-005", techName: "Girish V.", status: "Parts Ordered", diagFee: 375, estAmount: 4100, payStatus: "Pending", createdAt: "2024-06-07", priority: "High", model: "55OLED706" },
  { id: "JOB-008", customerId: "CUS-008", customerName: "Kavita Nair", device: "Sony 32\" Bravia", complaint: "Vertical lines on screen", techId: "TECH-004", techName: "Rajesh N.", status: "Completed", diagFee: 375, estAmount: 2200, payStatus: "Paid", createdAt: "2024-06-08", priority: "Medium", model: "KD-32W830K" },
  { id: "JOB-009", customerId: "CUS-009", customerName: "Ramesh Gupta", device: "Mi TV 4A 43\"", complaint: "Remote pairing issue", techId: "TECH-003", techName: "Dinesh P.", status: "Received", diagFee: 375, estAmount: 0, payStatus: "Pending", createdAt: "2024-06-09", priority: "Low", model: "L43M6-EI" },
  { id: "JOB-010", customerId: "CUS-010", customerName: "Anita Desai", device: "Vu 55\" Premium", complaint: "HDMI port damaged", techId: "TECH-005", techName: "Girish V.", status: "Estimation Pending", diagFee: 375, estAmount: 0, payStatus: "Paid", createdAt: "2024-06-10", priority: "Medium", model: "55UT" },
  { id: "JOB-011", customerId: "CUS-001", customerName: "Rajan Mehta", device: "LG 43\" LED", complaint: "No audio", techId: "TECH-001", techName: "Suresh K.", status: "Completed", diagFee: 375, estAmount: 950, payStatus: "Paid", createdAt: "2024-05-20", priority: "Low", model: "43UP7750PTB" },
  { id: "JOB-012", customerId: "CUS-004", customerName: "Sunita Patel", device: "Samsung 65\" QLED", complaint: "Smart features not working", techId: "TECH-002", techName: "Mahesh R.", status: "Repair In Progress", diagFee: 375, estAmount: 1700, payStatus: "Partial", createdAt: "2024-06-11", priority: "Medium", model: "QA65Q80A" },
];

const INVENTORY = [
  { id: "INV-001", name: "T-CON Board (Samsung)", category: "Boards", qty: 5, minQty: 2, unitCost: 1200, supplier: "ElecParts India" },
  { id: "INV-002", name: "Main Board (Sony Bravia)", category: "Boards", qty: 2, minQty: 3, unitCost: 2100, supplier: "SonyService Hub" },
  { id: "INV-003", name: "Power Supply Board (LG)", category: "Boards", qty: 8, minQty: 3, unitCost: 900, supplier: "LG Service Parts" },
  { id: "INV-004", name: "LED Backlight Strip 55\"", category: "Display", qty: 1, minQty: 4, unitCost: 650, supplier: "Display World" },
  { id: "INV-005", name: "LED Backlight Strip 43\"", category: "Display", qty: 6, minQty: 3, unitCost: 450, supplier: "Display World" },
  { id: "INV-006", name: "IR Sensor Module", category: "Components", qty: 15, minQty: 5, unitCost: 120, supplier: "ElecParts India" },
  { id: "INV-007", name: "HDMI Port Replacement", category: "Components", qty: 20, minQty: 8, unitCost: 180, supplier: "ConnectPro" },
  { id: "INV-008", name: "Speaker (8W Pair)", category: "Audio", qty: 4, minQty: 3, unitCost: 350, supplier: "AudioFix Co." },
  { id: "INV-009", name: "Remote Control (Universal)", category: "Accessories", qty: 12, minQty: 5, unitCost: 220, supplier: "Remote King" },
  { id: "INV-010", name: "Capacitor Kit (Mixed)", category: "Components", qty: 50, minQty: 20, unitCost: 45, supplier: "ElecParts India" },
  { id: "INV-011", name: "OLED Panel 55\"", category: "Display", qty: 0, minQty: 1, unitCost: 18000, supplier: "PanelPro" },
  { id: "INV-012", name: "WiFi Module", category: "Components", qty: 7, minQty: 4, unitCost: 380, supplier: "ConnectPro" },
  { id: "INV-013", name: "Thermal Paste", category: "Consumables", qty: 30, minQty: 10, unitCost: 60, supplier: "TechSupplies" },
  { id: "INV-014", name: "LVDS Cable", category: "Cables", qty: 3, minQty: 5, unitCost: 280, supplier: "CableMart" },
  { id: "INV-015", name: "Scaler Board (Universal)", category: "Boards", qty: 2, minQty: 3, unitCost: 750, supplier: "ElecParts India" },
  { id: "INV-016", name: "Stand/Pedestal 32\"", category: "Accessories", qty: 0, minQty: 2, unitCost: 420, supplier: "TVStands Plus" },
  { id: "INV-017", name: "Remote Control (Sony OEM)", category: "Accessories", qty: 5, minQty: 3, unitCost: 480, supplier: "SonyService Hub" },
  { id: "INV-018", name: "Power Cord (IEC)", category: "Cables", qty: 18, minQty: 8, unitCost: 95, supplier: "CableMart" },
  { id: "INV-019", name: "Screen Cleaning Kit", category: "Consumables", qty: 22, minQty: 10, unitCost: 85, supplier: "TechSupplies" },
  { id: "INV-020", name: "Coax Cable F-Type", category: "Cables", qty: 9, minQty: 4, unitCost: 75, supplier: "CableMart" },
];

const VENDORS = [
  { id: "VND-001", name: "ElecParts India", contact: "9876500001", category: "Electronics", rating: 4.8 },
  { id: "VND-002", name: "Display World", contact: "9876500002", category: "Display Components", rating: 4.5 },
  { id: "VND-003", name: "ConnectPro", contact: "9876500003", category: "Connectivity", rating: 4.2 },
  { id: "VND-004", name: "SonyService Hub", contact: "9876500004", category: "OEM Parts", rating: 4.9 },
  { id: "VND-005", name: "LG Service Parts", contact: "9876500005", category: "OEM Parts", rating: 4.7 },
];

const PRS_INIT = [
  { id: "PR-001", item: "LED Backlight Strip 55\"", qty: 5, status: "Approved", createdBy: "Girish V.", date: "2024-06-07", poId: "PO-001" },
  { id: "PR-002", item: "OLED Panel 55\"", qty: 1, status: "Pending", createdBy: "Suresh K.", date: "2024-06-09", poId: null },
  { id: "PR-003", item: "LVDS Cable", qty: 4, status: "PO Raised", createdBy: "Mahesh R.", date: "2024-06-10", poId: "PO-002" },
];

// ─── STATUS COLORS ─────────────────────────────────────────────────────────────
const STATUS_COLORS = {
  "Received": { bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE" },
  "In Diagnosis": { bg: "#FFF7ED", text: "#C2410C", border: "#FED7AA" },
  "Estimation Pending": { bg: "#FEFCE8", text: "#854D0E", border: "#FDE68A" },
  "Awaiting Approval": { bg: "#FDF4FF", text: "#7E22CE", border: "#E9D5FF" },
  "Parts Ordered": { bg: "#EFF6FF", text: "#1E40AF", border: "#BFDBFE" },
  "Repair In Progress": { bg: "#F0FDF4", text: "#15803D", border: "#BBF7D0" },
  "QC Pending": { bg: "#FFF7ED", text: "#D97706", border: "#FDE68A" },
  "Dispatched": { bg: "#F0FDF4", text: "#065F46", border: "#A7F3D0" },
  "Completed": { bg: "#F9FAFB", text: "#374151", border: "#E5E7EB" },
  "Available": { bg: "#F0FDF4", text: "#15803D", border: "#BBF7D0" },
  "Busy": { bg: "#FFF7ED", text: "#C2410C", border: "#FED7AA" },
  "Paid": { bg: "#F0FDF4", text: "#15803D", border: "#BBF7D0" },
  "Partial": { bg: "#FEFCE8", text: "#854D0E", border: "#FDE68A" },
  "Pending": { bg: "#FEF2F2", text: "#B91C1C", border: "#FECACA" },
  "Approved": { bg: "#F0FDF4", text: "#15803D", border: "#BBF7D0" },
  "PO Raised": { bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE" },
  "High": { bg: "#FEF2F2", text: "#B91C1C", border: "#FECACA" },
  "Medium": { bg: "#FEFCE8", text: "#854D0E", border: "#FDE68A" },
  "Low": { bg: "#F0FDF4", text: "#15803D", border: "#BBF7D0" },
};

const Badge = ({ status, size = "sm" }) => {
  const c = STATUS_COLORS[status] || { bg: "#F3F4F6", text: "#6B7280", border: "#E5E7EB" };
  const pad = size === "sm" ? "2px 8px" : "4px 12px";
  return (
    <span style={{
      background: c.bg, color: c.text, border: `1px solid ${c.border}`,
      borderRadius: 20, padding: pad, fontSize: size === "sm" ? 11 : 12,
      fontWeight: 600, whiteSpace: "nowrap", display: "inline-block"
    }}>{status}</span>
  );
};

// ─── ICONS (SVG inline) ────────────────────────────────────────────────────────
const Icon = ({ name, size = 18, color = "currentColor" }) => {
  const paths = {
    dashboard: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
    customers: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
    jobs: "M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z",
    inventory: "M20 6h-2.18c.07-.44.18-.88.18-1.3 0-2.58-2.1-4.7-4.68-4.7-1.3 0-2.48.52-3.34 1.36C9.08 1.52 7.9 1 6.68 1 4.1 1 2 3.12 2 5.7c0 .42.11.86.18 1.3H0v14h24V6h-4zm-7.32-4c1.48 0 2.68 1.2 2.68 2.68 0 1.48-1.2 2.7-2.68 2.7H12V5.68C12 4.2 13.2 3 14.68 3H12.68zM6.68 3c1.48 0 2.68 1.2 2.68 2.68V8.38H6.68C5.2 8.38 4 7.18 4 5.7 4 4.22 5.2 3 6.68 3zM2 18V8h8v10H2zm10 0V8h10v10h-10z",
    billing: "M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z",
    qc: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z",
    dispatch: "M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z",
    bell: "M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z",
    search: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
    plus: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
    edit: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
    close: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
    check: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
    alert: "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z",
    arrow_right: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
    menu: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z",
    settings: "M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z",
    printer: "M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z",
    user: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
    whatsapp: "M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.817 9.817 0 0012.04 2z",
    truck: "M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ flexShrink: 0 }}>
      <path d={paths[name] || paths.dashboard} />
    </svg>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function DBOS() {
  const [activeModule, setActiveModule] = useState("dashboard");
  const [activeRole, setActiveRole] = useState("Admin");
  const [jobs, setJobs] = useState(JOBS_INIT);
  const [customers, setCustomers] = useState(CUSTOMERS);
  const [inventory, setInventory] = useState(INVENTORY);
  const [prs, setPrs] = useState(PRS_INIT);
  const [modal, setModal] = useState(null); // { type, data }
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifications] = useState(4);
  const [selectedJob, setSelectedJob] = useState(null);

  const ROLES = ["Admin", "Receptionist", "Technician", "Cashier", "Stores Manager", "QC Inspector"];

  const NAV_ITEMS = [
    { id: "dashboard", label: "Dashboard", icon: "dashboard" },
    { id: "customers", label: "Customer Intelligence", icon: "customers" },
    { id: "service", label: "Service Requests", icon: "jobs" },
    { id: "jobs", label: "Job Management", icon: "edit" },
    { id: "inventory", label: "Inventory & Procurement", icon: "inventory" },
    { id: "billing", label: "Billing & Payments", icon: "billing" },
    { id: "qc", label: "QC & Dispatch", icon: "qc" },
  ];

  const openModal = (type, data = {}) => setModal({ type, data });
  const closeModal = () => setModal(null);

  const addJob = (jobData) => {
    const newJob = { ...jobData, id: `JOB-0${jobs.length + 1}`, createdAt: new Date().toISOString().split("T")[0], estAmount: 0, payStatus: "Pending" };
    setJobs(prev => [newJob, ...prev]);
  };

  const updateJobStatus = (jobId, newStatus) => {
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: newStatus } : j));
  };

  const addCustomer = (cData) => {
    const newC = { ...cData, id: `CUS-0${String(customers.length + 1).padStart(2,"0")}`, joinDate: new Date().toISOString().split("T")[0], jobs: 0 };
    setCustomers(prev => [newC, ...prev]);
  };

  const lowStockItems = inventory.filter(i => i.qty < i.minQty);

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#F1F5F9", overflow: "hidden" }}>
      {/* SIDEBAR */}
      <aside style={{
        width: sidebarCollapsed ? 64 : 240, minWidth: sidebarCollapsed ? 64 : 240,
        background: "#0F172A", display: "flex", flexDirection: "column",
        transition: "width 0.2s", overflow: "hidden"
      }}>
        <div style={{ padding: "16px 12px", borderBottom: "1px solid #1E293B", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 13 }}>D</span>
          </div>
          {!sidebarCollapsed && <div>
            <div style={{ color: "#F1F5F9", fontWeight: 700, fontSize: 14, letterSpacing: -0.3 }}>DBOS</div>
            <div style={{ color: "#64748B", fontSize: 10 }}>Business Operating System</div>
          </div>}
        </div>

        <nav style={{ flex: 1, padding: "8px 0", overflowY: "auto" }}>
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => setActiveModule(item.id)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10,
              padding: sidebarCollapsed ? "10px 20px" : "10px 16px",
              background: activeModule === item.id ? "#1E3A5F" : "transparent",
              border: "none", cursor: "pointer", borderLeft: activeModule === item.id ? "3px solid #3B82F6" : "3px solid transparent",
              color: activeModule === item.id ? "#F1F5F9" : "#94A3B8",
              fontSize: 13, fontWeight: activeModule === item.id ? 600 : 400,
              transition: "all 0.15s", textAlign: "left", whiteSpace: "nowrap"
            }}>
              <Icon name={item.icon} size={18} color={activeModule === item.id ? "#60A5FA" : "#64748B"} />
              {!sidebarCollapsed && item.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: "12px", borderTop: "1px solid #1E293B" }}>
          <button onClick={() => setSidebarCollapsed(p => !p)} style={{
            width: "100%", padding: "8px", background: "transparent", border: "1px solid #334155",
            borderRadius: 6, color: "#64748B", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <Icon name="menu" size={16} color="#64748B" />
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* HEADER */}
        <header style={{
          background: "#fff", borderBottom: "1px solid #E2E8F0", padding: "0 24px",
          height: 56, display: "flex", alignItems: "center", gap: 16, flexShrink: 0
        }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ position: "relative", flex: 1, maxWidth: 360 }}>
              <Icon name="search" size={16} color="#94A3B8" />
              <input placeholder="Search customers, jobs, invoices..." style={{
                position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
                width: "100%", paddingLeft: 28, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
                border: "1px solid #E2E8F0", borderRadius: 8, fontSize: 13, color: "#374151",
                background: "#F8FAFC", outline: "none"
              }} />
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {lowStockItems.length > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 4, background: "#FEF2F2", padding: "4px 10px", borderRadius: 20, fontSize: 11, color: "#B91C1C", fontWeight: 600 }}>
                <Icon name="alert" size={14} color="#B91C1C" />
                {lowStockItems.length} Stock Alerts
              </div>
            )}
            <button style={{ position: "relative", background: "transparent", border: "none", cursor: "pointer", padding: 6 }}>
              <Icon name="bell" size={20} color="#64748B" />
              {notifications > 0 && <span style={{ position: "absolute", top: 2, right: 2, background: "#EF4444", color: "#fff", borderRadius: "50%", width: 14, height: 14, fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{notifications}</span>}
            </button>
            <select value={activeRole} onChange={e => setActiveRole(e.target.value)} style={{
              border: "1px solid #E2E8F0", borderRadius: 8, padding: "6px 10px", fontSize: 12,
              background: "#F8FAFC", color: "#374151", cursor: "pointer"
            }}>
              {ROLES.map(r => <option key={r}>{r}</option>)}
            </select>
            <div style={{ width: 32, height: 32, background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="user" size={16} color="#fff" />
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main style={{ flex: 1, overflowY: "auto", padding: 24 }}>
          {activeModule === "dashboard" && <DashboardScreen jobs={jobs} customers={customers} inventory={inventory} lowStockItems={lowStockItems} openModal={openModal} setActiveModule={setActiveModule} />}
          {activeModule === "customers" && <CustomersScreen customers={customers} jobs={jobs} openModal={openModal} />}
          {activeModule === "service" && <ServiceRequestsScreen jobs={jobs} openModal={openModal} updateJobStatus={updateJobStatus} />}
          {activeModule === "jobs" && <JobManagementScreen jobs={jobs} openModal={openModal} updateJobStatus={updateJobStatus} setSelectedJob={setSelectedJob} selectedJob={selectedJob} />}
          {activeModule === "inventory" && <InventoryScreen inventory={inventory} setInventory={setInventory} prs={prs} setPrs={setPrs} openModal={openModal} />}
          {activeModule === "billing" && <BillingScreen jobs={jobs} openModal={openModal} />}
          {activeModule === "qc" && <QCDispatchScreen jobs={jobs} updateJobStatus={updateJobStatus} openModal={openModal} />}
        </main>
      </div>

      {/* MODALS */}
      {modal && (
        <ModalOverlay onClose={closeModal}>
          {modal.type === "addCustomer" && <AddCustomerModal onClose={closeModal} onSave={addCustomer} />}
          {modal.type === "addJob" && <AddJobModal onClose={closeModal} onSave={addJob} customers={customers} />}
          {modal.type === "assignTech" && <AssignTechModal onClose={closeModal} job={modal.data.job} technicians={TECHNICIANS} onAssign={(jobId, tech) => { setJobs(prev => prev.map(j => j.id === jobId ? { ...j, techId: tech.id, techName: tech.name, status: "In Diagnosis" } : j)); closeModal(); }} />}
          {modal.type === "estimation" && <EstimationModal onClose={closeModal} job={modal.data.job} inventory={inventory} onSubmit={(jobId, est) => { setJobs(prev => prev.map(j => j.id === jobId ? { ...j, estAmount: est, status: "Awaiting Approval" } : j)); closeModal(); }} />}
          {modal.type === "approval" && <ApprovalModal onClose={closeModal} job={modal.data.job} onApprove={(jobId) => { setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: "Repair In Progress" } : j)); closeModal(); }} />}
          {modal.type === "invoice" && <InvoiceModal onClose={closeModal} job={modal.data.job} />}
          {modal.type === "payment" && <PaymentModal onClose={closeModal} job={modal.data.job} onPay={(jobId, mode) => { setJobs(prev => prev.map(j => j.id === jobId ? { ...j, payStatus: "Paid" } : j)); closeModal(); }} />}
          {modal.type === "jobWorkbench" && <JobWorkbenchModal onClose={closeModal} job={modal.data.job} updateJobStatus={updateJobStatus} openModal={openModal} inventory={inventory} />}
          {modal.type === "prCreate" && <PRCreateModal onClose={closeModal} onSave={(pr) => { setPrs(prev => [{ ...pr, id: `PR-00${prs.length + 1}`, status: "Pending", date: new Date().toISOString().split("T")[0], poId: null }, ...prev]); closeModal(); }} inventory={inventory} />}
        </ModalOverlay>
      )}
    </div>
  );
}

// ─── MODAL OVERLAY ────────────────────────────────────────────────────────────
function ModalOverlay({ children, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.6)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={e => e.target === e.currentTarget && onClose()}>
      {children}
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function DashboardScreen({ jobs, customers, inventory, lowStockItems, openModal, setActiveModule }) {
  const activeJobs = jobs.filter(j => !["Completed", "Dispatched"].includes(j.status)).length;
  const completedJobs = jobs.filter(j => j.status === "Completed").length;
  const pendingApprovals = jobs.filter(j => j.status === "Awaiting Approval").length;
  const totalRevenue = jobs.filter(j => j.payStatus === "Paid").reduce((s, j) => s + j.estAmount + j.diagFee, 0);
  const recentJobs = [...jobs].sort((a, b) => b.createdAt?.localeCompare(a.createdAt)).slice(0, 6);

  const kpis = [
    { label: "Total Customers", value: customers.length, icon: "customers", color: "#3B82F6", bg: "#EFF6FF" },
    { label: "Active Jobs", value: activeJobs, icon: "jobs", color: "#F59E0B", bg: "#FFFBEB" },
    { label: "Completed Jobs", value: completedJobs, icon: "check", color: "#10B981", bg: "#ECFDF5" },
    { label: "Pending Approvals", value: pendingApprovals, icon: "alert", color: "#8B5CF6", bg: "#F5F3FF" },
    { label: "Stock Alerts", value: lowStockItems.length, icon: "alert", color: "#EF4444", bg: "#FEF2F2" },
    { label: "Revenue (₹)", value: `₹${(totalRevenue / 1000).toFixed(1)}K`, icon: "billing", color: "#0EA5E9", bg: "#F0F9FF" },
  ];

  const statusBreakdown = [
    "Received", "In Diagnosis", "Estimation Pending", "Awaiting Approval",
    "Repair In Progress", "QC Pending", "Dispatched", "Completed"
  ].map(s => ({ status: s, count: jobs.filter(j => j.status === s).length })).filter(s => s.count > 0);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#0F172A" }}>Operations Dashboard</h1>
          <p style={{ margin: "4px 0 0", color: "#64748B", fontSize: 13 }}>DBOS – DRB Business Operating System · Repair Services Edition</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <ActionButton onClick={() => openModal("addCustomer")} icon="plus" label="New Customer" variant="secondary" />
          <ActionButton onClick={() => openModal("addJob")} icon="plus" label="New Service Request" variant="primary" />
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16, marginBottom: 24 }}>
        {kpis.map(kpi => (
          <div key={kpi.label} style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ width: 36, height: 36, background: kpi.bg, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={kpi.icon} size={18} color={kpi.color} />
              </div>
            </div>
            <div style={{ marginTop: 12, fontSize: 24, fontWeight: 700, color: "#0F172A" }}>{kpi.value}</div>
            <div style={{ fontSize: 11, color: "#64748B", marginTop: 2 }}>{kpi.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>
        {/* Recent Jobs Table */}
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #F1F5F9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#0F172A" }}>Recent Service Jobs</h3>
            <button onClick={() => setActiveModule("service")} style={{ background: "none", border: "none", color: "#3B82F6", fontSize: 12, cursor: "pointer", fontWeight: 500 }}>View All →</button>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F8FAFC" }}>
                {["Job ID", "Customer", "Device", "Technician", "Status", "Priority"].map(h => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#64748B", textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentJobs.map((job, i) => (
                <tr key={job.id} style={{ borderTop: "1px solid #F1F5F9", background: i % 2 === 0 ? "#fff" : "#FAFAFA" }}>
                  <td style={{ padding: "12px 16px", fontSize: 12, fontWeight: 600, color: "#3B82F6" }}>{job.id}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: "#374151" }}>{job.customerName}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "#64748B" }}>{job.device}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "#374151" }}>{job.techName}</td>
                  <td style={{ padding: "12px 16px" }}><Badge status={job.status} /></td>
                  <td style={{ padding: "12px 16px" }}><Badge status={job.priority} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Status Breakdown */}
          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", padding: 20 }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 600, color: "#0F172A" }}>Job Status Pipeline</h3>
            {statusBreakdown.map(s => (
              <div key={s.status} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <Badge status={s.status} />
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 80, height: 6, background: "#F1F5F9", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ width: `${(s.count / jobs.length) * 100}%`, height: "100%", background: "#3B82F6", borderRadius: 3 }} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#374151", minWidth: 16 }}>{s.count}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Stock Alerts */}
          {lowStockItems.length > 0 && (
            <div style={{ background: "#FEF2F2", borderRadius: 12, border: "1px solid #FECACA", padding: 20 }}>
              <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600, color: "#B91C1C" }}>⚠ Low Stock Alerts</h3>
              {lowStockItems.slice(0, 4).map(item => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 12 }}>
                  <span style={{ color: "#374151" }}>{item.name.substring(0, 22)}...</span>
                  <span style={{ color: "#B91C1C", fontWeight: 600 }}>{item.qty}/{item.minQty}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── CUSTOMERS ────────────────────────────────────────────────────────────────
function CustomersScreen({ customers, jobs, openModal }) {
  const [search, setSearch] = useState("");
  const filtered = customers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search) || c.id.includes(search));

  return (
    <div>
      <ScreenHeader title="Customer Intelligence" subtitle={`${customers.length} registered customers`}>
        <ActionButton onClick={() => openModal("addCustomer")} icon="plus" label="Add Customer" variant="primary" />
      </ScreenHeader>

      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #F1F5F9", display: "flex", gap: 12 }}>
          <SearchInput value={search} onChange={setSearch} placeholder="Search by name, phone, ID..." />
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F8FAFC" }}>
              {["Cust. ID", "Name", "Phone", "Email", "Address", "Joined", "Total Jobs", "Actions"].map(h => (
                <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#64748B", textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => {
              const custJobs = jobs.filter(j => j.customerId === c.id);
              return (
                <tr key={c.id} style={{ borderTop: "1px solid #F1F5F9", background: i % 2 ? "#FAFAFA" : "#fff" }}>
                  <td style={{ padding: "12px 16px", fontSize: 12, fontWeight: 600, color: "#3B82F6" }}>{c.id}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 30, height: 30, background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff", fontWeight: 700 }}>
                        {c.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 500, color: "#0F172A" }}>{c.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: "#374151" }}>{c.phone}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "#64748B" }}>{c.email}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "#64748B" }}>{c.address}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "#64748B" }}>{c.joinDate}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, fontWeight: 600, color: "#374151" }}>{custJobs.length}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <button onClick={() => openModal("addJob")} style={{ fontSize: 11, padding: "4px 10px", background: "#EFF6FF", color: "#2563EB", border: "1px solid #BFDBFE", borderRadius: 6, cursor: "pointer", fontWeight: 500 }}>New Job</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── SERVICE REQUESTS ─────────────────────────────────────────────────────────
function ServiceRequestsScreen({ jobs, openModal, updateJobStatus }) {
  const [statusFilter, setStatusFilter] = useState("All");
  const statuses = ["All", "Received", "In Diagnosis", "Estimation Pending", "Awaiting Approval", "Repair In Progress", "QC Pending", "Dispatched", "Completed"];
  const filtered = statusFilter === "All" ? jobs : jobs.filter(j => j.status === statusFilter);

  return (
    <div>
      <ScreenHeader title="Service Requests" subtitle={`${jobs.length} total service requests`}>
        <ActionButton onClick={() => openModal("addJob")} icon="plus" label="New Service Request" variant="primary" />
      </ScreenHeader>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {statuses.map(s => (
          <button key={s} onClick={() => setStatusFilter(s)} style={{
            padding: "5px 12px", borderRadius: 20, fontSize: 12, cursor: "pointer", fontWeight: 500,
            background: statusFilter === s ? "#0F172A" : "#fff",
            color: statusFilter === s ? "#fff" : "#374151",
            border: `1px solid ${statusFilter === s ? "#0F172A" : "#E2E8F0"}`
          }}>{s}</button>
        ))}
      </div>

      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F8FAFC" }}>
              {["Job ID", "Customer", "Device / Model", "Complaint", "Technician", "Diag. Fee", "Est. Amount", "Status", "Pay Status", "Actions"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#64748B", textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((job, i) => (
              <tr key={job.id} style={{ borderTop: "1px solid #F1F5F9", background: i % 2 ? "#FAFAFA" : "#fff" }}>
                <td style={{ padding: "12px 14px", fontSize: 12, fontWeight: 600, color: "#3B82F6" }}>{job.id}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#374151" }}>{job.customerName}</td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "#0F172A" }}>{job.device}</div>
                  <div style={{ fontSize: 11, color: "#94A3B8" }}>{job.model}</div>
                </td>
                <td style={{ padding: "12px 14px", fontSize: 12, color: "#64748B", maxWidth: 140 }}><span style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{job.complaint}</span></td>
                <td style={{ padding: "12px 14px", fontSize: 12, color: "#374151" }}>{job.techName || <span style={{ color: "#EF4444" }}>Unassigned</span>}</td>
                <td style={{ padding: "12px 14px", fontSize: 12, color: "#374151" }}>₹{job.diagFee}</td>
                <td style={{ padding: "12px 14px", fontSize: 12, fontWeight: 600, color: "#0F172A" }}>{job.estAmount > 0 ? `₹${job.estAmount}` : "-"}</td>
                <td style={{ padding: "12px 14px" }}><Badge status={job.status} /></td>
                <td style={{ padding: "12px 14px" }}><Badge status={job.payStatus} /></td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", gap: 4 }}>
                    {job.status === "Received" && <SmallButton onClick={() => openModal("assignTech", { job })} label="Assign" color="#3B82F6" />}
                    {job.status === "Estimation Pending" && <SmallButton onClick={() => openModal("estimation", { job })} label="Estimate" color="#8B5CF6" />}
                    {job.status === "Awaiting Approval" && <SmallButton onClick={() => openModal("approval", { job })} label="Approval" color="#F59E0B" />}
                    {["Repair In Progress", "QC Pending", "Completed"].includes(job.status) && <SmallButton onClick={() => openModal("invoice", { job })} label="Invoice" color="#10B981" />}
                    {job.payStatus !== "Paid" && job.estAmount > 0 && <SmallButton onClick={() => openModal("payment", { job })} label="Pay" color="#EF4444" />}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── JOB MANAGEMENT ───────────────────────────────────────────────────────────
function JobManagementScreen({ jobs, openModal, updateJobStatus, setSelectedJob, selectedJob }) {
  const activeJobs = jobs.filter(j => !["Completed", "Dispatched"].includes(j.status));

  return (
    <div>
      <ScreenHeader title="Job Management" subtitle="Technician workspace and job tracking">
        <ActionButton onClick={() => openModal("addJob")} icon="plus" label="New Job" variant="primary" />
      </ScreenHeader>

      <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 20 }}>
        {/* Job List */}
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", overflow: "hidden", maxHeight: 600, overflowY: "auto" }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid #F1F5F9", fontSize: 13, fontWeight: 600, color: "#374151" }}>
            Active Jobs ({activeJobs.length})
          </div>
          {activeJobs.map(job => (
            <div key={job.id} onClick={() => { setSelectedJob(job); openModal("jobWorkbench", { job }); }} style={{
              padding: "14px 16px", borderBottom: "1px solid #F8FAFC", cursor: "pointer",
              background: selectedJob?.id === job.id ? "#EFF6FF" : "#fff",
              transition: "background 0.15s"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#3B82F6" }}>{job.id}</span>
                <Badge status={job.priority} size="xs" />
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#0F172A", marginBottom: 3 }}>{job.customerName}</div>
              <div style={{ fontSize: 12, color: "#64748B", marginBottom: 6 }}>{job.device}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Badge status={job.status} />
                <span style={{ fontSize: 11, color: "#94A3B8" }}>{job.techName}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Job Workbench Preview */}
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", padding: 32, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center", color: "#94A3B8" }}>
            <Icon name="jobs" size={48} color="#CBD5E1" />
            <p style={{ marginTop: 16, fontSize: 14, fontWeight: 500 }}>Select a job to open the workbench</p>
            <p style={{ fontSize: 12, color: "#CBD5E1" }}>Click any job on the left to view details, update status, and manage repairs</p>
          </div>
          <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, width: "100%" }}>
            {[
              { label: "Total Active", value: activeJobs.length, color: "#3B82F6" },
              { label: "High Priority", value: activeJobs.filter(j => j.priority === "High").length, color: "#EF4444" },
              { label: "Awaiting Parts", value: jobs.filter(j => j.status === "Parts Ordered").length, color: "#F59E0B" },
              { label: "Unassigned", value: jobs.filter(j => !j.techId && !["Completed", "Dispatched"].includes(j.status)).length, color: "#8B5CF6" },
            ].map(stat => (
              <div key={stat.label} style={{ background: "#F8FAFC", borderRadius: 10, padding: 16, textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: stat.color }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: "#64748B" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── INVENTORY ────────────────────────────────────────────────────────────────
function InventoryScreen({ inventory, setInventory, prs, setPrs, openModal }) {
  const [catFilter, setCatFilter] = useState("All");
  const cats = ["All", ...new Set(inventory.map(i => i.category))];
  const filtered = catFilter === "All" ? inventory : inventory.filter(i => i.category === catFilter);

  return (
    <div>
      <ScreenHeader title="Inventory & Procurement" subtitle={`${inventory.length} items · ${inventory.filter(i => i.qty < i.minQty).length} low stock alerts`}>
        <ActionButton onClick={() => openModal("prCreate")} icon="plus" label="Create PR" variant="primary" />
      </ScreenHeader>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 20 }}>
        {/* Inventory Table */}
        <div>
          <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
            {cats.map(c => (
              <button key={c} onClick={() => setCatFilter(c)} style={{
                padding: "4px 12px", borderRadius: 20, fontSize: 12, cursor: "pointer",
                background: catFilter === c ? "#0F172A" : "#fff",
                color: catFilter === c ? "#fff" : "#374151",
                border: `1px solid ${catFilter === c ? "#0F172A" : "#E2E8F0"}`
              }}>{c}</button>
            ))}
          </div>

          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F8FAFC" }}>
                  {["Item ID", "Part Name", "Category", "In Stock", "Min Qty", "Unit Cost", "Supplier", "Status", "Action"].map(h => (
                    <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#64748B", textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, i) => {
                  const isLow = item.qty < item.minQty;
                  return (
                    <tr key={item.id} style={{ borderTop: "1px solid #F1F5F9", background: isLow ? "#FFF8F8" : (i % 2 ? "#FAFAFA" : "#fff") }}>
                      <td style={{ padding: "10px 12px", fontSize: 11, color: "#64748B" }}>{item.id}</td>
                      <td style={{ padding: "10px 12px", fontSize: 13, fontWeight: 500, color: "#0F172A" }}>{item.name}</td>
                      <td style={{ padding: "10px 12px", fontSize: 11, color: "#64748B" }}>{item.category}</td>
                      <td style={{ padding: "10px 12px" }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: isLow ? "#EF4444" : "#10B981" }}>{item.qty}</span>
                      </td>
                      <td style={{ padding: "10px 12px", fontSize: 12, color: "#64748B" }}>{item.minQty}</td>
                      <td style={{ padding: "10px 12px", fontSize: 12, color: "#374151" }}>₹{item.unitCost}</td>
                      <td style={{ padding: "10px 12px", fontSize: 11, color: "#64748B" }}>{item.supplier}</td>
                      <td style={{ padding: "10px 12px" }}><Badge status={isLow ? "Pending" : "Available"} /></td>
                      <td style={{ padding: "10px 12px" }}>
                        {isLow && <SmallButton onClick={() => openModal("prCreate")} label="Raise PR" color="#EF4444" />}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Procurement Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", overflow: "hidden" }}>
            <div style={{ padding: "14px 16px", borderBottom: "1px solid #F1F5F9", fontSize: 14, fontWeight: 600, color: "#0F172A" }}>
              Purchase Requisitions
            </div>
            {prs.map(pr => (
              <div key={pr.id} style={{ padding: "12px 16px", borderBottom: "1px solid #F8FAFC" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#3B82F6" }}>{pr.id}</span>
                  <Badge status={pr.status} />
                </div>
                <div style={{ fontSize: 13, color: "#374151", marginBottom: 2 }}>{pr.item}</div>
                <div style={{ fontSize: 11, color: "#94A3B8" }}>Qty: {pr.qty} · {pr.date} · By: {pr.createdBy}</div>
                {pr.poId && <div style={{ fontSize: 11, color: "#10B981", marginTop: 4 }}>PO: {pr.poId} ✓</div>}
              </div>
            ))}
          </div>

          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", padding: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#0F172A", marginBottom: 12 }}>Vendors</div>
            {VENDORS.map(v => (
              <div key={v.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, padding: "8px 0", borderBottom: "1px solid #F8FAFC" }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: "#374151" }}>{v.name}</div>
                  <div style={{ fontSize: 11, color: "#94A3B8" }}>{v.category}</div>
                </div>
                <div style={{ fontSize: 11, color: "#F59E0B", fontWeight: 600 }}>★ {v.rating}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── BILLING ──────────────────────────────────────────────────────────────────
function BillingScreen({ jobs, openModal }) {
  const billableJobs = jobs.filter(j => j.estAmount > 0 || j.status === "Completed");
  const totalRevenue = jobs.filter(j => j.payStatus === "Paid").reduce((s, j) => s + j.estAmount + j.diagFee, 0);
  const pendingRevenue = jobs.filter(j => j.payStatus !== "Paid" && j.estAmount > 0).reduce((s, j) => s + j.estAmount + j.diagFee, 0);

  return (
    <div>
      <ScreenHeader title="Billing & Payments" subtitle="Invoice management and payment tracking">
        <div />
      </ScreenHeader>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Revenue Collected", value: `₹${totalRevenue.toLocaleString()}`, color: "#10B981", bg: "#ECFDF5" },
          { label: "Pending Collections", value: `₹${pendingRevenue.toLocaleString()}`, color: "#EF4444", bg: "#FEF2F2" },
          { label: "Invoices Generated", value: billableJobs.length, color: "#3B82F6", bg: "#EFF6FF" },
        ].map(k => (
          <div key={k.label} style={{ background: k.bg, borderRadius: 12, padding: 20, border: `1px solid ${k.color}22` }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: k.color }}>{k.value}</div>
            <div style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>{k.label}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", borderBottom: "1px solid #F1F5F9", fontSize: 14, fontWeight: 600 }}>
          Billing Records
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F8FAFC" }}>
              {["Job ID", "Customer", "Device", "Diag. Fee", "Est. Amount", "GST (18%)", "Total", "Pay Status", "Actions"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#64748B", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {billableJobs.map((job, i) => {
              const subtotal = job.diagFee + job.estAmount;
              const gst = Math.round(job.estAmount * 0.18);
              const total = subtotal + gst;
              return (
                <tr key={job.id} style={{ borderTop: "1px solid #F1F5F9", background: i % 2 ? "#FAFAFA" : "#fff" }}>
                  <td style={{ padding: "12px 14px", fontSize: 12, fontWeight: 600, color: "#3B82F6" }}>{job.id}</td>
                  <td style={{ padding: "12px 14px", fontSize: 13, color: "#374151" }}>{job.customerName}</td>
                  <td style={{ padding: "12px 14px", fontSize: 12, color: "#64748B" }}>{job.device}</td>
                  <td style={{ padding: "12px 14px", fontSize: 12 }}>₹{job.diagFee}</td>
                  <td style={{ padding: "12px 14px", fontSize: 12 }}>₹{job.estAmount}</td>
                  <td style={{ padding: "12px 14px", fontSize: 12 }}>₹{gst}</td>
                  <td style={{ padding: "12px 14px", fontSize: 13, fontWeight: 700, color: "#0F172A" }}>₹{total.toLocaleString()}</td>
                  <td style={{ padding: "12px 14px" }}><Badge status={job.payStatus} /></td>
                  <td style={{ padding: "12px 14px" }}>
                    <div style={{ display: "flex", gap: 4 }}>
                      <SmallButton onClick={() => openModal("invoice", { job })} label="Invoice" color="#3B82F6" />
                      {job.payStatus !== "Paid" && <SmallButton onClick={() => openModal("payment", { job })} label="Collect" color="#10B981" />}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── QC & DISPATCH ────────────────────────────────────────────────────────────
function QCDispatchScreen({ jobs, updateJobStatus, openModal }) {
  const qcJobs = jobs.filter(j => j.status === "QC Pending");
  const readyJobs = jobs.filter(j => j.status === "Completed" && j.payStatus === "Paid");
  const dispatched = jobs.filter(j => j.status === "Dispatched");

  return (
    <div>
      <ScreenHeader title="QC & Dispatch Control" subtitle="Quality control and delivery management" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
        {/* QC Queue */}
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", overflow: "hidden" }}>
          <div style={{ padding: "14px 16px", background: "#FFF7ED", borderBottom: "1px solid #FED7AA" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#C2410C" }}>QC Pending ({qcJobs.length})</div>
            <div style={{ fontSize: 11, color: "#EA580C" }}>Awaiting quality inspection</div>
          </div>
          {qcJobs.length === 0 && <div style={{ padding: 32, textAlign: "center", color: "#94A3B8", fontSize: 13 }}>No jobs pending QC</div>}
          {qcJobs.map(job => (
            <div key={job.id} style={{ padding: 16, borderBottom: "1px solid #F8FAFC" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#3B82F6", marginBottom: 4 }}>{job.id}</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#0F172A" }}>{job.customerName}</div>
              <div style={{ fontSize: 12, color: "#64748B", marginBottom: 10 }}>{job.device}</div>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => updateJobStatus(job.id, "Completed")} style={{ flex: 1, padding: "6px 0", background: "#10B981", color: "#fff", border: "none", borderRadius: 6, fontSize: 12, cursor: "pointer", fontWeight: 600 }}>✓ Approve</button>
                <button onClick={() => updateJobStatus(job.id, "Repair In Progress")} style={{ flex: 1, padding: "6px 0", background: "#FEF2F2", color: "#EF4444", border: "1px solid #FECACA", borderRadius: 6, fontSize: 12, cursor: "pointer", fontWeight: 600 }}>↩ Return</button>
              </div>
            </div>
          ))}
        </div>

        {/* Ready for Dispatch */}
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", overflow: "hidden" }}>
          <div style={{ padding: "14px 16px", background: "#ECFDF5", borderBottom: "1px solid #A7F3D0" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#065F46" }}>Ready for Dispatch ({readyJobs.length})</div>
            <div style={{ fontSize: 11, color: "#059669" }}>QC approved · Payment cleared</div>
          </div>
          {readyJobs.length === 0 && <div style={{ padding: 32, textAlign: "center", color: "#94A3B8", fontSize: 13 }}>No jobs ready for dispatch</div>}
          {readyJobs.map(job => (
            <div key={job.id} style={{ padding: 16, borderBottom: "1px solid #F8FAFC" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#3B82F6", marginBottom: 4 }}>{job.id}</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#0F172A" }}>{job.customerName}</div>
              <div style={{ fontSize: 12, color: "#64748B", marginBottom: 4 }}>{job.device}</div>
              <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 10 }}>Total: ₹{(job.diagFee + job.estAmount + Math.round(job.estAmount * 0.18)).toLocaleString()}</div>
              <button onClick={() => updateJobStatus(job.id, "Dispatched")} style={{ width: "100%", padding: "7px 0", background: "#0F172A", color: "#fff", border: "none", borderRadius: 6, fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
                🚚 Dispatch Now
              </button>
            </div>
          ))}
        </div>

        {/* Dispatched */}
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", overflow: "hidden" }}>
          <div style={{ padding: "14px 16px", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>Dispatched ({dispatched.length})</div>
            <div style={{ fontSize: 11, color: "#64748B" }}>Delivered to customers</div>
          </div>
          {dispatched.length === 0 && <div style={{ padding: 32, textAlign: "center", color: "#94A3B8", fontSize: 13 }}>No dispatched jobs</div>}
          {dispatched.map(job => (
            <div key={job.id} style={{ padding: 16, borderBottom: "1px solid #F8FAFC" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#3B82F6", marginBottom: 4 }}>{job.id}</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#0F172A" }}>{job.customerName}</div>
              <div style={{ fontSize: 12, color: "#64748B", marginBottom: 4 }}>{job.device}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 11, color: "#10B981" }}>✓ Delivered</span>
                <span style={{ fontSize: 11, color: "#94A3B8" }}>· ₹{(job.diagFee + job.estAmount).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MODALS ───────────────────────────────────────────────────────────────────
function ModalShell({ title, subtitle, onClose, children, width = 560 }) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, width, maxWidth: "95vw", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 25px 50px rgba(0,0,0,0.25)" }}>
      <div style={{ padding: "20px 24px", borderBottom: "1px solid #F1F5F9", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#0F172A" }}>{title}</h2>
          {subtitle && <p style={{ margin: "4px 0 0", fontSize: 12, color: "#64748B" }}>{subtitle}</p>}
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#94A3B8", borderRadius: 6, display: "flex" }}>
          <Icon name="close" size={20} color="#94A3B8" />
        </button>
      </div>
      <div style={{ padding: 24 }}>{children}</div>
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle = { width: "100%", padding: "9px 12px", border: "1px solid #E2E8F0", borderRadius: 8, fontSize: 13, color: "#0F172A", background: "#F8FAFC", boxSizing: "border-box", outline: "none" };
const selectStyle = { ...inputStyle, cursor: "pointer" };

function AddCustomerModal({ onClose, onSave }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "" });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  return (
    <ModalShell title="Register New Customer" subtitle="Add customer to the system" onClose={onClose}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <FormField label="Full Name *"><input style={inputStyle} value={form.name} onChange={e => set("name", e.target.value)} placeholder="Enter full name" /></FormField>
        <FormField label="Phone Number *"><input style={inputStyle} value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="10-digit mobile" /></FormField>
        <FormField label="Email Address"><input style={inputStyle} value={form.email} onChange={e => set("email", e.target.value)} placeholder="customer@email.com" /></FormField>
        <FormField label="Address"><input style={inputStyle} value={form.address} onChange={e => set("address", e.target.value)} placeholder="Street, Area, City" /></FormField>
      </div>
      <div style={{ padding: "16px", background: "#F0FDF4", borderRadius: 8, marginTop: 8, fontSize: 12, color: "#065F46" }}>
        ℹ Customer ID will be auto-generated upon registration.
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
        <button onClick={onClose} style={{ padding: "9px 20px", background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8, cursor: "pointer", fontSize: 13, color: "#374151" }}>Cancel</button>
        <button onClick={() => { if (form.name && form.phone) { onSave(form); onClose(); } }} style={{ padding: "9px 20px", background: "#0F172A", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Register Customer</button>
      </div>
    </ModalShell>
  );
}

function AddJobModal({ onClose, onSave, customers }) {
  const [form, setForm] = useState({ customerId: "", customerName: "", device: "", model: "", complaint: "", diagFee: 375, payMode: "Cash", techId: "", techName: "", status: "Received", priority: "Medium" });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const selCust = customers.find(c => c.id === form.customerId);

  return (
    <ModalShell title="New Service Request" subtitle="Create a new repair job" onClose={onClose} width={640}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <FormField label="Select Customer *">
          <select style={selectStyle} value={form.customerId} onChange={e => { const c = customers.find(x => x.id === e.target.value); set("customerId", e.target.value); set("customerName", c?.name || ""); }}>
            <option value="">-- Select Customer --</option>
            {customers.map(c => <option key={c.id} value={c.id}>{c.name} ({c.id})</option>)}
          </select>
        </FormField>
        <FormField label="Customer Phone">{selCust && <input style={{ ...inputStyle, background: "#F0FDF4", color: "#065F46" }} value={selCust.phone} readOnly />}</FormField>
        <FormField label="Device Type / Brand *"><input style={inputStyle} value={form.device} onChange={e => set("device", e.target.value)} placeholder='e.g. Sony Bravia 55"' /></FormField>
        <FormField label="Model Number"><input style={inputStyle} value={form.model} onChange={e => set("model", e.target.value)} placeholder="e.g. KD-55X80J" /></FormField>
        <div style={{ gridColumn: "1/-1" }}>
          <FormField label="Complaint / Issue *">
            <textarea style={{ ...inputStyle, minHeight: 72, resize: "vertical" }} value={form.complaint} onChange={e => set("complaint", e.target.value)} placeholder="Describe the issue in detail..." />
          </FormField>
        </div>
        <FormField label="Diagnostic Fee">
          <input style={{ ...inputStyle, background: "#FFF7ED", color: "#C2410C", fontWeight: 700 }} value={`₹ ${form.diagFee}`} readOnly />
        </FormField>
        <FormField label="Payment Mode">
          <select style={selectStyle} value={form.payMode} onChange={e => set("payMode", e.target.value)}>
            {["Cash", "UPI", "Bank Transfer", "Card"].map(m => <option key={m}>{m}</option>)}
          </select>
        </FormField>
        <FormField label="Priority">
          <select style={selectStyle} value={form.priority} onChange={e => set("priority", e.target.value)}>
            {["Low", "Medium", "High"].map(p => <option key={p}>{p}</option>)}
          </select>
        </FormField>
      </div>
      <div style={{ padding: "12px 16px", background: "#FFF7ED", borderRadius: 8, marginTop: 8, fontSize: 12, color: "#C2410C", display: "flex", gap: 8, alignItems: "center" }}>
        <Icon name="billing" size={14} color="#C2410C" />
        Diagnostic fee of ₹375 is collected upfront before repair assessment.
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
        <button onClick={onClose} style={{ padding: "9px 20px", background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>Cancel</button>
        <button onClick={() => { if (form.customerId && form.device && form.complaint) { onSave(form); onClose(); } }} style={{ padding: "9px 20px", background: "#0F172A", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Create Service Request</button>
      </div>
    </ModalShell>
  );
}

function AssignTechModal({ onClose, job, technicians, onAssign }) {
  const [selected, setSelected] = useState(null);
  return (
    <ModalShell title="Assign Technician" subtitle={`Job: ${job?.id} · ${job?.device}`} onClose={onClose} width={500}>
      <div style={{ marginBottom: 16, padding: 12, background: "#F8FAFC", borderRadius: 8, fontSize: 13, color: "#374151" }}>
        Complaint: <strong>{job?.complaint}</strong>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {technicians.map(t => (
          <div key={t.id} onClick={() => setSelected(t)} style={{
            padding: 14, borderRadius: 10, cursor: "pointer",
            border: `2px solid ${selected?.id === t.id ? "#3B82F6" : "#E2E8F0"}`,
            background: selected?.id === t.id ? "#EFF6FF" : "#fff",
            display: "flex", justifyContent: "space-between", alignItems: "center"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff", fontWeight: 700 }}>{t.avatar}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#0F172A" }}>{t.name}</div>
                <div style={{ fontSize: 11, color: "#64748B" }}>{t.specialty}</div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <Badge status={t.status} />
              <div style={{ fontSize: 11, color: "#64748B", marginTop: 4 }}>{t.activeJobs} active jobs</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
        <button onClick={onClose} style={{ padding: "9px 20px", background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>Cancel</button>
        <button onClick={() => selected && onAssign(job.id, selected)} disabled={!selected} style={{ padding: "9px 20px", background: selected ? "#0F172A" : "#CBD5E1", color: "#fff", border: "none", borderRadius: 8, cursor: selected ? "pointer" : "default", fontSize: 13, fontWeight: 600 }}>Assign Technician</button>
      </div>
    </ModalShell>
  );
}

function EstimationModal({ onClose, job, inventory, onSubmit }) {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", qty: 1, rate: 0 });
  const [laborCharge, setLaborCharge] = useState(500);

  const addItem = () => {
    if (newItem.name && newItem.rate > 0) {
      setItems(p => [...p, { ...newItem, id: Date.now() }]);
      setNewItem({ name: "", qty: 1, rate: 0 });
    }
  };
  const partsTotal = items.reduce((s, i) => s + i.qty * i.rate, 0);
  const subtotal = partsTotal + laborCharge;
  const gst = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gst;

  return (
    <ModalShell title="Estimation Sheet" subtitle={`Job: ${job?.id} · ${job?.customerName}`} onClose={onClose} width={680}>
      {/* Header info */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20, padding: 14, background: "#F8FAFC", borderRadius: 8 }}>
        <div><span style={{ fontSize: 11, color: "#64748B" }}>Device:</span> <strong style={{ fontSize: 13, color: "#0F172A" }}>{job?.device}</strong></div>
        <div><span style={{ fontSize: 11, color: "#64748B" }}>Diag. Fee:</span> <strong style={{ fontSize: 13, color: "#C2410C" }}>₹{job?.diagFee} (Pre-paid)</strong></div>
        <div><span style={{ fontSize: 11, color: "#64748B" }}>Model:</span> <strong style={{ fontSize: 13 }}>{job?.model}</strong></div>
        <div><span style={{ fontSize: 11, color: "#64748B" }}>Technician:</span> <strong style={{ fontSize: 13 }}>{job?.techName}</strong></div>
      </div>

      {/* Add items row */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12, alignItems: "flex-end" }}>
        <FormField label="Part / Item">
          <select style={{ ...selectStyle, width: 200 }} value={newItem.name} onChange={e => {
            const inv = inventory.find(i => i.name === e.target.value);
            setNewItem(p => ({ ...p, name: e.target.value, rate: inv?.unitCost || p.rate }));
          }}>
            <option value="">Select item...</option>
            {inventory.map(i => <option key={i.id}>{i.name}</option>)}
          </select>
        </FormField>
        <FormField label="Qty"><input type="number" style={{ ...inputStyle, width: 60 }} value={newItem.qty} onChange={e => setNewItem(p => ({ ...p, qty: +e.target.value }))} min={1} /></FormField>
        <FormField label="Rate (₹)"><input type="number" style={{ ...inputStyle, width: 90 }} value={newItem.rate} onChange={e => setNewItem(p => ({ ...p, rate: +e.target.value }))} /></FormField>
        <button onClick={addItem} style={{ padding: "9px 16px", background: "#0F172A", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, marginBottom: 0, height: 38, alignSelf: "flex-end" }}>+ Add</button>
      </div>

      {/* Items table */}
      {items.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 16 }}>
          <thead>
            <tr style={{ background: "#F8FAFC" }}>
              {["Part/Item", "Qty", "Rate", "Amount", ""].map(h => <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontSize: 11, color: "#64748B", fontWeight: 600 }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={item.id} style={{ borderTop: "1px solid #F1F5F9" }}>
                <td style={{ padding: "10px", fontSize: 13 }}>{item.name}</td>
                <td style={{ padding: "10px", fontSize: 13 }}>{item.qty}</td>
                <td style={{ padding: "10px", fontSize: 13 }}>₹{item.rate}</td>
                <td style={{ padding: "10px", fontSize: 13, fontWeight: 600 }}>₹{item.qty * item.rate}</td>
                <td style={{ padding: "10px" }}><button onClick={() => setItems(p => p.filter((_, i) => i !== idx))} style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444", fontSize: 16 }}>×</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Summary */}
      <div style={{ background: "#F8FAFC", borderRadius: 10, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: "#64748B" }}>Labour Charges</span>
          <input type="number" value={laborCharge} onChange={e => setLaborCharge(+e.target.value)} style={{ width: 80, textAlign: "right", border: "1px solid #E2E8F0", borderRadius: 6, padding: "2px 8px", fontSize: 13 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: "#64748B" }}>Parts Total</span>
          <span style={{ fontSize: 13, fontWeight: 600 }}>₹{partsTotal}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: "#64748B" }}>GST (18%)</span>
          <span style={{ fontSize: 13, fontWeight: 600 }}>₹{gst}</span>
        </div>
        <div style={{ borderTop: "2px solid #E2E8F0", paddingTop: 10, display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>Grand Total</span>
          <span style={{ fontSize: 18, fontWeight: 800, color: "#0F172A" }}>₹{grandTotal.toLocaleString()}</span>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
        <button onClick={onClose} style={{ padding: "9px 20px", background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>Cancel</button>
        <button onClick={() => { onSubmit(job.id, grandTotal); }} style={{ padding: "9px 20px", background: "#8B5CF6", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
          📤 Send for Customer Approval
        </button>
      </div>
    </ModalShell>
  );
}

function ApprovalModal({ onClose, job, onApprove }) {
  const [approvalMethod, setApprovalMethod] = useState("whatsapp");
  const [approved, setApproved] = useState(false);
  return (
    <ModalShell title="Customer Approval" subtitle={`Estimate approval for ${job?.id}`} onClose={onClose} width={500}>
      <div style={{ padding: 16, background: "#F0FDF4", borderRadius: 10, marginBottom: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#065F46", marginBottom: 4 }}>Estimate Summary</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: "#059669" }}>₹{job?.estAmount?.toLocaleString()}</div>
        <div style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>For {job?.device} · {job?.customerName}</div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 10 }}>Approval Method</div>
        <div style={{ display: "flex", gap: 10 }}>
          {[{ id: "whatsapp", label: "WhatsApp", icon: "📱" }, { id: "call", label: "Phone Call", icon: "📞" }, { id: "manual", label: "Manual", icon: "📝" }].map(m => (
            <button key={m.id} onClick={() => setApprovalMethod(m.id)} style={{
              flex: 1, padding: "10px 0", border: `2px solid ${approvalMethod === m.id ? "#3B82F6" : "#E2E8F0"}`,
              borderRadius: 8, background: approvalMethod === m.id ? "#EFF6FF" : "#fff",
              cursor: "pointer", fontSize: 13, fontWeight: 500
            }}>{m.icon} {m.label}</button>
          ))}
        </div>
      </div>

      {approvalMethod === "whatsapp" && (
        <div style={{ padding: 16, background: "#F0FDF4", borderRadius: 10, marginBottom: 16, border: "1px solid #A7F3D0" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#065F46", marginBottom: 8 }}>📱 WhatsApp Approval Simulation</div>
          <div style={{ fontSize: 12, color: "#374151", background: "#fff", padding: 12, borderRadius: 8, marginBottom: 10, lineHeight: 1.6 }}>
            <em>"Dear {job?.customerName}, your TV repair estimate is ₹{job?.estAmount}. Reply YES to approve or NO to cancel. – DRB Service Centre"</em>
          </div>
          <button onClick={() => setApproved(true)} style={{ padding: "8px 16px", background: "#25D366", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
            {approved ? "✓ Customer Replied: YES" : "Simulate Customer Approval"}
          </button>
        </div>
      )}

      {approved && (
        <div style={{ padding: 12, background: "#ECFDF5", borderRadius: 8, fontSize: 13, color: "#065F46", fontWeight: 600, marginBottom: 16 }}>
          ✓ Approval received! Job can proceed to repair.
        </div>
      )}

      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <button onClick={onClose} style={{ padding: "9px 20px", background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>Cancel</button>
        <button onClick={() => onApprove(job.id)} disabled={!approved && approvalMethod === "whatsapp"} style={{
          padding: "9px 20px", background: (approved || approvalMethod !== "whatsapp") ? "#10B981" : "#CBD5E1",
          color: "#fff", border: "none", borderRadius: 8,
          cursor: (approved || approvalMethod !== "whatsapp") ? "pointer" : "default",
          fontSize: 13, fontWeight: 600
        }}>✓ Confirm Approval & Start Repair</button>
      </div>
    </ModalShell>
  );
}

function InvoiceModal({ onClose, job }) {
  if (!job) return null;
  const partsEst = job.estAmount * 0.7;
  const labour = job.estAmount * 0.3;
  const gst = Math.round(job.estAmount * 0.18);
  const total = job.diagFee + job.estAmount + gst;

  return (
    <ModalShell title="Tax Invoice" subtitle={`Invoice for ${job.id}`} onClose={onClose} width={580}>
      {/* Invoice Header */}
      <div style={{ border: "2px solid #0F172A", borderRadius: 10, overflow: "hidden", marginBottom: 16 }}>
        <div style={{ background: "#0F172A", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 18 }}>DRB Service Centre</div>
            <div style={{ color: "#94A3B8", fontSize: 11 }}>GST: 27AABCS1234B1Z5 · repair@drb.in</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#60A5FA", fontWeight: 700, fontSize: 15 }}>TAX INVOICE</div>
            <div style={{ color: "#94A3B8", fontSize: 12 }}>{job.id.replace("JOB", "INV")}</div>
          </div>
        </div>
        <div style={{ padding: "16px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: "#64748B", marginBottom: 4 }}>BILL TO</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{job.customerName}</div>
            <div style={{ fontSize: 12, color: "#64748B" }}>Device: {job.device}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "#64748B", marginBottom: 4 }}>INVOICE DATE</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{new Date().toLocaleDateString()}</div>
            <div style={{ fontSize: 12, color: "#64748B" }}>Due: On Receipt</div>
          </div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F8FAFC" }}>
              {["Description", "Amount (₹)"].map(h => <th key={h} style={{ padding: "10px 20px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#374151", borderTop: "1px solid #E2E8F0" }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {[
              ["Diagnostic / Inspection Fee", `₹${job.diagFee}`],
              ["Spare Parts & Components", `₹${Math.round(partsEst)}`],
              ["Labour & Service Charges", `₹${Math.round(labour)}`],
            ].map(([desc, amt]) => (
              <tr key={desc} style={{ borderTop: "1px solid #F1F5F9" }}>
                <td style={{ padding: "10px 20px", fontSize: 13, color: "#374151" }}>{desc}</td>
                <td style={{ padding: "10px 20px", fontSize: 13, fontWeight: 500, textAlign: "right" }}>{amt}</td>
              </tr>
            ))}
            <tr style={{ background: "#FFF7ED", borderTop: "1px solid #E2E8F0" }}>
              <td style={{ padding: "10px 20px", fontSize: 13, color: "#C2410C", fontWeight: 600 }}>GST @18%</td>
              <td style={{ padding: "10px 20px", fontSize: 13, fontWeight: 600, color: "#C2410C", textAlign: "right" }}>₹{gst}</td>
            </tr>
            <tr style={{ background: "#0F172A" }}>
              <td style={{ padding: "12px 20px", fontSize: 15, fontWeight: 800, color: "#fff" }}>TOTAL</td>
              <td style={{ padding: "12px 20px", fontSize: 18, fontWeight: 800, color: "#60A5FA", textAlign: "right" }}>₹{total.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <button onClick={onClose} style={{ padding: "9px 20px", background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>Close</button>
        <button style={{ padding: "9px 20px", background: "#0F172A", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
          <Icon name="printer" size={16} color="#fff" /> Print / Download
        </button>
      </div>
    </ModalShell>
  );
}

function PaymentModal({ onClose, job, onPay }) {
  const [mode, setMode] = useState("Cash");
  const [amount, setAmount] = useState(0);
  const [schedule, setSchedule] = useState(false);
  const gst = Math.round((job?.estAmount || 0) * 0.18);
  const total = (job?.diagFee || 0) + (job?.estAmount || 0) + gst;

  return (
    <ModalShell title="Collect Payment" subtitle={`Job ${job?.id} · ${job?.customerName}`} onClose={onClose} width={480}>
      <div style={{ padding: 16, background: "#F0FDF4", borderRadius: 10, marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 11, color: "#64748B" }}>Total Outstanding</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#059669" }}>₹{total.toLocaleString()}</div>
        </div>
        <Badge status={job?.payStatus} size="md" />
      </div>
      <FormField label="Payment Mode">
        <div style={{ display: "flex", gap: 8 }}>
          {["Cash", "UPI", "Bank", "Card"].map(m => (
            <button key={m} onClick={() => setMode(m)} style={{
              flex: 1, padding: "8px 0", border: `2px solid ${mode === m ? "#10B981" : "#E2E8F0"}`,
              borderRadius: 8, background: mode === m ? "#ECFDF5" : "#fff", cursor: "pointer", fontSize: 12, fontWeight: 500
            }}>{m}</button>
          ))}
        </div>
      </FormField>
      <FormField label="Amount to Collect (₹)">
        <input type="number" style={inputStyle} value={amount || total} onChange={e => setAmount(+e.target.value)} />
      </FormField>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, cursor: "pointer" }} onClick={() => setSchedule(p => !p)}>
        <div style={{ width: 18, height: 18, border: "2px solid #3B82F6", borderRadius: 4, background: schedule ? "#3B82F6" : "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {schedule && <Icon name="check" size={12} color="#fff" />}
        </div>
        <span style={{ fontSize: 13, color: "#374151" }}>Set payment schedule (partial payment)</span>
      </div>
      {schedule && (
        <div style={{ padding: 14, background: "#F8FAFC", borderRadius: 8, marginBottom: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <FormField label="Amount Now (₹)"><input type="number" style={inputStyle} placeholder="0" /></FormField>
            <FormField label="Balance Due Date"><input type="date" style={inputStyle} /></FormField>
          </div>
        </div>
      )}
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <button onClick={onClose} style={{ padding: "9px 20px", background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>Cancel</button>
        <button onClick={() => onPay(job.id, mode)} style={{ padding: "9px 20px", background: "#10B981", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
          ✓ Confirm Payment
        </button>
      </div>
    </ModalShell>
  );
}

function JobWorkbenchModal({ onClose, job, updateJobStatus, openModal, inventory }) {
  const [diagnosis, setDiagnosis] = useState(job?.diagnosis || "");
  const [notes, setNotes] = useState("");
  const timeline = [
    { step: "Received", done: true },
    { step: "Assigned to Technician", done: !!job?.techId },
    { step: "In Diagnosis", done: ["In Diagnosis", "Estimation Pending", "Awaiting Approval", "Parts Ordered", "Repair In Progress", "QC Pending", "Completed", "Dispatched"].includes(job?.status) },
    { step: "Estimation Sent", done: ["Awaiting Approval", "Parts Ordered", "Repair In Progress", "QC Pending", "Completed", "Dispatched"].includes(job?.status) },
    { step: "Customer Approved", done: ["Repair In Progress", "Parts Ordered", "QC Pending", "Completed", "Dispatched"].includes(job?.status) },
    { step: "Repair Completed", done: ["QC Pending", "Completed", "Dispatched"].includes(job?.status) },
    { step: "QC Cleared", done: ["Completed", "Dispatched"].includes(job?.status) },
    { step: "Dispatched", done: job?.status === "Dispatched" },
  ];

  return (
    <ModalShell title={`Job Workbench · ${job?.id}`} subtitle={`${job?.device} · ${job?.customerName}`} onClose={onClose} width={700}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 200px", gap: 20 }}>
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: 14, background: "#F8FAFC", borderRadius: 10, marginBottom: 16 }}>
            {[
              ["Customer", job?.customerName], ["Device", job?.device],
              ["Model", job?.model], ["Technician", job?.techName],
              ["Priority", job?.priority], ["Diag. Fee", `₹${job?.diagFee}`],
            ].map(([k, v]) => (
              <div key={k}><span style={{ fontSize: 11, color: "#64748B" }}>{k}: </span><strong style={{ fontSize: 12, color: "#0F172A" }}>{v}</strong></div>
            ))}
          </div>

          <FormField label="Diagnosis / Findings">
            <textarea style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} value={diagnosis} onChange={e => setDiagnosis(e.target.value)} placeholder="Enter detailed diagnosis here..." />
          </FormField>

          <FormField label="Technician Notes">
            <textarea style={{ ...inputStyle, minHeight: 60, resize: "vertical" }} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any additional observations..." />
          </FormField>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
            {job?.status === "In Diagnosis" && (
              <button onClick={() => { updateJobStatus(job.id, "Estimation Pending"); openModal("estimation", { job: { ...job, status: "Estimation Pending" } }); }} style={{ padding: "8px 14px", background: "#8B5CF6", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
                📋 Create Estimation
              </button>
            )}
            {job?.status === "Repair In Progress" && (
              <button onClick={() => updateJobStatus(job.id, "QC Pending")} style={{ padding: "8px 14px", background: "#10B981", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
                ✓ Mark Repair Complete → QC
              </button>
            )}
            <button onClick={() => openModal("assignTech", { job })} style={{ padding: "8px 14px", background: "#F8FAFC", color: "#374151", border: "1px solid #E2E8F0", borderRadius: 8, cursor: "pointer", fontSize: 12 }}>
              Change Technician
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 12 }}>Job Timeline</div>
          {timeline.map((t, i) => (
            <div key={t.step} style={{ display: "flex", gap: 10, marginBottom: 14 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: t.done ? "#10B981" : "#E2E8F0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {t.done && <Icon name="check" size={12} color="#fff" />}
                </div>
                {i < timeline.length - 1 && <div style={{ width: 2, flex: 1, background: t.done ? "#10B981" : "#E2E8F0", marginTop: 3 }} />}
              </div>
              <div style={{ paddingBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: t.done ? 600 : 400, color: t.done ? "#0F172A" : "#94A3B8" }}>{t.step}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 8, padding: 10, background: "#F8FAFC", borderRadius: 8, textAlign: "center" }}>
            <Badge status={job?.status} size="md" />
          </div>
        </div>
      </div>
    </ModalShell>
  );
}

function PRCreateModal({ onClose, onSave, inventory }) {
  const [form, setForm] = useState({ item: "", qty: 1, createdBy: "Suresh K." });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  return (
    <ModalShell title="Create Purchase Requisition" subtitle="Request items for procurement" onClose={onClose} width={460}>
      <FormField label="Select Item *">
        <select style={selectStyle} value={form.item} onChange={e => set("item", e.target.value)}>
          <option value="">-- Select item --</option>
          {inventory.map(i => <option key={i.id}>{i.name}</option>)}
        </select>
      </FormField>
      <FormField label="Quantity Required">
        <input type="number" style={inputStyle} value={form.qty} onChange={e => set("qty", +e.target.value)} min={1} />
      </FormField>
      <FormField label="Requested By">
        <select style={selectStyle} value={form.createdBy} onChange={e => set("createdBy", e.target.value)}>
          {TECHNICIANS.map(t => <option key={t.id}>{t.name}</option>)}
        </select>
      </FormField>
      <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
        <button onClick={onClose} style={{ padding: "9px 20px", background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>Cancel</button>
        <button onClick={() => { if (form.item) { onSave(form); } }} style={{ padding: "9px 20px", background: "#0F172A", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Submit PR</button>
      </div>
    </ModalShell>
  );
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function ScreenHeader({ title, subtitle, children }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#0F172A" }}>{title}</h1>
        {subtitle && <p style={{ margin: "4px 0 0", color: "#64748B", fontSize: 13 }}>{subtitle}</p>}
      </div>
      <div style={{ display: "flex", gap: 10 }}>{children}</div>
    </div>
  );
}

function ActionButton({ onClick, icon, label, variant = "secondary" }) {
  const isPrimary = variant === "primary";
  return (
    <button onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 6, padding: "9px 16px",
      background: isPrimary ? "#0F172A" : "#fff",
      color: isPrimary ? "#fff" : "#374151",
      border: isPrimary ? "none" : "1px solid #E2E8F0",
      borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600
    }}>
      <Icon name={icon} size={16} color={isPrimary ? "#fff" : "#374151"} />
      {label}
    </button>
  );
}

function SmallButton({ onClick, label, color }) {
  return (
    <button onClick={onClick} style={{
      padding: "4px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer",
      background: color + "15", color: color, border: `1px solid ${color}40`,
      borderRadius: 6, whiteSpace: "nowrap"
    }}>{label}</button>
  );
}

function SearchInput({ value, onChange, placeholder }) {
  return (
    <div style={{ position: "relative", flex: 1, maxWidth: 360 }}>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{
        width: "100%", padding: "8px 12px 8px 32px", border: "1px solid #E2E8F0",
        borderRadius: 8, fontSize: 13, background: "#F8FAFC", outline: "none", boxSizing: "border-box"
      }} />
      <div style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
        <Icon name="search" size={14} color="#94A3B8" />
      </div>
    </div>
  );
}
