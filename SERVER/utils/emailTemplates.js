export const getApplicationApprovedTemplate = (labName, email, password) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: #4CAF50;
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 5px 5px 0 0;
    }
    .content {
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 0 0 5px 5px;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
    }
    .credentials {
      background-color: #fff;
      padding: 15px;
      border-radius: 5px;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Lab Application Approved!</h1>
    </div>
    <div class="content">
      <p>Dear Lab Owner,</p>
      
      <p>We are pleased to inform you that your application for <strong>${labName}</strong> has been approved!</p>
      
      <p>You can now access your lab dashboard using the following credentials:</p>
      
      <div class="credentials">
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Password:</strong> ${password}</p>
      </div>
      
      <p>For security reasons, we recommend changing your password after your first login.</p>
      
      <p>You can access your dashboard by clicking the button below:</p>
      
      <a href="${process.env.FRONTEND_URL}/login" class="button">Login to Dashboard</a>
      
      <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
      
      <p>Best regards,<br>LabCore Team</p>
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
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: #f44336;
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 5px 5px 0 0;
    }
    .content {
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 0 0 5px 5px;
    }
    .reason {
      background-color: #fff;
      padding: 15px;
      border-radius: 5px;
      margin: 20px 0;
      border-left: 4px solid #f44336;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Lab Application Status Update</h1>
    </div>
    <div class="content">
      <p>Dear Lab Owner,</p>
      
      <p>We regret to inform you that your application for <strong>${labName}</strong> has not been approved at this time.</p>
      
      ${reason ? `
      <div class="reason">
        <p><strong>Reason for rejection:</strong></p>
        <p>${reason}</p>
      </div>
      ` : ""}
      
      <p>If you would like to reapply or have any questions about this decision, please contact our support team.</p>
      
      <p>Best regards,<br>LabCore Team</p>
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
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: #2196F3;
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 5px 5px 0 0;
    }
    .content {
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 0 0 5px 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Lab Application Received</h1>
    </div>
    <div class="content">
      <p>Dear Lab Owner,</p>
      
      <p>Thank you for submitting your application for <strong>${labName}</strong>. We have received your application and it is currently under review.</p>
      
      <p>Our team will review your application and get back to you within 2-3 business days. You will receive an email notification once the review is complete.</p>
      
      <p>If you have any questions in the meantime, please don't hesitate to contact our support team.</p>
      
      <p>Best regards,<br>LabCore Team</p>
    </div>
  </div>
</body>
</html>
`; 