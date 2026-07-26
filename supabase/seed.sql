-- SAMPLE CONTENT ONLY. Replace and fact-check before production.
insert into public.site_settings(setting_key,setting_value) values
('site_name','"Clear Terms"'),('company_discussed','"Make Your Brand Business Service LLC"'),
('hero_heading','"Before You Choose a Business Setup Consultant, Know the Full Story."'),
('legal_review_required','true') on conflict(setting_key) do nothing;
insert into public.timeline_events(title,slug,description,event_type,evidence_status,source_type,sort_order,moderation_status) values
('Initial service discussion','initial-service-discussion','Sample placeholder: customer describes a service discussion.','initial_discussion','customer_account','customer',1,'published'),
('Initial payment','initial-payment','Sample placeholder: redacted payment record must be supplied.','payment','awaiting_evidence','customer',2,'published'),
('Process began','process-began','Sample placeholder: parties appear to agree that a process began.','process_started','disputed','mixed',3,'published'),
('Balance notice','balance-notice','Sample placeholder: an outstanding balance was requested.','outstanding_balance_notice','customer_account','customer',4,'published'),
('License communication','license-communication','Sample placeholder: a redacted email is required.','license_communication','awaiting_evidence','document',5,'published'),
('Refund request','refund-request','Sample placeholder: customer states a breakdown was requested.','refund_request','disputed','customer',6,'published')
on conflict(slug) do nothing;
insert into public.company_responses(respondent_name,company_email,response_type,response_original,response_public,identity_status,moderation_status,public_note)
values('Sample company response placeholder','replace@example.invalid','general','SAMPLE ONLY — replace with an authenticated company response before publication.','No authenticated company response has been provided for publication.','unconfirmed','published','Sample placeholder; not attributed to the company.');
insert into public.documents(title,slug,category,description,verification_status,redaction_status,visibility) values
('Initial payment receipt','initial-payment-receipt','Payment Confirmations','Sample placeholder only.','awaiting_evidence','not_reviewed','private'),
('License-related email','license-related-email','Emails','Sample placeholder only.','awaiting_evidence','not_reviewed','private'),
('Refund communication','refund-communication','Refund Communications','Sample placeholder only.','awaiting_evidence','not_reviewed','private') on conflict(slug) do nothing;
insert into public.faqs(question,answer,sort_order,published) values
('Is this the company official website?','No. This is an independent, non-affiliated consumer awareness platform.',1,true),
('Are all submissions published?','No. Every submission is held for moderation and may be rejected, edited or redacted.',2,true),
('Can a business respond?','Yes. Businesses may submit a response, correction, clarification or privacy request.',3,true);
