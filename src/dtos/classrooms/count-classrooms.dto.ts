import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountClassroomsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountClassroomsWhereDTO = keyof CountClassroomsWhereDTO;

export type CountClassroomsDTO = IBaseCountDTO<CountClassroomsWhereDTO>;
