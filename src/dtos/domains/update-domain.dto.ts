export interface UpdateDomainDataDTO {
  updatedBy: string;
  default?: boolean;
}

export interface UpdateDomainWhereDTO {
  domainId: string;
}

export interface UpdateDomainDTO {
  data: UpdateDomainDataDTO;
  where: UpdateDomainWhereDTO;
}
