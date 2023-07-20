import { CreateMaterialService } from './create-material';
import { FindAllMaterialsService } from './find-all-materials';
import { FindMaterialByIdService } from './find-material-by-id';
import { RemoveMaterialService } from './remove-material';
import { UpdateMaterialService } from './update-material';

export const MaterialServices = [
  CreateMaterialService,
  RemoveMaterialService,
  UpdateMaterialService,
  FindMaterialByIdService,
  FindAllMaterialsService
];
