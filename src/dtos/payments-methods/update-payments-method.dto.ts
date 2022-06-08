export interface UpdatePaymentsMethodDataDTO {
  name?: string;
}

export interface UpdatePaymentsMethodWhereDTO {
  paymentsMethodId: string;
}

export interface UpdatePaymentsMethodDTO {
  data: UpdatePaymentsMethodDataDTO;
  where: UpdatePaymentsMethodWhereDTO;
}
