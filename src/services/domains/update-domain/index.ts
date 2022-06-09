import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateDomainCommand } from '@/commands/implements/domains/update-domain.command';
import { UpdateDomainDTO } from '@/dtos/domains/update-domain.dto';
import { DomainModel } from '@/models/domain.model';

@Injectable()
export class UpdateDomainService
  implements IBaseService<UpdateDomainDTO, Promise<DomainModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateDomainDTO): Promise<DomainModel> {
    return await this.commandBus.execute(new UpdateDomainCommand(data));
  }
}
