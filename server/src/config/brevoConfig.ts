import { BrevoClient } from "@getbrevo/brevo";
import { BREVO_API_KEY, CLIENT_URL } from "./envConfig.js";
import { createError } from "../utils/createError.js";
import type { UserType } from "../types/index.js";

type EmailVariant =
  | { type: "reset-password"; validationToken: string }
  | { type: "reach-support"; comment: string };
type EmailOptions = { user: Pick<UserType, "name" | "email"> } & EmailVariant;

function buildTemplate(options: EmailOptions) {
  switch (options.type) {
    case "reset-password":
      return {
        id: 3,
        variables: {
          name: options.user.name,
          clientUrl: CLIENT_URL,
          resetLink: `${CLIENT_URL}/reset-password?validationToken=${options.validationToken}`,
        },
      };
    case "reach-support":
      return {
        id: 12,
        variables: {
          name: options.user.name,
          clientUrl: CLIENT_URL,
          comment: options.comment,
        },
      };
  }
}

const brevo = new BrevoClient({ apiKey: BREVO_API_KEY });

async function sendEmail(options: EmailOptions) {
  try {
    const template = buildTemplate(options);
    await brevo.transactionalEmails.sendTransacEmail({
      to: [{ email: options.user.email }],
      templateId: template.id,
      params: template.variables,
      tags: [`TaskPro_${options.type}`],
    });
  } catch (error) {
    console.error("❌ [Brevo] Email not sent");
    console.error(error);
    throw createError("BadGatewayError");
  }
}

export default sendEmail;
