import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountSubscriptionContractItemsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  product?: IWhereDataSearch;
  price?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountSubscriptionContractItemsWhereDTO =
  keyof CountSubscriptionContractItemsWhereDTO;

export type CountSubscriptionContractItemsDTO =
  IBaseCountDTO<CountSubscriptionContractItemsWhereDTO>;
