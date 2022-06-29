export interface UpdateDomainDataDTO {
  updatedBy: string;
  name?: string;
}

export interface UpdateDomainWhereDTO {
  domainId: string;
}

export interface UpdateDomainDTO {
  data: UpdateDomainDataDTO;
  where: UpdateDomainWhereDTO;
}
