import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountClassroomsEnrollmentsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountClassroomsEnrollmentsWhereDTO =
  keyof CountClassroomsEnrollmentsWhereDTO;

export type CountClassroomsEnrollmentsDTO =
  IBaseCountDTO<CountClassroomsEnrollmentsWhereDTO>;
