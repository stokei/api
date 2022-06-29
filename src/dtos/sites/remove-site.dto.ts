export interface RemoveSiteWhereDTO {
  removedBy: string;
  siteId: string;
}

export interface RemoveSiteDTO {
  where: RemoveSiteWhereDTO;
}
