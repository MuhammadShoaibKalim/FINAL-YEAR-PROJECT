import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, 
      },
      pool: true,
    });

    const mailOptions = {
      from: `"LabCore Support" <${process.env.SMTP_MAIL}>`,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    // console.log(`Email successfully sent to ${to}`);
  } catch (error) {
    // console.error("Error sending email:", error);
    throw new Error("Email could not be sent, please try again.");
  }
};
