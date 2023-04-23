import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateFeatureCommand } from '@/commands/implements/features/update-feature.command';
import { UpdateFeatureDTO } from '@/dtos/features/update-feature.dto';
import { FeatureModel } from '@/models/feature.model';

@Injectable()
export class UpdateFeatureService
  implements IBaseService<UpdateFeatureDTO, Promise<FeatureModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateFeatureDTO): Promise<FeatureModel> {
    return await this.commandBus.execute(new UpdateFeatureCommand(data));
  }
}
