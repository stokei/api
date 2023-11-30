export type EmailData = string | { name?: string; email: string };

export interface SendEmailDTO {
  to: EmailData;
  route: string;
  data?: any;
  app: string;
  createdBy: string;
}
