export interface RemoveSiteWhereDTO {
  removedBy: string;
  app: string;
  site: string;
}

export interface RemoveSiteDTO {
  where: RemoveSiteWhereDTO;
}
