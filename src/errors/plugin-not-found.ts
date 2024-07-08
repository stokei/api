import { NotFoundException } from '@nestjs/common';

export class PluginNotFoundException extends NotFoundException {
  constructor() {
    super('pluginNotFound');
  }
}
