import { RemoveAccessCommand } from '@/commands/implements/accesses/remove-access.command';
import { RemoveAccessDTO } from '@/dtos/accesses/remove-access.dto';
import { AccessModel } from '@/models/access.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class RemoveAccessService
  implements IBaseService<RemoveAccessDTO, Promise<AccessModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveAccessDTO): Promise<AccessModel> {
    return await this.commandBus.execute(new RemoveAccessCommand(data));
  }
}
