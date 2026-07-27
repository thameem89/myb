"use client";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

type Kind = "experience" | "response" | "contact";
export function SubmissionForm({ kind, compact = false }: { kind: Kind; compact?: boolean }) {
  const [result, setResult] = useState<{ok:boolean;reference?:string;error?:string}|null>(null);
  const [pending, setPending] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setPending(true); setResult(null);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const response = await fetch(`/api/submissions/${kind}`, { method: "POST", headers: {"content-type":"application/json"}, body: JSON.stringify(data) });
    const body = await response.json() as {reference?:string;error?:string};
    setResult(response.ok ? {ok:true,reference:body.reference} : {ok:false,error:body.error || "Please check the form."});
    setPending(false); if(response.ok) e.currentTarget.reset();
  }
  if(result?.ok) return <div className="form-card" role="status"><CheckCircle2 size={34}/><h2>Submission received</h2><p>Thank you. Your information is pending moderation and will not be published automatically.</p><p><strong>Reference: {result.reference}</strong></p><button className="button" onClick={()=>setResult(null)}>Make another submission</button></div>;
  if (compact && kind === "experience") return <form className="form-card" onSubmit={submit} noValidate>
    <div className="form-grid">
      <div className="field"><label htmlFor="compact-name">Your name</label><input id="compact-name" name="name" required autoComplete="name"/></div>
      <div className="field"><label htmlFor="compact-email">Your email</label><input id="compact-email" name="email" type="email" required autoComplete="email"/></div>
      <div className="field full"><label htmlFor="compact-rating">Your rating</label><select id="compact-rating" name="rating" required><option value="">Choose a rating</option>{[1,2,3,4,5].map(n=><option key={n} value={n}>{n} out of 5</option>)}</select></div>
      <div className="field full"><label htmlFor="compact-message">What happened?</label><textarea id="compact-message" name="message" minLength={40} placeholder="Share your genuine experience in your own words." required/></div>
      <input type="hidden" name="title" value="Customer experience submission"/>
      <input type="hidden" name="service" value="Not specified"/>
      <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"/>
      <label className="checkbox field full"><input name="accuracy" type="checkbox" required/><span>I confirm this is my genuine experience and is accurate to the best of my knowledge.</span></label>
      <label className="checkbox field full"><input name="consent" type="checkbox" required/><span>I consent to this information being stored and reviewed before any publication.</span></label>
      {result?.error&&<p className="field full legal-note" role="alert">{result.error}</p>}
      <div className="field full"><button className="button" disabled={pending}>{pending?"Submitting…":"Send for private review"}</button></div>
    </div>
  </form>;
  const contact = kind === "contact", response = kind === "response";
  return <form className="form-card" onSubmit={submit} noValidate>
    <div className="form-grid">
      <div className="field"><label htmlFor="name">Full name</label><input id="name" name="name" required autoComplete="name"/></div>
      {!contact && <div className="field"><label htmlFor="publicName">{response?"Position":"Public display name"}</label><input id="publicName" name="publicName" required/></div>}
      <div className="field"><label htmlFor="email">{response?"Company email":"Email"}</label><input id="email" name="email" type="email" required autoComplete="email"/></div>
      <div className="field"><label htmlFor="phone">Phone (optional)</label><input id="phone" name="phone" autoComplete="tel"/></div>
      {contact ? <><div className="field full"><label htmlFor="type">Enquiry type</label><select id="type" name="type"><option>General enquiry</option><option>Correction request</option><option>Privacy request</option><option>Legal notice</option><option>Media enquiry</option><option>Technical issue</option></select></div><div className="field full"><label htmlFor="title">Subject</label><input id="title" name="title" required/></div></>
      : response ? <><div className="field"><label htmlFor="type">Response type</label><select id="type" name="type"><option>General response</option><option>Specific review response</option><option>Correction request</option><option>Private information removal</option></select></div><div className="field"><label htmlFor="related">Related review or page</label><input id="related" name="related"/></div></>
      : <><div className="field"><label htmlFor="service">Service purchased</label><input id="service" name="service" required/></div><div className="field"><label htmlFor="serviceDate">Approximate service date</label><input id="serviceDate" name="serviceDate" type="month"/></div><div className="field"><label htmlFor="amount">Amount paid</label><input id="amount" name="amount" inputMode="decimal"/></div><div className="field"><label htmlFor="rating">Rating</label><select id="rating" name="rating"><option value="">Select</option>{[1,2,3,4,5].map(n=><option key={n}>{n}</option>)}</select></div><div className="field full"><label htmlFor="title">Review title</label><input id="title" name="title" minLength={8} required/></div></>}
      <div className="field full"><label htmlFor="message">{contact?"Message":response?"Response":"Full experience"}</label><textarea id="message" name="message" minLength={40} required/></div>
      {!contact&&!response&&<><div className="field full"><label htmlFor="resolution">Desired resolution</label><textarea id="resolution" name="resolution"/></div><div className="field"><label htmlFor="contacted">Company contacted?</label><select id="contacted" name="contacted"><option>No</option><option>Yes</option></select></div><div className="field"><label htmlFor="responded">Company responded?</label><select id="responded" name="responded"><option>No</option><option>Yes</option></select></div></>}
      <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"/>
      {!contact&&<label className="checkbox field full"><input name="accuracy" type="checkbox" required/><span>{response?"I declare that I am authorized to submit this response on behalf of the named business.":"I confirm this reflects my genuine experience and, to the best of my knowledge, is accurate. I understand unsupported accusations, private data, abusive language and unlawful content may be removed."}</span></label>}
      <label className="checkbox field full"><input name="consent" type="checkbox" required/><span>I consent to this website securely storing and reviewing the submitted information for moderation and, where approved, publication purposes.</span></label>
      {result?.error&&<p className="field full legal-note" role="alert">{result.error}</p>}
      <div className="field full"><button className="button" disabled={pending}>{pending?"Submitting…":"Submit for moderation"}</button></div>
    </div>
  </form>;
}
