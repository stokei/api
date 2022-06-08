import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountOrdersWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountOrdersWhereDTO = keyof CountOrdersWhereDTO;

export type CountOrdersDTO = IBaseCountDTO<CountOrdersWhereDTO>;
