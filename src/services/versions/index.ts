import { FindVersionByIdService } from './find-version-by-id';
import { FindAllVersionsService } from './find-all-versions';
import { CreateVersionService } from './create-version';
import { RemoveVersionService } from './remove-version';
import { UpdateVersionService } from './update-version';

export const VersionServices = [
  CreateVersionService,
  RemoveVersionService,
  UpdateVersionService,
  FindVersionByIdService,
  FindAllVersionsService
];
