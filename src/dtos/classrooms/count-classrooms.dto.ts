import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountClassroomsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountClassroomsWhereDTO = keyof CountClassroomsWhereDTO;

export type CountClassroomsDTO = IBaseCountDTO<CountClassroomsWhereDTO>;
