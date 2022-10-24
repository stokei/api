import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateFeatureCommand } from '@/commands/implements/features/create-feature.command';
import { CreateFeatureDTO } from '@/dtos/features/create-feature.dto';
import { FeatureModel } from '@/models/feature.model';

@Injectable()
export class CreateFeatureService
  implements IBaseService<CreateFeatureDTO, Promise<FeatureModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateFeatureDTO): Promise<FeatureModel> {
    return await this.commandBus.execute(new CreateFeatureCommand(data));
  }
}
