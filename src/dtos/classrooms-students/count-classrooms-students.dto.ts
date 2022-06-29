import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountClassroomsStudentsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountClassroomsStudentsWhereDTO =
  keyof CountClassroomsStudentsWhereDTO;

export type CountClassroomsStudentsDTO =
  IBaseCountDTO<CountClassroomsStudentsWhereDTO>;
