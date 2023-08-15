import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountOrdersWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  name?: IWhereDataSearch;
  description?: IWhereDataSearch;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountOrdersWhereDTO = keyof CountOrdersWhereDTO;

export type CountOrdersDTO = IBaseCountDTO<CountOrdersWhereDTO>;
