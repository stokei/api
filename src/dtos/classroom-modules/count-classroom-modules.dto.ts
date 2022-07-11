import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountClassroomModulesWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountClassroomModulesWhereDTO =
  keyof CountClassroomModulesWhereDTO;

export type CountClassroomModulesDTO =
  IBaseCountDTO<CountClassroomModulesWhereDTO>;
