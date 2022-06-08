import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountSitesWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountSitesWhereDTO = keyof CountSitesWhereDTO;

export type CountSitesDTO = IBaseCountDTO<CountSitesWhereDTO>;
