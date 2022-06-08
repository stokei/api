import { RemoveDomainCommand } from '@/commands/implements/domains/remove-domain.command';
import { RemoveDomainDTO } from '@/dtos/domains/remove-domain.dto';
import { DomainModel } from '@/models/domain.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class RemoveDomainService
  implements IBaseService<RemoveDomainDTO, Promise<DomainModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveDomainDTO): Promise<DomainModel> {
    return await this.commandBus.execute(new RemoveDomainCommand(data));
  }
}
