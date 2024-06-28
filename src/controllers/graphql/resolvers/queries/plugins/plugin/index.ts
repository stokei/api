import { Args, Query, Resolver } from '@nestjs/graphql';

import { PluginsLoader } from '@/controllers/graphql/dataloaders/plugins.loader';
import { Plugin } from '@/controllers/graphql/types/plugin';
import { ParamNotFoundException, PluginNotFoundException } from '@/errors';

@Resolver(() => Plugin)
export class PluginResolver {
  constructor(private readonly pluginsLoader: PluginsLoader) {}

  @Query(() => Plugin)
  async plugin(@Args('id', { nullable: true }) id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const plugin = await this.pluginsLoader.findByIds.load(id);
    if (!plugin) {
      throw new PluginNotFoundException();
    }
    return plugin;
  }
}
