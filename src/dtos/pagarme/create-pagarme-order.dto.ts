export interface CreatePagarmeOrderPriceDTO {
  id: string;
  name: string;
  amount: number;
  quantity: number;
}

export interface CreatePagarmeOrderDTO {
  payment: string;
  appRecipient: string;
  totalAmount: number;
  feeAmount: number;
  customer: string;
  currency: string;
  prices: CreatePagarmeOrderPriceDTO[];
}
