import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountPaymentMethodsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  cardBrand?: IWhereData<string>;
  stripePaymentMethod?: IWhereData<string>;
  active?: IWhereData<boolean>;
}
export type IKeysCountPaymentMethodsWhereDTO =
  keyof CountPaymentMethodsWhereDTO;

export type CountPaymentMethodsDTO = IBaseCountDTO<CountPaymentMethodsWhereDTO>;
