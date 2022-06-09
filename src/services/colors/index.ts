import { CreateColorService } from './create-color';
import { FindAllColorsService } from './find-all-colors';
import { FindColorByIdService } from './find-color-by-id';
import { RemoveColorService } from './remove-color';
import { UpdateColorService } from './update-color';

export const ColorServices = [
  CreateColorService,
  RemoveColorService,
  UpdateColorService,
  FindColorByIdService,
  FindAllColorsService
];
