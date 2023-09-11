import { CreateVersionService } from './create-version';
import { FindAllVersionsService } from './find-all-versions';
import { FindVersionByIdService } from './find-version-by-id';
import { RemoveVersionService } from './remove-version';
import { UpdateVersionService } from './update-version';

export const VersionServices = [
  CreateVersionService,
  RemoveVersionService,
  UpdateVersionService,
  FindVersionByIdService,
  FindAllVersionsService
];
