import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountClassroomsModulesWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountClassroomsModulesWhereDTO =
  keyof CountClassroomsModulesWhereDTO;

export type CountClassroomsModulesDTO =
  IBaseCountDTO<CountClassroomsModulesWhereDTO>;
