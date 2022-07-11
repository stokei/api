import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountClassroomStudentsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountClassroomStudentsWhereDTO =
  keyof CountClassroomStudentsWhereDTO;

export type CountClassroomStudentsDTO =
  IBaseCountDTO<CountClassroomStudentsWhereDTO>;
