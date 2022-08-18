export interface UpdateAppDataDTO {
  name?: string;
  description?: string;
  avatar?: string;
  plan?: string;
  icon?: string;
  stripeAccount?: string;
  logo?: string;
  updatedBy: string;
}

export interface UpdateAppWhereDTO {
  app: string;
}

export interface UpdateAppDTO {
  data: UpdateAppDataDTO;
  where: UpdateAppWhereDTO;
}
