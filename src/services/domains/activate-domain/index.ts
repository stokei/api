import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ActivateDomainCommand } from '@/commands/implements/domains/activate-domain.command';
import { ActivateDomainDTO } from '@/dtos/domains/activate-domain.dto';
import { DomainModel } from '@/models/domain.model';

@Injectable()
export class ActivateDomainService
  implements IBaseService<ActivateDomainDTO, Promise<DomainModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: ActivateDomainDTO): Promise<DomainModel> {
    return await this.commandBus.execute(new ActivateDomainCommand(data));
  }
}
