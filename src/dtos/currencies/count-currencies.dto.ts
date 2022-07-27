import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountCurrenciesWhereDTO {
  ids?: string[];
  app?: IWhereData;
  name?: IWhereDataSearch;
  symbol?: IWhereData;
  minorUnit?: IWhereData<number>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountCurrenciesWhereDTO = keyof CountCurrenciesWhereDTO;

export type CountCurrenciesDTO = IBaseCountDTO<CountCurrenciesWhereDTO>;
