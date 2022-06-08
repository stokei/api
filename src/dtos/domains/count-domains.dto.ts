import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountDomainsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountDomainsWhereDTO = keyof CountDomainsWhereDTO;

export type CountDomainsDTO = IBaseCountDTO<CountDomainsWhereDTO>;
