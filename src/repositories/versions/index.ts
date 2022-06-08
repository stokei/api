import { CountVersionsRepository } from './count-versions';
import { CreateVersionRepository } from './create-version';
import { ExistsVersionsRepository } from './exists-versions';
import { FindVersionByIdRepository } from './find-version-by-id';
import { FindAllVersionsRepository } from './find-all-versions';
import { RemoveVersionRepository } from './remove-version';
import { UpdateVersionRepository } from './update-version';

export const VersionsRepositories = [
  CountVersionsRepository,
  CreateVersionRepository,
  ExistsVersionsRepository,
  FindVersionByIdRepository,
  FindAllVersionsRepository,
  RemoveVersionRepository,
  UpdateVersionRepository
];
