import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllPluginsService } from '@/services/plugins/find-all-plugins';

@Injectable({ scope: Scope.REQUEST })
export class PluginsLoader {
  constructor(private readonly pluginsService: FindAllPluginsService) {}

  readonly findByIds = new DataLoader(async (pluginIds: string[]) => {
    const plugins = await this.pluginsService.execute({
      where: {
        AND: {
          ids: pluginIds
        }
      }
    });
    const pluginsMap = new Map(
      plugins?.items?.map((plugin) => [plugin.id, plugin])
    );
    return pluginIds.map((pluginId) => pluginsMap.get(pluginId));
  });
}
