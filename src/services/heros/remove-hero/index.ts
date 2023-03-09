import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveHeroCommand } from '@/commands/implements/heros/remove-hero.command';
import { RemoveHeroDTO } from '@/dtos/heros/remove-hero.dto';
import { HeroModel } from '@/models/hero.model';

@Injectable()
export class RemoveHeroService
  implements IBaseService<RemoveHeroDTO, Promise<HeroModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveHeroDTO): Promise<HeroModel> {
    return await this.commandBus.execute(new RemoveHeroCommand(data));
  }
}
