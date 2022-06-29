export interface RemovePaymentsMethodWhereDTO {
  removedBy: string;
  paymentsMethodId: string;
}

export interface RemovePaymentsMethodDTO {
  where: RemovePaymentsMethodWhereDTO;
}
