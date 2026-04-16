// DATA REQUIREMENTS:
// - Form submission: POST /api/submit-enquiry
//   Payload: EnquiryFormData (see types/index.ts)
//   Response: EnquirySubmissionResult
//   Table: enquiry_submissions (type: dfi | government | industry_body | fleet | partnership | other)
//   Side effect: Supabase insert + email notification via edge function
// - TODO: Asif to implement the submitEnquiry server action below

import type { Metadata } from "next";
import { ENQUIRY_TYPES, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a conversation with Transport Action Group.",
};

// TODO: Asif to implement this Server Action
// "use server";
// async function submitEnquiry(formData: FormData): Promise<EnquirySubmissionResult> {
//   const payload: EnquiryFormData = {
//     organisation_name: formData.get("organisation_name") as string,
//     organisation_role: formData.get("organisation_role") as string,
//     contact_name: formData.get("contact_name") as string,
//     email: formData.get("email") as string,
//     mobile: formData.get("mobile") as string | undefined,
//     fleet_size: formData.get("fleet_size") as string | undefined,
//     nature_of_enquiry: formData.get("nature_of_enquiry") as string,
//     enquiry_type: formData.get("enquiry_type") as EnquiryType,
//   };
//   const res = await fetch(process.env.ENQUIRY_API_URL!, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });
//   return res.json();
// }

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container max-w-2xl">
        {/* Header */}
        <div className="mb-12">
          <span className="badge mb-4">Contact TAG</span>
          <h1 className="mb-4">Start a conversation</h1>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Whether you are a DFI, industry body, public-sector actor, or ecosystem collaborator —
            we would like to hear from you. Tell us briefly about your organisation and the nature
            of your enquiry and we will be in touch.
          </p>
        </div>

        {/* Enquiry Form */}
        {/* TODO: Asif — wire action={submitEnquiry} to this form */}
        <form className="space-y-6">
          {/* Organisation name */}
          <div>
            <label htmlFor="organisation_name" className="block text-sm font-medium mb-2">
              Organisation name <span className="text-red-400">*</span>
            </label>
            <input
              id="organisation_name"
              name="organisation_name"
              type="text"
              required
              placeholder="Your organisation"
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500/60 transition-colors text-sm"
            />
          </div>

          {/* Role of organisation */}
          <div>
            <label htmlFor="organisation_role" className="block text-sm font-medium mb-2">
              Role of your organisation <span className="text-red-400">*</span>
            </label>
            <select
              id="organisation_role"
              name="enquiry_type"
              required
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500/60 transition-colors text-sm"
            >
              <option value="">Select organisation type</option>
              {ENQUIRY_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Contact name */}
          <div>
            <label htmlFor="contact_name" className="block text-sm font-medium mb-2">
              Your name <span className="text-red-400">*</span>
            </label>
            <input
              id="contact_name"
              name="contact_name"
              type="text"
              required
              placeholder="Full name"
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500/60 transition-colors text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email address <span className="text-red-400">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@organisation.com"
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500/60 transition-colors text-sm"
            />
          </div>

          {/* Mobile — optional */}
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium mb-2">
              Mobile <span className="text-muted-foreground text-xs font-normal">(optional)</span>
            </label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              placeholder="+27 ..."
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500/60 transition-colors text-sm"
            />
          </div>

          {/* Fleet size — optional */}
          <div>
            <label htmlFor="fleet_size" className="block text-sm font-medium mb-2">
              Fleet size <span className="text-muted-foreground text-xs font-normal">(optional)</span>
            </label>
            <input
              id="fleet_size"
              name="fleet_size"
              type="text"
              placeholder="e.g. 50 trucks"
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500/60 transition-colors text-sm"
            />
          </div>

          {/* Nature of enquiry */}
          <div>
            <label htmlFor="nature_of_enquiry" className="block text-sm font-medium mb-2">
              Nature of enquiry <span className="text-red-400">*</span>
            </label>
            <textarea
              id="nature_of_enquiry"
              name="nature_of_enquiry"
              required
              rows={4}
              placeholder="Briefly describe what you are looking to explore or discuss..."
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500/60 transition-colors text-sm resize-none"
            />
          </div>

          {/* Submit */}
          {/* TODO: Asif — add pending state using useFormStatus */}
          <button type="submit" className="btn-primary w-full justify-center py-4">
            Send enquiry
          </button>

          <p className="text-xs text-muted-foreground text-center">
            We will respond within 2 business days.
          </p>
        </form>
      </div>
    </div>
  );
}
