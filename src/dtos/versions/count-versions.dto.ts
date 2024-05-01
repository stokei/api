import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountVersionsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  name?: IWhereDataSearch;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountVersionsWhereDTO = keyof CountVersionsWhereDTO;

export type CountVersionsDTO = IBaseCountDTO<CountVersionsWhereDTO>;
