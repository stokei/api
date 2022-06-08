import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountClassroomsAdminsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountClassroomsAdminsWhereDTO =
  keyof CountClassroomsAdminsWhereDTO;

export type CountClassroomsAdminsDTO =
  IBaseCountDTO<CountClassroomsAdminsWhereDTO>;
