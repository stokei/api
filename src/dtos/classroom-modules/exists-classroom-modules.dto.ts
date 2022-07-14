export interface ExistsClassroomModulesWhereDTO {
  classroom?: string;
  module?: string;
}

export interface ExistsClassroomModulesDTO {
  where: ExistsClassroomModulesWhereDTO;
}
