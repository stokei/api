import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountCatalogsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  title?: IWhereDataSearch;
  subtitle?: IWhereDataSearch;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountCatalogsWhereDTO = keyof CountCatalogsWhereDTO;

export type CountCatalogsDTO = IBaseCountDTO<CountCatalogsWhereDTO>;
