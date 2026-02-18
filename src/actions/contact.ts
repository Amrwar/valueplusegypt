'use server';

import { Resend } from 'resend';
import fs from 'fs/promises';
import path from 'path';
import { ContactFormState, ContactSubmission } from '@/types';

const resend = new Resend(process.env.RESEND_API_KEY);
const SUBMISSIONS_PATH = path.join(process.cwd(), 'data', 'submissions.json');

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get('name')?.toString().trim() || '';
  const email = formData.get('email')?.toString().trim() || '';
  const phone = formData.get('phone')?.toString().trim() || '';
  const company = formData.get('company')?.toString().trim() || '';
  const service = formData.get('service')?.toString().trim() || '';
  const message = formData.get('message')?.toString().trim() || '';

  // Validation
  const fieldErrors: Record<string, string> = {};

  if (!name) fieldErrors.name = 'required';
  if (!email) fieldErrors.email = 'required';
  else if (!validateEmail(email)) fieldErrors.email = 'invalidEmail';
  if (!phone) fieldErrors.phone = 'required';
  if (!message) fieldErrors.message = 'required';

  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, error: '', fieldErrors };
  }

  // Store submission
  const submission: ContactSubmission = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
    company,
    service,
    message,
    submittedAt: new Date().toISOString(),
  };

  try {
    // Ensure data directory exists
    const dataDir = path.dirname(SUBMISSIONS_PATH);
    await fs.mkdir(dataDir, { recursive: true });

    // Read existing submissions
    let submissions: ContactSubmission[] = [];
    try {
      const data = await fs.readFile(SUBMISSIONS_PATH, 'utf-8');
      submissions = JSON.parse(data);
    } catch {
      // File doesn't exist yet, start with empty array
    }

    submissions.push(submission);
    await fs.writeFile(SUBMISSIONS_PATH, JSON.stringify(submissions, null, 2));
  } catch (err) {
    console.error('Failed to store submission:', err);
  }

  // Send email via Resend
  if (process.env.RESEND_API_KEY) {
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        to: process.env.CONTACT_EMAIL || 'info@valueplusegypt.com',
        subject: `New Contact: ${name} - ${service || 'General Inquiry'}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Company:</strong> ${company || 'N/A'}</p>
          <p><strong>Service:</strong> ${service || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p style="color: #666; font-size: 12px;">Submitted at ${submission.submittedAt}</p>
        `,
      });
    } catch (err) {
      console.error('Failed to send email:', err);
      // Don't fail the form submission if email fails
    }
  }

  return { success: true, error: '', fieldErrors: {} };
}
