import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountRatingsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountRatingsWhereDTO = keyof CountRatingsWhereDTO;

export type CountRatingsDTO = IBaseCountDTO<CountRatingsWhereDTO>;
