export interface ChangeInvoiceToPaidDTO {
  invoice: string;
  invoiceUrl: string;
  paymentMethod: string;
  app: string;
  updatedBy: string;
}
