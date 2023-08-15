export interface UpdatePaymentDataDTO {
  updatedBy: string;
  name?: string;
  description?: string;
}

export interface UpdatePaymentWhereDTO {
  app: string;
  payment: string;
}

export interface UpdatePaymentDTO {
  data: UpdatePaymentDataDTO;
  where: UpdatePaymentWhereDTO;
}
