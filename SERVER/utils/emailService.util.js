import nodemailer from 'nodemailer';
import {
  getApplicationApprovedTemplate,
  getApplicationRejectedTemplate,
  getApplicationSubmittedTemplate
} from './emailTemplates.js';

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: `"LabCore" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

export const sendApplicationSubmittedEmail = async (labName, ownerEmail) => {
  const subject = 'Lab Application Received - LabCore';
  const html = getApplicationSubmittedTemplate(labName);
  return sendEmail(ownerEmail, subject, html);
};

export const sendApplicationApprovedEmail = async (labName, ownerEmail, password) => {
  const subject = 'Lab Application Approved - LabCore';
  const html = getApplicationApprovedTemplate(labName, ownerEmail, password);
  return sendEmail(ownerEmail, subject, html);
};

export const sendApplicationRejectedEmail = async (labName, ownerEmail, reason) => {
  const subject = 'Lab Application Status Update - LabCore';
  const html = getApplicationRejectedTemplate(labName, reason);
  return sendEmail(ownerEmail, subject, html);
}; 