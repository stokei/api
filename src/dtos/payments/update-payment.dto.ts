export interface UpdatePaymentDataDTO {
  name?: string;
}

export interface UpdatePaymentWhereDTO {
  paymentId: string;
}

export interface UpdatePaymentDTO {
  data: UpdatePaymentDataDTO;
  where: UpdatePaymentWhereDTO;
}
