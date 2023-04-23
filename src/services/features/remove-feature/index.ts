import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveFeatureCommand } from '@/commands/implements/features/remove-feature.command';
import { RemoveFeatureDTO } from '@/dtos/features/remove-feature.dto';
import { FeatureModel } from '@/models/feature.model';

@Injectable()
export class RemoveFeatureService
  implements IBaseService<RemoveFeatureDTO, Promise<FeatureModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveFeatureDTO): Promise<FeatureModel> {
    return await this.commandBus.execute(new RemoveFeatureCommand(data));
  }
}
