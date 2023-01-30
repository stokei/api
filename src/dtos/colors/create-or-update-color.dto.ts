import { ColorType } from '@/enums/color-type.enum';
import { ThemeMode } from '@/enums/theme-mode.enum';

export interface CreateOrUpdateColorDTO {
  parent: string;
  themeMode: ThemeMode;
  type: ColorType;
  color: string;
  app: string;
  createdBy: string;
}
