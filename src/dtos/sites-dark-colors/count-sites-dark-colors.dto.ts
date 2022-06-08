import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountSitesDarkColorsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountSitesDarkColorsWhereDTO =
  keyof CountSitesDarkColorsWhereDTO;

export type CountSitesDarkColorsDTO =
  IBaseCountDTO<CountSitesDarkColorsWhereDTO>;
