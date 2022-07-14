export interface ExistsClassroomsWhereDTO {
  parent?: string;
  hasAccessToAllModules?: boolean;
}

export interface ExistsClassroomsDTO {
  where: ExistsClassroomsWhereDTO;
}
