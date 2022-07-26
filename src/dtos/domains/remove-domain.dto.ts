export interface RemoveDomainWhereDTO {
  removedBy: string;
  app: string;
  domainId: string;
}

export interface RemoveDomainDTO {
  where: RemoveDomainWhereDTO;
}
