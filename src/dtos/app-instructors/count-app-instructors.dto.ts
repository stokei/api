import { IBaseCountDTO, IWhereData } from '@stokei/nestjs';

export interface CountAppInstructorsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  instructor?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountAppInstructorsWhereDTO =
  keyof CountAppInstructorsWhereDTO;

export type CountAppInstructorsDTO = IBaseCountDTO<CountAppInstructorsWhereDTO>;
