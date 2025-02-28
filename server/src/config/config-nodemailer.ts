import nodemailer from "nodemailer";
import { EMAIL, PASSWORD, IN_DEVELOPMENT } from "./config-env.js";
import { UserType } from "../app.types.js";

async function sendEmail(
  variant: "customerSupport" | "passwordRecovery",
  user: UserType,
  data: string
) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: EMAIL, pass: PASSWORD },
    });

    switch (variant) {
      case "customerSupport": {
        await transporter.sendMail({
          from: EMAIL,
          to: user.email,
          subject: "Confirmation of Your Issue - Action Underway",
          text: `Dear ${user.name}, \nThank you for reaching out to us and bringing your concern to our attention. We have received your comment and would like to inform you that our team is currently analyzing the issue: "${data}". \nRest assured that we are committed to finding a resolution as quickly as possible. We appreciate your patience and understanding during this process. \nThank you for your trust in us. \nBest regards, \nTaskPro Customer Support Team !`,
          html: `<p>Dear <strong>${user.name}</strong>,</p> 
            <p>Thank you for reaching out to us and bringing your concern to our attention. We have received your comment and would like to inform you that our team is currently analyzing the issue: <strong>"${data}"</strong>.</p>
            <p>Rest assured that we are committed to finding a resolution as quickly as possible. We appreciate your patience and understanding during this process. Thank you for your trust in us.</p>
            <p>Best regards,</p>
            <p><strong>TaskPro</strong> Customer Support Team !</p>`,
        });
        break;
      }
      case "passwordRecovery": {
        const recoveryLink = IN_DEVELOPMENT
          ? `http://localhost:5173/reset-password?validationToken=${data}`
          : `https://taskpro-beryl.vercel.app/reset-password?validationToken=${data}`;

        await transporter.sendMail({
          from: EMAIL,
          to: user.email,
          subject: "Password Change Request Received",
          text: `Dear ${user.name}, \n\nWe have received your request to change the password for the account associated with this email address. \n\nPlease click the link below to reset your password: \n${recoveryLink} \n\nIf you did not request this password change, please ignore this email or contact our support team if you have any concerns. \n\nBest regards, \nTaskPro Customer Support Team !`,
          html: `<p>Dear <strong>${user.name}</strong>,</p>
            <p>We have received your request to change the password for the account associated with this email address.</p>
            <p>Please click the following link to reset your password: <a href="${recoveryLink}">Reset Password</a></p>
            <p>If you did not request this password change, please ignore this email or contact our support team if you have any concerns.</p>
            <p>Best regards,</p>
            <p><strong>TaskPro</strong> Customer Support Team !</p>`,
        });
        break;
      }
    }

    console.log(`Email sent succesfully`);
  } catch (error) {
    console.error(error);
    throw new Error("Email not sent. Internal server error");
  }
}

export default sendEmail;
