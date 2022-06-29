export interface RemovePaymentWhereDTO {
  removedBy: string;
  paymentId: string;
}

export interface RemovePaymentDTO {
  where: RemovePaymentWhereDTO;
}
