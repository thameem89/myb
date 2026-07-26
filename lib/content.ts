import {
  BadgeCheck, BookOpen, Building2, CalendarDays, CircleDollarSign,
  FileCheck2, FileText, Landmark, Mail, MessageSquareText, Scale, ShieldCheck
} from "lucide-react";

export const nav = [
  ["Home", "/"], ["Our Experience", "/our-experience"], ["Timeline", "/timeline"],
  ["Documents", "/documents"], ["Customer Reviews", "/reviews"],
  ["Awareness Guides", "/guides"], ["Company Response", "/company-response"],
  ["About", "/about"], ["Contact", "/contact"],
] as const;

export const trust = [
  { title: "Firsthand experiences", text: "Personal accounts are attributed to their authors.", icon: MessageSquareText },
  { title: "Supporting documents", text: "Records are redacted and labelled by evidence status.", icon: FileCheck2 },
  { title: "Transparent timelines", text: "Events distinguish records, recollections and disputes.", icon: CalendarDays },
  { title: "Right of response", text: "Businesses can respond, correct and add supporting records.", icon: Scale },
];

export const timeline = [
  { date: "Date withheld", title: "Initial service discussion", text: "The customer describes discussing a business setup service with a total price of AED 12,000.", type: "Customer Account", icon: MessageSquareText },
  { date: "Date withheld", title: "Initial payment", text: "The customer states that AED 5,700 was paid. A redacted receipt placeholder is listed in the document library.", type: "Awaiting Evidence", icon: CircleDollarSign },
  { date: "Date withheld", title: "Process began", text: "The parties agree that the setup process began, while some responsibilities and payment timing remain disputed.", type: "Disputed", icon: Building2 },
  { date: "Date withheld", title: "Outstanding balance notice", text: "According to the available account, a balance of AED 6,300 was requested. The customer recalls a two-month verbal repayment period.", type: "Customer Account", icon: Mail },
  { date: "Date withheld", title: "License-related communication", text: "The available email is described as referring to trade-license cancellation or amendment. Publication awaits a reviewed, redacted copy.", type: "Awaiting Evidence", icon: FileText },
  { date: "Current status", title: "Refund and breakdown requested", text: "The customer states that no refund or detailed deduction breakdown has been received. The company may submit a response or correction.", type: "Disputed", icon: Scale },
];

export const guides = [
  ["Questions to Ask Before Hiring a UAE Business Setup Consultant", "Consultant Selection", "7 min"],
  ["Why Every Verbal Agreement Should Be Confirmed by Email", "Documentation", "5 min"],
  ["What Should Be Included in a Business Setup Service Agreement?", "Business Setup", "8 min"],
  ["Understanding Advance Payments and Refund Policies", "Payment Safety", "6 min"],
  ["How to Document a Service Dispute Properly", "Dispute Prevention", "7 min"],
];

export const policies = [
  ["Disclaimer", "disclaimer"], ["Privacy Policy", "privacy"], ["Terms of Use", "terms"],
  ["Review Policy", "review-policy"], ["Evidence & Verification", "evidence-policy"],
  ["Corrections Policy", "corrections"], ["Right of Response", "right-of-response"],
  ["Content Removal Request", "content-removal"], ["Cookie Policy", "cookies"],
] as const;

export const statusTone: Record<string, string> = {
  "Documented": "green", "Company Response": "navy", "Customer Account": "amber",
  "Disputed": "red", "Awaiting Evidence": "grey",
};

export const principles = [
  ["Accuracy over emotion", BadgeCheck], ["Evidence over assumption", FileCheck2],
  ["Fairness to all parties", Scale], ["Protection of personal information", ShieldCheck],
];

export const awarenessIcons = [BookOpen, ShieldCheck, Landmark, FileText];
