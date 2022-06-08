import { CreateAccessCommand } from '@/commands/implements/accesses/create-access.command';
import { CreateAccessDTO } from '@/dtos/accesses/create-access.dto';
import { AccessModel } from '@/models/access.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class CreateAccessService
  implements IBaseService<CreateAccessDTO, Promise<AccessModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateAccessDTO): Promise<AccessModel> {
    return await this.commandBus.execute(new CreateAccessCommand(data));
  }
}
