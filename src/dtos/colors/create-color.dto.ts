import { ColorType } from '@/enums/color-type.enum';
import { ThemeMode } from '@/enums/theme-mode.enum';

export interface CreateColorDTO {
  parent: string;
  themeMode: ThemeMode;
  type: ColorType;
  color: string;
  app: string;
  createdBy: string;
}
