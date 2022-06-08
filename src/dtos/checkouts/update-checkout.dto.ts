export interface UpdateCheckoutDataDTO {
  name?: string;
}

export interface UpdateCheckoutWhereDTO {
  checkoutId: string;
}

export interface UpdateCheckoutDTO {
  data: UpdateCheckoutDataDTO;
  where: UpdateCheckoutWhereDTO;
}
