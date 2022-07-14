export interface ExistsClassroomInstructorsWhereDTO {
  classroom?: string;
  instructor?: string;
}

export interface ExistsClassroomInstructorsDTO {
  where: ExistsClassroomInstructorsWhereDTO;
}
