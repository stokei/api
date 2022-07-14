import { IBaseFindManyDTO, IOrderBy, IWhereData } from '@stokei/nestjs';

import { ColorType } from '@/enums/color-type.enum';
import { ThemeMode } from '@/enums/theme-mode.enum';

export interface WhereDataFindAllColorsDTO {
  ids?: string[];
  parent?: IWhereData;
  themeMode?: IWhereData<ThemeMode>;
  type?: IWhereData<ColorType>;
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
