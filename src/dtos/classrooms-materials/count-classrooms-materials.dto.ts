import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountClassroomsMaterialsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountClassroomsMaterialsWhereDTO =
  keyof CountClassroomsMaterialsWhereDTO;

export type CountClassroomsMaterialsDTO =
  IBaseCountDTO<CountClassroomsMaterialsWhereDTO>;
