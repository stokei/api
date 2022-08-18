export interface CreateCheckoutSessionPriceDTO {
  price: string;
  quantity: number;
}

export interface CreateCheckoutSessionDTO {
  app: string;
  account: string;
  prices: CreateCheckoutSessionPriceDTO[];
  createdBy: string;
}
