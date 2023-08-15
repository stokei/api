export interface CreatePaymentDTO {
  name: string;
  description?: string;
  parent: string;
  app: string;
  createdBy: string;
}
