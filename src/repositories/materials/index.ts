import { CountMaterialsRepository } from './count-materials';
import { CreateMaterialRepository } from './create-material';
import { FindAllMaterialsRepository } from './find-all-materials';
import { FindMaterialByIdRepository } from './find-material-by-id';
import { RemoveMaterialRepository } from './remove-material';
import { UpdateMaterialRepository } from './update-material';

export const MaterialsRepositories = [
  CountMaterialsRepository,
  CreateMaterialRepository,
  FindMaterialByIdRepository,
  FindAllMaterialsRepository,
  RemoveMaterialRepository,
  UpdateMaterialRepository
];
