import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountCheckoutsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountCheckoutsWhereDTO = keyof CountCheckoutsWhereDTO;

export type CountCheckoutsDTO = IBaseCountDTO<CountCheckoutsWhereDTO>;
