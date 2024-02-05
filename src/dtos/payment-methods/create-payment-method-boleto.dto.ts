export interface CreatePaymentMethodBoletoDTO {
  boletoLine: string;
  boletoBarcode: string;
  boletoURL: string;
  app: string;
  createdBy: string;
}
