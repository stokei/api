import { CreatePluginService } from './create-plugin';
import { FindAllPluginsService } from './find-all-plugins';
import { FindPluginByIdService } from './find-plugin-by-id';
import { FindPluginByTypeService } from './find-plugin-by-type';
import { UpdatePluginService } from './update-plugin';

export const PluginServices = [
  UpdatePluginService,
  CreatePluginService,
  FindPluginByIdService,
  FindAllPluginsService,
  FindPluginByTypeService
];
