import { Check, FileText, ShieldCheck, Star } from "lucide-react";
import { SubmissionForm } from "@/components/submission-form";

export const metadata = {
  title: "My Experience with Make Your Brand Business Service LLC",
  description: "One customer’s personal account of payments, communication and unresolved questions during a business setup service.",
};

const steps = [
  ["I agreed to start", "The total discussed for the service was AED 12,000."],
  ["I made an initial payment", "I paid AED 5,700 and the business setup process began."],
  ["A balance remained", "AED 6,300 remained. I recall verbally agreeing that I would have two months to pay it."],
  ["The timing became disputed", "I say payment was requested sooner than I expected, while the company states that its payment terms were communicated."],
  ["Further action became a concern", "Written communication referred to license cancellation or amendment. I say other action was not clearly explained to me beforehand in writing."],
  ["I asked for clarity", "I say I did not receive a refund or a detailed breakdown explaining any deductions."],
] as const;

export default function Home() {
  return <>
    <section className="customer-rating" aria-label="My rating: 1 out of 5 stars">
      <div className="one-page-wrap">
        <div className="rating-stars" aria-hidden="true"><Star className="rated-star"/><Star/><Star/><Star/><Star/></div>
      </div>
    </section>

    <section className="personal-hero">
      <div className="one-page-wrap personal-hero-grid">
        <div>
          <span className="eyebrow">My personal experience</span>
          <h1>My experience with <span className="company-name">Make Your Brand Business Service LLC</span></h1>
          <p className="personal-lead">I started this process hoping to set up my business with confidence. It later became a stressful disagreement about payment timing, communication and what would happen next.</p>
          <a className="button" href="#my-story">Read what happened</a>
        </div>
        <aside className="simple-facts" aria-label="Key payment details">
          <span className="eyebrow">The key numbers</span>
          <dl>
            <div><dt>Total discussed</dt><dd>AED 12,000</dd></div>
            <div><dt>Amount I paid</dt><dd>AED 5,700</dd></div>
            <div><dt>Balance discussed</dt><dd>AED 6,300</dd></div>
            <div><dt>Payment period I recall</dt><dd>Two months, verbal</dd></div>
          </dl>
        </aside>
      </div>
    </section>

    <section className="plain-note">
      <div className="one-page-wrap"><ShieldCheck/><p>This page shares my personal account. Where the company has a different position, I say so clearly. Readers should review available records and reach their own conclusions.</p></div>
    </section>

    <section className="personal-section" id="my-story">
      <div className="one-page-wrap narrow-story">
        <span className="eyebrow">What happened</span>
        <h2>My experience, step by step</h2>
        <p className="section-intro">I have kept this simple so that anyone considering a business setup consultant can understand the main points.</p>
        <ol className="simple-steps">
          {steps.map(([title,text], index) => <li key={title}><span>{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}
        </ol>
      </div>
    </section>

    <section className="personal-section soft-section" id="why-it-mattered">
      <div className="one-page-wrap two-simple-columns">
        <div><span className="eyebrow">Why this mattered to me</span><h2>The hardest part was the uncertainty.</h2></div>
        <div className="large-copy"><p>My concern was not only the money. It was not knowing exactly what the verbal payment understanding meant, what action could follow, and how any refund or deductions would be calculated.</p><p>This is a summary of the concerns in my account, not a direct quotation from a document.</p></div>
      </div>
    </section>

    <section className="personal-section" id="both-sides">
      <div className="one-page-wrap">
        <div className="simple-section-heading"><span className="eyebrow">A fair view</span><h2>Where our positions differ</h2></div>
        <div className="simple-comparison">
          <article><h3>My position</h3><ul><li>I understood that I had two months to pay the balance.</li><li>I say payment was requested sooner than expected.</li><li>I say later action was not clearly communicated beforehand in writing.</li><li>I say I did not receive a refund or detailed deduction breakdown.</li></ul></article>
          <article><h3>The company’s stated position</h3><ul><li>Payment terms were communicated.</li><li>The consequences of non-payment were communicated.</li><li>Action was taken according to the agreed process.</li><li>The company says it operates transparently and follows applicable procedures.</li></ul></article>
        </div>
        <p className="fairness-line">This website does not determine legal liability. The company may submit a correction, clarification or response, which will be displayed fairly.</p>
      </div>
    </section>

    <section className="personal-section soft-section" id="lessons">
      <div className="one-page-wrap two-simple-columns">
        <div><span className="eyebrow">What I learned</span><h2>Five things I would ask for in writing.</h2></div>
        <ul className="personal-lessons">
          {["The complete payment schedule and every extension.","What happens if any payment is delayed.","The refund policy and every possible deduction.","Who can submit, change or cancel an application.","Copies of every receipt, agreement and official communication."].map(item=><li key={item}><Check/>{item}</li>)}
        </ul>
      </div>
    </section>

    <section className="personal-section evidence-section">
      <div className="one-page-wrap evidence-box"><FileText/><div><h2>Documents should protect privacy.</h2><p>Only reviewed and redacted records should be public. Passport numbers, Emirates ID details, signatures, bank information and private contact details must remain hidden.</p></div></div>
    </section>

    <section className="personal-section share-form-section" id="share">
      <div className="one-page-wrap">
        <div className="simple-section-heading"><span className="eyebrow">Share your experience</span><h2>Did you use the same company?</h2><p>If you are a genuine customer, you can share what happened to you. Your submission stays private until it is reviewed.</p></div>
        <div className="embedded-form"><SubmissionForm kind="experience" compact/></div>
      </div>
    </section>
  </>;
}
