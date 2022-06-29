export interface UpdatePaymentDataDTO {
  updatedBy: string;
  name?: string;
}

export interface UpdatePaymentWhereDTO {
  paymentId: string;
}

export interface UpdatePaymentDTO {
  data: UpdatePaymentDataDTO;
  where: UpdatePaymentWhereDTO;
}
