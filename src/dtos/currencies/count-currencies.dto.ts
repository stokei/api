import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountCurrenciesWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountCurrenciesWhereDTO = keyof CountCurrenciesWhereDTO;

export type CountCurrenciesDTO = IBaseCountDTO<CountCurrenciesWhereDTO>;
