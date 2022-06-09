import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateAccessCommand } from '@/commands/implements/accesses/update-access.command';
import { UpdateAccessDTO } from '@/dtos/accesses/update-access.dto';
import { AccessModel } from '@/models/access.model';

@Injectable()
export class UpdateAccessService
  implements IBaseService<UpdateAccessDTO, Promise<AccessModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateAccessDTO): Promise<AccessModel> {
    return await this.commandBus.execute(new UpdateAccessCommand(data));
  }
}
