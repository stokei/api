import { ICommand } from '@nestjs/cqrs';

import { CreatePluginDTO } from '@/dtos/plugins/create-plugin.dto';
import { PluginType } from '@/enums/plugin-type.enum';

export class CreatePluginCommand implements ICommand, CreatePluginDTO {
  app: string;
  parent: string;
  publicKey: string;
  privateKey: string;
  type: PluginType;
  createdBy: string;

  constructor(data: CreatePluginDTO) {
    this.app = data.app;
    this.parent = data.parent;
    this.publicKey = data.publicKey;
    this.privateKey = data.privateKey;
    this.type = data.type;
    this.createdBy = data.createdBy;
  }
}
