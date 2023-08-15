export interface UpdatePaymentDataDTO {
  updatedBy: string;
  paymentMethod?: string;
  stripeCheckoutSession?: string;
  feeAmount?: number;
  totalAmount?: number;
  subtotalAmount?: number;
}

export interface UpdatePaymentWhereDTO {
  app: string;
  payment: string;
}

export interface UpdatePaymentDTO {
  data: UpdatePaymentDataDTO;
  where: UpdatePaymentWhereDTO;
}
