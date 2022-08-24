export interface CreateCheckoutSessionPriceDTO {
  price: string;
  quantity: number;
}

export interface CreateCheckoutSessionDTO {
  app: string;
  customer: string;
  prices: CreateCheckoutSessionPriceDTO[];
  createdBy: string;
}
