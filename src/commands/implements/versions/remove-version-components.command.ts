import { ICommand } from '@nestjs/cqrs';

import { RemoveVersionComponentsDTO } from '@/dtos/versions/remove-version-components.dto';
import { VersionModel } from '@/models/version.model';

export class RemoveVersionComponentsCommand
  implements ICommand, RemoveVersionComponentsDTO
{
  version: VersionModel;
  app: string;
  removedBy: string;

  constructor(data: RemoveVersionComponentsDTO) {
    this.version = data.version;
    this.app = data.app;
    this.removedBy = data.removedBy;
  }
}
