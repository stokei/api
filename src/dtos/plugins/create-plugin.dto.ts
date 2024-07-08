import { PluginType } from '@/enums/plugin-type.enum';

export interface CreatePluginDTO {
  app: string;
  parent: string;
  publicKey: string;
  privateKey: string;
  type: PluginType;
  createdBy: string;
}
