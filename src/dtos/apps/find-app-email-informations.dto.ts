import { ColorType } from '@/enums/color-type.enum';
import { AppModel } from '@/models/app.model';

export type FindAppEmailInformationsColors = Partial<Record<ColorType, string>>;

export interface FindAppEmailInformationsDTO {
  app: string;
}
export interface FindAppEmailInformationsResponse {
  app: AppModel;
  baseAppURL: string;
  logoURL: string;
  colors: FindAppEmailInformationsColors;
}
