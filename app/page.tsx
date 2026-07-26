import Link from "next/link";
import { ArrowRight, Check, FileText, MessageCircle, Scale, Star } from "lucide-react";

export const metadata = {
  title: "Make Your Brand Business Service LLC Customer Experience",
  description: "Read a carefully attributed customer experience involving Make Your Brand Business Service LLC, including payments, communication concerns and the company’s right of response.",
};

export default function Home() {
  return <>
    <section className="customer-rating" aria-label="Customer rating: 1 out of 5 stars">
      <div className="review-wrap">
        <div className="rating-stars" aria-hidden="true">
          <Star className="rated-star"/>
          <Star/><Star/><Star/><Star/>
        </div>
        <strong>1 out of 5</strong>
        <span>Rating given by the customer in this featured account — not an aggregate score.</span>
      </div>
    </section>
    <section className="review-hero">
      <div className="review-wrap">
        <div className="review-intro">
          <span className="eyebrow">One customer’s firsthand account</span>
          <h1>My experience with <span className="company-name">Make Your Brand Business Service LLC</span></h1>
          <p className="review-lead">The customer says the process began with the hope of setting up a business confidently, but later became a stressful disagreement about payment timing, communication and a requested refund breakdown.</p>
          <p className="attribution">This is the customer’s personal account. Disputed points are attributed, and the company is invited to respond.</p>
          <div className="actions">
            <Link className="button" href="#customer-story">Read the customer story <ArrowRight size={17}/></Link>
            <Link className="simple-link" href="/timeline">See the timeline</Link>
          </div>
        </div>

        <aside className="review-summary" aria-label="Experience summary">
          <div className="summary-heading">
            <span>Experience summary</span>
            <span className="pill amber">Customer account</span>
          </div>
          <dl>
            <div><dt>Discussed service total</dt><dd>AED 12,000</dd></div>
            <div><dt>Initial amount paid</dt><dd>AED 5,700</dd></div>
            <div><dt>Balance discussed</dt><dd>AED 6,300</dd></div>
            <div><dt>Repayment period recalled</dt><dd>Two months, verbal</dd></div>
          </dl>
          <p>The customer states that no refund or detailed deduction breakdown was received. The company’s position is shown below.</p>
        </aside>
      </div>
    </section>

    <section className="review-nav" aria-label="On this page">
      <div className="review-wrap">
        <span>On this page</span>
        <a href="#customer-story">What happened</a>
        <a href="#disagreement">Where the parties disagree</a>
        <a href="#what-to-learn">What customers can learn</a>
      </div>
    </section>

    <section className="story-section" id="customer-story">
      <div className="story-layout">
        <aside>
          <span className="eyebrow">The customer’s story</span>
          <h2>A process that began with hope and, according to the customer, ended in uncertainty.</h2>
        </aside>
        <div className="story-copy">
          <p className="drop-cap">According to the customer, the business setup process began after an initial payment of AED 5,700 against a discussed total of AED 12,000. The customer recalls personally agreeing to have two months to pay the remaining AED 6,300.</p>
          <p>The customer states that payment was requested sooner than expected. What followed became the central concern: written communication referred to license cancellation or amendment, while the customer says further action occurred without clear prior written notice.</p>
          <div className="story-emotion"><strong>The personal impact described</strong><p>The account centres on uncertainty: what the verbal payment understanding meant, what action could follow, and how any refund or deductions would be calculated. These are summaries of the customer’s stated concerns, not direct quotations.</p></div>
          <p>The customer states that a refund or a detailed explanation of deductions was expected but was not received. No private evidence is published until it has been reviewed and safely redacted.</p>
          <div className="record-note"><FileText size={19}/><div><strong>Evidence is handled carefully</strong><span>Documents are labelled by source and verification status. Private originals are never public.</span></div></div>
        </div>
      </div>
    </section>

    <section className="disagreement-section" id="disagreement">
      <div className="review-wrap">
        <div className="simple-heading"><span className="eyebrow">A fair view of both sides</span><h2>Where the parties appear to disagree</h2><p>This platform does not decide legal liability. It helps readers understand each stated position.</p></div>
        <div className="two-voices">
          <article>
            <span className="voice-icon"><MessageCircle/></span>
            <span className="eyebrow">The customer states</span>
            <ul>
              <li>A two-month payment period was verbally agreed.</li>
              <li>Payment was requested sooner than expected.</li>
              <li>Not every later action was clearly communicated in writing.</li>
              <li>A refund or detailed deduction breakdown was not received.</li>
            </ul>
          </article>
          <article>
            <span className="voice-icon"><Scale/></span>
            <span className="eyebrow">The company’s stated position</span>
            <ul>
              <li>Payment terms were communicated.</li>
              <li>Consequences of non-payment were communicated.</li>
              <li>Action was taken according to the agreed process.</li>
              <li>The company says it operates transparently and follows applicable procedures.</li>
            </ul>
          </article>
        </div>
        <div className="response-invite"><p><strong>Make Your Brand Business Service LLC may respond.</strong> A verified response, correction or clarification will be displayed fairly and prominently.</p><Link href="/company-response">Submit a company response <ArrowRight size={16}/></Link></div>
      </div>
    </section>

    <section className="lessons-section" id="what-to-learn">
      <div className="review-wrap lessons-layout">
        <div><span className="eyebrow">Before choosing a consultant</span><h2>What another customer can learn from this experience</h2></div>
        <ul>{["Put every payment extension in writing.","Ask what can happen if a payment is delayed.","Request refund and deduction terms before paying.","Confirm who can submit, amend or cancel applications.","Keep every receipt, email and agreement together."].map(item=><li key={item}><Check/>{item}</li>)}</ul>
      </div>
    </section>

    <section className="share-section">
      <div className="review-wrap">
        <div><span className="eyebrow">Have you used this company?</span><h2>Your experience may help someone decide more carefully.</h2><p>Share only what you personally experienced. Every submission is privately reviewed before publication.</p></div>
        <Link className="button" href="/submit-experience">Share your experience</Link>
      </div>
    </section>
  </>;
}
