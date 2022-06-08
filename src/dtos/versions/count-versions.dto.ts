import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountVersionsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountVersionsWhereDTO = keyof CountVersionsWhereDTO;

export type CountVersionsDTO = IBaseCountDTO<CountVersionsWhereDTO>;
