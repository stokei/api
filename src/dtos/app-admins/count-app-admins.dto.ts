import { IBaseCountDTO, IWhereData } from '@stokei/nestjs';

export interface CountAppAdminsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  admin?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountAppAdminsWhereDTO = keyof CountAppAdminsWhereDTO;

export type CountAppAdminsDTO = IBaseCountDTO<CountAppAdminsWhereDTO>;
