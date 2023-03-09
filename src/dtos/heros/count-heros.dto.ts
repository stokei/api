import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountHerosWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountHerosWhereDTO = keyof CountHerosWhereDTO;

export type CountHerosDTO = IBaseCountDTO<CountHerosWhereDTO>;
