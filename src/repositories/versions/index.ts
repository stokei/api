import { CountVersionsRepository } from './count-versions';
import { CreateVersionRepository } from './create-version';
import { FindAllVersionsRepository } from './find-all-versions';
import { FindVersionByIdRepository } from './find-version-by-id';
import { RemoveVersionRepository } from './remove-version';
import { UpdateVersionRepository } from './update-version';

export const VersionsRepositories = [
  CountVersionsRepository,
  CreateVersionRepository,
  FindVersionByIdRepository,
  FindAllVersionsRepository,
  RemoveVersionRepository,
  UpdateVersionRepository
];
