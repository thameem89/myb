import { NextResponse } from "next/server";
import { submissionSchema } from "@/lib/validation";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const tables = { experience: "reviews", response: "company_responses", contact: "contact_requests" } as const;
export async function POST(request: Request, { params }: { params: Promise<{kind:string}> }) {
  const { kind } = await params;
  if (!(kind in tables)) return NextResponse.json({error:"Unknown submission type."},{status:404});
  if (request.headers.get("content-length") && Number(request.headers.get("content-length")) > 100_000) return NextResponse.json({error:"Submission is too large."},{status:413});
  let raw: unknown; try { raw = await request.json(); } catch { return NextResponse.json({error:"Invalid request."},{status:400}); }
  const parsed = submissionSchema.safeParse(raw);
  if (!parsed.success) return NextResponse.json({error:parsed.error.issues[0]?.message || "Please check the form."},{status:422});
  if (kind !== "contact" && !parsed.data.accuracy) return NextResponse.json({error:"The accuracy declaration is required."},{status:422});
  const reference = `CT-${new Date().getUTCFullYear()}-${crypto.randomUUID().slice(0,8).toUpperCase()}`;
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const data = parsed.data as Record<string,string>;
    const input = new TextEncoder().encode(request.headers.get("cf-connecting-ip") || "unknown");
    const digest = await crypto.subtle.digest("SHA-256", input);
    const ipHash = Array.from(new Uint8Array(digest)).map(byte => byte.toString(16).padStart(2,"0")).join("");
    const payload = kind === "experience"
      ? { reviewer_name:data.name, public_name:data.publicName || "Anonymous", email:data.email, phone:data.phone, service_type:data.service, service_date:data.serviceDate || null, amount_paid:Number(data.amount)||null, rating:Number(data.rating)||null, title_original:data.title, body_original:data.message, desired_resolution:data.resolution, company_contacted:data.contacted==="Yes", company_responded:data.responded==="Yes", moderation_status:"pending", internal_notes:`Reference ${reference}; abuse hash ${ipHash}` }
      : kind === "response"
      ? { respondent_name:data.name, respondent_position:data.publicName, company_email:data.email, company_phone:data.phone, response_type:data.type, response_original:data.message, moderation_status:"submitted", internal_notes:`Reference ${reference}; related ${data.related || "unspecified"}` }
      : { name:data.name, email:data.email, phone:data.phone, enquiry_type:data.type, subject:data.title, message:data.message, status:"new", internal_notes:`Reference ${reference}; abuse hash ${ipHash}` };
    const { error } = await supabase.from(tables[kind as keyof typeof tables]).insert(payload as never);
    if (error) return NextResponse.json({error:"The moderation service is temporarily unavailable."},{status:503});
  }
  return NextResponse.json({reference, stored:Boolean(supabase)},{status:202,headers:{"Cache-Control":"no-store"}});
}
