import { NotFoundException } from '@nestjs/common';

export class PluginsNotFoundException extends NotFoundException {
  constructor() {
    super('pluginsNotFound');
  }
}
