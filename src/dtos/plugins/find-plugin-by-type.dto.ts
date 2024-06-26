import { PluginType } from '@/enums/plugin-type.enum';

export interface FindPluginByTypeDTO {
  app: string;
  parent: string;
  type: PluginType;
}
