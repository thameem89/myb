import { z } from "zod";

const privateData = /\b(?:\d[ -]*?){12,16}\b|password|one[- ]?time password|otp\b/i;
const prohibited = /\b(?:kill|threaten|passport number|emirates id number)\b/i;
export function moderateText(value: string) {
  if (privateData.test(value)) return { safe: false, reason: "Please remove possible payment, identity or authentication details." };
  if (prohibited.test(value)) return { safe: false, reason: "Please remove threats or private identity details." };
  return { safe: true };
}
export const submissionSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().email().max(254),
  phone: z.string().max(40).optional().default(""),
  title: z.string().trim().min(3).max(180).optional(),
  message: z.string().trim().min(40).max(12000),
  consent: z.literal("on"),
  accuracy: z.literal("on").optional(),
  website: z.string().max(0).optional().default(""),
}).passthrough().superRefine((value, ctx) => {
  const checked = moderateText(`${value.title || ""} ${value.message}`);
  if (!checked.safe) ctx.addIssue({ code: "custom", path: ["message"], message: checked.reason! });
});
