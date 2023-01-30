import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

import { ColorType } from '@/enums/color-type.enum';
import { ThemeMode } from '@/enums/theme-mode.enum';

export interface WhereDataFindAllColorsDTO {
  ids?: string[];
  app?: IWhereData;
  color?: IWhereData;
  parent?: IWhereDataSearch;
  themeMode?: ThemeMode;
  type?: ColorType;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllColorsDTO = keyof WhereDataFindAllColorsDTO;

export interface OrderByDataFindAllColorsDTO {
  themeMode?: IOrderBy;
  type?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllColorsDTO =
  keyof OrderByDataFindAllColorsDTO;

export type FindAllColorsDTO = IBaseFindManyDTO<
  WhereDataFindAllColorsDTO,
  OrderByDataFindAllColorsDTO
>;
