import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateHeroCommand } from '@/commands/implements/heros/update-hero.command';
import { UpdateHeroDTO } from '@/dtos/heros/update-hero.dto';
import { HeroModel } from '@/models/hero.model';

@Injectable()
export class UpdateHeroService
  implements IBaseService<UpdateHeroDTO, Promise<HeroModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateHeroDTO): Promise<HeroModel> {
    return await this.commandBus.execute(new UpdateHeroCommand(data));
  }
}
