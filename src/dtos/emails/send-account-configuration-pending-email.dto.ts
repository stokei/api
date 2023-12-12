export interface SendAccountConfigurationPendingEmailDTO {
  toAccount: string;
  plainTextPassword?: string;
  app: string;
  createdBy: string;
}
