import { CreateMaterialCommandHandler } from './create-material';
import { RemoveMaterialCommandHandler } from './remove-material';
import { UpdateMaterialCommandHandler } from './update-material';

export const MaterialCommandHandlers = [
  CreateMaterialCommandHandler,
  RemoveMaterialCommandHandler,
  UpdateMaterialCommandHandler
];
