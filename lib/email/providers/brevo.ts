import { EmailConfig, EmailProvider, SendEmailOptions } from "../types"

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email"

export function createBrevoProvider(config: EmailConfig): EmailProvider {
  if (!config.brevoApiKey) {
    throw new Error("Brevo provider requires BREVO_API_KEY to be set")
  }

  const apiKey = config.brevoApiKey

  return {
    name: "brevo",

    async send(options: SendEmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
      const payload = {
        sender: {
          name: config.fromName || "NileLink",
          email: config.from,
        },
        to: [{ email: options.to }],
        subject: options.subject,
        htmlContent: options.html,
      }

      const response = await fetch(BREVO_API_URL, {
        method: "POST",
        headers: {
          "api-key": apiKey,
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorBody = await response.text()
        return {
          success: false,
          error: `Brevo API error ${response.status}: ${errorBody}`,
        }
      }

      const data = (await response.json()) as { messageId?: string }

      return {
        success: true,
        messageId: data.messageId,
      }
    },
  }
}
