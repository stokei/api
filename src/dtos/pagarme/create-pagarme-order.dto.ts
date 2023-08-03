export interface CreatePagarmeOrderPriceDTO {
  id: string;
  name: string;
  amount: number;
  quantity: number;
}

export interface CreatePagarmeOrderDTO {
  orderId: string;
  appRecipient: string;
  customer: string;
  currency: string;
  prices: CreatePagarmeOrderPriceDTO[];
}
