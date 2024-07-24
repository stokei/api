import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountProductComboItemsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch<string | string[]>;
  product?: IWhereData<string | string[]>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountProductComboItemsWhereDTO =
  keyof CountProductComboItemsWhereDTO;

export type CountProductComboItemsDTO =
  IBaseCountDTO<CountProductComboItemsWhereDTO>;
