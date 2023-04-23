import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

import { ColorType } from '@/enums/color-type.enum';
import { ThemeMode } from '@/enums/theme-mode.enum';

export interface CountColorsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  themeMode?: ThemeMode;
  type?: ColorType;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountColorsWhereDTO = keyof CountColorsWhereDTO;

export type CountColorsDTO = IBaseCountDTO<CountColorsWhereDTO>;
