import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { PublishVersionCommand } from '@/commands/implements/versions/publish-version.command';
import { PublishVersionDTO } from '@/dtos/versions/publish-version.dto';
import { VersionModel } from '@/models/version.model';

@Injectable()
export class PublishVersionService
  implements IBaseService<PublishVersionDTO, Promise<VersionModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: PublishVersionDTO): Promise<VersionModel> {
    return await this.commandBus.execute(new PublishVersionCommand(data));
  }
}
