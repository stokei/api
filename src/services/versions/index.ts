import { CreateVersionService } from './create-version';
import { FindAllVersionsService } from './find-all-versions';
import { FindVersionByIdService } from './find-version-by-id';
import { FindVersionWithComponentsService } from './find-version-with-components';
import { RemoveVersionService } from './remove-version';
import { UpdateVersionService } from './update-version';

export const VersionServices = [
  CreateVersionService,
  RemoveVersionService,
  UpdateVersionService,
  FindVersionByIdService,
  FindAllVersionsService,
  FindVersionWithComponentsService
];
