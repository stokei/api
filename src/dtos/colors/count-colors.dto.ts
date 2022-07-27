import { IBaseCountDTO, IWhereData } from '@stokei/nestjs';

import { ColorType } from '@/enums/color-type.enum';
import { ThemeMode } from '@/enums/theme-mode.enum';

export interface CountColorsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereData;
  themeMode?: ThemeMode;
  type?: ColorType;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountColorsWhereDTO = keyof CountColorsWhereDTO;

export type CountColorsDTO = IBaseCountDTO<CountColorsWhereDTO>;
