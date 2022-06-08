import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountSitesLightColorsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountSitesLightColorsWhereDTO =
  keyof CountSitesLightColorsWhereDTO;

export type CountSitesLightColorsDTO =
  IBaseCountDTO<CountSitesLightColorsWhereDTO>;
