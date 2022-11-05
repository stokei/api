export interface ExistsAppInstructorsWhereDTO {
  app?: string;
  instructor?: string;
}

export interface ExistsAppInstructorsDTO {
  where: ExistsAppInstructorsWhereDTO;
}
