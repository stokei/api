export interface RemoveDomainWhereDTO {
  removedBy: string;
  domainId: string;
}

export interface RemoveDomainDTO {
  where: RemoveDomainWhereDTO;
}
