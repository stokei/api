import { FindColorByIdService } from './find-color-by-id';
import { FindAllColorsService } from './find-all-colors';
import { CreateColorService } from './create-color';
import { RemoveColorService } from './remove-color';
import { UpdateColorService } from './update-color';

export const ColorServices = [
  CreateColorService,
  RemoveColorService,
  UpdateColorService,
  FindColorByIdService,
  FindAllColorsService
];
