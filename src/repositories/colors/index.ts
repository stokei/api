import { CountColorsRepository } from './count-colors';
import { CreateColorRepository } from './create-color';
import { ExistsColorsRepository } from './exists-colors';
import { FindAllColorsRepository } from './find-all-colors';
import { FindColorByIdRepository } from './find-color-by-id';
import { RemoveColorRepository } from './remove-color';
import { UpdateColorRepository } from './update-color';

export const ColorsRepositories = [
  CountColorsRepository,
  CreateColorRepository,
  ExistsColorsRepository,
  FindColorByIdRepository,
  FindAllColorsRepository,
  RemoveColorRepository,
  UpdateColorRepository
];
