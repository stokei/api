import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateHeroCommand } from '@/commands/implements/heros/create-hero.command';
import { CreateHeroDTO } from '@/dtos/heros/create-hero.dto';
import { HeroModel } from '@/models/hero.model';

@Injectable()
export class CreateHeroService
  implements IBaseService<CreateHeroDTO, Promise<HeroModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateHeroDTO): Promise<HeroModel> {
    return await this.commandBus.execute(new CreateHeroCommand(data));
  }
}
