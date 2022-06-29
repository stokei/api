import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountClassroomsInstructorsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountClassroomsInstructorsWhereDTO =
  keyof CountClassroomsInstructorsWhereDTO;

export type CountClassroomsInstructorsDTO =
  IBaseCountDTO<CountClassroomsInstructorsWhereDTO>;
