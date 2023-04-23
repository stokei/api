export interface ChangeInvoiceToPaymentErrorDTO {
  invoice: string;
  invoiceUrl: string;
  paymentMethod: string;
  app: string;
  updatedBy: string;
}
