import { FindAllPluginsQueryHandler } from './find-all-plugins';
import { FindPluginByIdQueryHandler } from './find-plugin-by-id';
import { FindPluginByTypeQueryHandler } from './find-plugin-by-type';

export const PluginQueriesHandlers = [
  FindPluginByIdQueryHandler,
  FindAllPluginsQueryHandler,
  FindPluginByTypeQueryHandler
];
