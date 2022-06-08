import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountCheckoutsCurrenciesWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountCheckoutsCurrenciesWhereDTO =
  keyof CountCheckoutsCurrenciesWhereDTO;

export type CountCheckoutsCurrenciesDTO =
  IBaseCountDTO<CountCheckoutsCurrenciesWhereDTO>;
