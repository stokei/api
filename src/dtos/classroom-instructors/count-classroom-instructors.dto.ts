import { IBaseCountDTO, IWhereData } from '@stokei/nestjs';

export interface CountClassroomInstructorsWhereDTO {
  ids?: string[];
  classroom?: IWhereData;
  instructor?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountClassroomInstructorsWhereDTO =
  keyof CountClassroomInstructorsWhereDTO;

export type CountClassroomInstructorsDTO =
  IBaseCountDTO<CountClassroomInstructorsWhereDTO>;
