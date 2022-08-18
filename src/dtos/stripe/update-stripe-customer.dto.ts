export interface UpdateStripeCustomerDataDTO {
  name?: string;
  email?: string;
}

export interface UpdateStripeCustomerWhereDTO {
  stripeCustomer: string;
  stripeAccount: string;
}

export interface UpdateStripeCustomerDTO {
  data: UpdateStripeCustomerDataDTO;
  where: UpdateStripeCustomerWhereDTO;
}
