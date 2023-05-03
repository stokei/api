export type EmailData = string | { name?: string; email: string };

export interface SendEmailDTO {
  from: EmailData;
  to: EmailData;
  subject: string;
  templateId: string;
  data?: any;
  app: string;
  createdBy: string;
}
