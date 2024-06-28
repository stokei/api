import { PluginCreatedByResolver } from './created-by';
import { PluginReferenceResolver } from './reference';
import { PluginUpdatedByResolver } from './updated-by';

export const PluginsFieldsResolvers = [
  PluginReferenceResolver,
  PluginCreatedByResolver,
  PluginUpdatedByResolver
];
