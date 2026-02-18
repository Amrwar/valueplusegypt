'use server';

import { Resend } from 'resend';
import { ContactFormState } from '@/types';

const resend = new Resend(process.env.RESEND_API_KEY);

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

  const submittedAt = new Date().toISOString();

  // Store submission to file (local dev only — Vercel has read-only filesystem)
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    const filePath = path.join(process.cwd(), 'data', 'submissions.json');

    await fs.mkdir(path.dirname(filePath), { recursive: true });

    let submissions: unknown[] = [];
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      submissions = JSON.parse(data);
    } catch {
      // File doesn't exist yet
    }

    submissions.push({
      id: crypto.randomUUID(),
      name, email, phone, company, service, message, submittedAt,
    });

    await fs.writeFile(filePath, JSON.stringify(submissions, null, 2));
  } catch {
    // Silently skip on read-only filesystems (Vercel)
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
          <p style="color: #666; font-size: 12px;">Submitted at ${submittedAt}</p>
        `,
      });
    } catch (err) {
      console.error('Failed to send email:', err);
    }
  }

  return { success: true, error: '', fieldErrors: {} };
}
