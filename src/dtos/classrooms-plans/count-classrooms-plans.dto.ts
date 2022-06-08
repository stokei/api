import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountClassroomsPlansWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountClassroomsPlansWhereDTO =
  keyof CountClassroomsPlansWhereDTO;

export type CountClassroomsPlansDTO =
  IBaseCountDTO<CountClassroomsPlansWhereDTO>;
