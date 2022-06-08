export interface UpdateCheckoutsCurrencyDataDTO {
  name?: string;
}

export interface UpdateCheckoutsCurrencyWhereDTO {
  checkoutsCurrencyId: string;
}

export interface UpdateCheckoutsCurrencyDTO {
  data: UpdateCheckoutsCurrencyDataDTO;
  where: UpdateCheckoutsCurrencyWhereDTO;
}
