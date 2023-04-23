import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveHeroCommand } from '@/commands/implements/heros/remove-hero.command';
import {
  DataNotFoundException,
  HeroNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindHeroByIdRepository } from '@/repositories/heros/find-hero-by-id';
import { RemoveHeroRepository } from '@/repositories/heros/remove-hero';

@CommandHandler(RemoveHeroCommand)
export class RemoveHeroCommandHandler
  implements ICommandHandler<RemoveHeroCommand>
{
  constructor(
    private readonly findHeroByIdRepository: FindHeroByIdRepository,
    private readonly removeHeroRepository: RemoveHeroRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveHeroCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const heroId = splitServiceId(data.where?.hero)?.id;
    if (!heroId) {
      throw new ParamNotFoundException('heroId');
    }

    const hero = await this.findHeroByIdRepository.execute(heroId);
    if (!hero) {
      throw new HeroNotFoundException();
    }

    const removed = await this.removeHeroRepository.execute({
      where: {
        ...data.where,
        hero: heroId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const heroModel = this.publisher.mergeObjectContext(hero);
    heroModel.removedHero({
      removedBy: data.where.removedBy
    });
    heroModel.commit();

    return hero;
  }

  private clearData(command: RemoveHeroCommand): RemoveHeroCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        hero: cleanValue(command?.where?.hero)
      })
    });
  }
}
