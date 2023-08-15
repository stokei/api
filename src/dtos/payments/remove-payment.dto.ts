export interface RemovePaymentWhereDTO {
  removedBy: string;
  app: string;
  payment: string;
}

export interface RemovePaymentDTO {
  where: RemovePaymentWhereDTO;
}
