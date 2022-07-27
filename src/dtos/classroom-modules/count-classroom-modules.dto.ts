import { IBaseCountDTO, IWhereData } from '@stokei/nestjs';

export interface CountClassroomModulesWhereDTO {
  ids?: string[];
  app?: IWhereData;
  classroom?: IWhereData;
  module?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountClassroomModulesWhereDTO =
  keyof CountClassroomModulesWhereDTO;

export type CountClassroomModulesDTO =
  IBaseCountDTO<CountClassroomModulesWhereDTO>;
