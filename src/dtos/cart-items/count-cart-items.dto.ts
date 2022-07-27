import { IBaseCountDTO, IWhereData } from '@stokei/nestjs';

export interface CountCartItemsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereData;
  price?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountCartItemsWhereDTO = keyof CountCartItemsWhereDTO;

export type CountCartItemsDTO = IBaseCountDTO<CountCartItemsWhereDTO>;
