export const getApplicationApprovedTemplate = (labName, email, password) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Inter', Arial, sans-serif;
      line-height: 1.6;
      color: #1e293b;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
      background-color: #f8fafc;
    }
    .card {
      background-color: #ffffff;
      border-radius: 24px;
      padding: 40px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
    }
    .header {
      text-align: center;
      margin-bottom: 32px;
    }
    .logo {
      width: 48px;
      height: 48px;
      background-color: #10b981;
      border-radius: 12px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 900;
      font-size: 24px;
      margin-bottom: 16px;
    }
    h1 {
      color: #0f172a;
      font-size: 24px;
      font-weight: 800;
      margin: 0;
      letter-spacing: -0.025em;
    }
    .content {
      color: #475569;
      font-size: 16px;
    }
    .credentials {
      background-color: #f1f5f9;
      padding: 24px;
      border-radius: 16px;
      margin: 24px 0;
      border: 1px dashed #cbd5e1;
    }
    .credential-item {
      margin-bottom: 8px;
    }
    .credential-item:last-child {
      margin-bottom: 0;
    }
    .label {
      font-size: 12px;
      font-weight: 700;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      display: block;
    }
    .value {
      font-family: monospace;
      font-size: 16px;
      font-weight: 700;
      color: #0f172a;
    }
    .button {
      display: block;
      text-align: center;
      padding: 16px 32px;
      background-color: #10b981;
      color: white !important;
      text-decoration: none;
      border-radius: 12px;
      font-weight: 700;
      margin-top: 32px;
      box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.2);
    }
    .footer {
      text-align: center;
      margin-top: 32px;
      font-size: 12px;
      color: #94a3b8;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="header">
        <div class="logo">T</div>
        <h1>Application Approved</h1>
      </div>
      <div class="content">
        <p>Dear Lab Owner,</p>
        <p>We are excited to welcome <strong>${labName}</strong> to the TestSahulat partner network. Your application has been verified and approved.</p>
        
        <p>You can now access your dedicated lab dashboard using these temporary credentials:</p>
        
        <div class="credentials">
          <div class="credential-item">
            <span class="label">Admin Email</span>
            <span class="value">${email}</span>
          </div>
          <div class="credential-item" style="margin-top: 12px;">
            <span class="label">Temporary Password</span>
            <span class="value">${password}</span>
          </div>
        </div>
        
        <p style="font-size: 14px; color: #64748b;">For security, please change your password immediately after your first login.</p>
        
        <a href="${process.env.FRONTEND_URL}/login" class="button">Access Lab Dashboard</a>
      </div>
      <div class="footer">
        &copy; ${new Date().getFullYear()} TestSahulat. All rights reserved.
      </div>
    </div>
  </div>
</body>
</html>
`;

export const getApplicationRejectedTemplate = (labName, reason = "") => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Inter', Arial, sans-serif;
      line-height: 1.6;
      color: #1e293b;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .card {
      background-color: #ffffff;
      border-radius: 24px;
      padding: 40px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
    }
    .header h1 {
      color: #e11d48;
      font-size: 24px;
      font-weight: 800;
    }
    .reason-box {
      background-color: #fff1f2;
      padding: 24px;
      border-radius: 16px;
      margin: 24px 0;
      border: 1px solid #fecdd3;
      color: #9f1239;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="header">
        <h1>Application Update</h1>
      </div>
      <p>Dear Lab Owner,</p>
      <p>Thank you for your interest in joining TestSahulat. After reviewing your application for <strong>${labName}</strong>, we regret to inform you that we cannot proceed at this time.</p>
      
      ${reason ? `
      <div class="reason-box">
        <strong>Reason for Decision:</strong><br/>
        ${reason}
      </div>
      ` : ""}
      
      <p>If you believe this is an error or would like to reapply after addressing the concerns above, please contact our support team.</p>
      
      <p>Best regards,<br/>TestSahulat Compliance Team</p>
    </div>
  </div>
</body>
</html>
`;

export const getApplicationSubmittedTemplate = (labName) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Inter', Arial, sans-serif;
      line-height: 1.6;
      color: #1e293b;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .card {
      background-color: #ffffff;
      border-radius: 24px;
      padding: 40px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
    }
    .header h1 {
      color: #0ea5e9;
      font-size: 24px;
      font-weight: 800;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="header">
        <h1>Application Received</h1>
      </div>
      <p>Dear Lab Owner,</p>
      <p>This is to confirm that we have received your application for <strong>${labName}</strong> to join the TestSahulat network.</p>
      <p>Our verification team is currently reviewing your documents. This process typically takes 2-3 business days. We will notify you via email as soon as a decision is made.</p>
      <p>Thank you for your patience.</p>
      <p>Best regards,<br/>TestSahulat Onboarding Team</p>
    </div>
  </div>
</body>
</html>
`;