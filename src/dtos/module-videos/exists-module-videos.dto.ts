export interface ExistsModuleVideosWhereDTO {
  module?: string;
  video?: string;
}

export interface ExistsModuleVideosDTO {
  where: ExistsModuleVideosWhereDTO;
}
