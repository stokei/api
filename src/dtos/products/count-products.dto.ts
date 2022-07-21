import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountProductsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
  description?: IWhereDataSearch;
  project: IWhereData;
  checkoutVisible: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountProductsWhereDTO = keyof CountProductsWhereDTO;

export type CountProductsDTO = IBaseCountDTO<CountProductsWhereDTO>;
