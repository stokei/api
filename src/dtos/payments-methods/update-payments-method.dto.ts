export interface UpdatePaymentsMethodDataDTO {
  updatedBy: string;
  name?: string;
}

export interface UpdatePaymentsMethodWhereDTO {
  paymentsMethodId: string;
}

export interface UpdatePaymentsMethodDTO {
  data: UpdatePaymentsMethodDataDTO;
  where: UpdatePaymentsMethodWhereDTO;
}
