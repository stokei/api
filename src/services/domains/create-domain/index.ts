import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateDomainCommand } from '@/commands/implements/domains/create-domain.command';
import { CreateDomainDTO } from '@/dtos/domains/create-domain.dto';
import { DomainModel } from '@/models/domain.model';

@Injectable()
export class CreateDomainService
  implements IBaseService<CreateDomainDTO, Promise<DomainModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateDomainDTO): Promise<DomainModel> {
    return await this.commandBus.execute(new CreateDomainCommand(data));
  }
}
