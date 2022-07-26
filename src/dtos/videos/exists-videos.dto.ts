export interface ExistsVideosWhereDTO {
  slug?: string;
  parent?: string;
  app?: string;
}

export interface ExistsVideosDTO {
  where: ExistsVideosWhereDTO;
}
