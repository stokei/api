import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountClassroomInstructorsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountClassroomInstructorsWhereDTO =
  keyof CountClassroomInstructorsWhereDTO;

export type CountClassroomInstructorsDTO =
  IBaseCountDTO<CountClassroomInstructorsWhereDTO>;
