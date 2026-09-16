export interface EmailConfig {
  provider: "smtp" | "resend" | "ses" | "brevo"
  from: string
  fromName?: string
  to: string
  smtpHost?: string
  smtpPort?: number
  smtpUser?: string
  smtpPass?: string
  smtpSecure?: boolean
  brevoApiKey?: string
}

export interface SendEmailOptions {
  to: string
  subject: string
  html: string
}

export interface SendEmailResult {
  success: boolean
  messageId?: string
  error?: string
}

export interface EmailProvider {
  send(options: SendEmailOptions): Promise<SendEmailResult>
  name: string
}

export interface QuoteFormData {
  firstName: string
  lastName: string
  company?: string
  email: string
  phone: string
  freightType: "air" | "road" | "ocean"
  weight?: string
  quantity?: string
  from: string
  to: string
  notes?: string
}
