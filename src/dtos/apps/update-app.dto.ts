export interface UpdateAppDataDTO {
  name?: string;
  email?: string;
  description?: string;
  defaultDomain?: string;
  avatar?: string;
  slug?: string;
  catalog?: string;
  icon?: string;
  stripeBankAccount?: string;
  stripeAccount?: string;
  pagarmeAccount?: string;
  mercadopagoAccount?: string;
  pagseguroAccount?: string;
  stripeCustomer?: string;
  paymentMethod?: string;
  logo?: string;
  updatedBy: string;
}

export interface UpdateAppWhereDTO {
  app: string;
}

export interface UpdateAppDTO {
  data: UpdateAppDataDTO;
  where: UpdateAppWhereDTO;
}
