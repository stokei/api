import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RefreshAccessCommand } from '@/commands/implements/accesses/refresh-access.command';
import { RefreshAccessDTO } from '@/dtos/accesses/refresh-access.dto';
import { AccessModel } from '@/models/access.model';

@Injectable()
export class RefreshAccessService
  implements IBaseService<RefreshAccessDTO, Promise<AccessModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RefreshAccessDTO): Promise<AccessModel> {
    return await this.commandBus.execute(new RefreshAccessCommand(data));
  }
}
