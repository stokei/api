import { CountPluginsRepository } from './count-plugins';
import { CreatePluginRepository } from './create-plugin';
import { FindAllPluginsRepository } from './find-all-plugins';
import { FindPluginByIdRepository } from './find-plugin-by-id';
import { FindPluginByTypeRepository } from './find-plugin-by-type';
import { UpdatePluginRepository } from './update-plugin';

export const PluginsRepositories = [
  CountPluginsRepository,
  CreatePluginRepository,
  FindPluginByIdRepository,
  FindAllPluginsRepository,
  UpdatePluginRepository,
  FindPluginByTypeRepository
];
