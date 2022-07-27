export interface RemoveDomainWhereDTO {
  removedBy: string;
  app: string;
  domain: string;
}

export interface RemoveDomainDTO {
  where: RemoveDomainWhereDTO;
}
