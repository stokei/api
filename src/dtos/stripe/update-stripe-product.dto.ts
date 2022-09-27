export interface UpdateStripeProductDataDTO {
  name?: string;
  description?: string;
}

export interface UpdateStripeProductWhereDTO {
  stripeProduct: string;
  stripeAccount: string;
}

export interface UpdateStripeProductDTO {
  data: UpdateStripeProductDataDTO;
  where: UpdateStripeProductWhereDTO;
}
