import { IBaseCountDTO, IWhereData } from '@stokei/nestjs';

export interface CountCartsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountCartsWhereDTO = keyof CountCartsWhereDTO;

export type CountCartsDTO = IBaseCountDTO<CountCartsWhereDTO>;
