import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateHeroCommand } from '@/commands/implements/heros/update-hero.command';
import {
  DataNotFoundException,
  HeroNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindHeroByIdRepository } from '@/repositories/heros/find-hero-by-id';
import { UpdateHeroRepository } from '@/repositories/heros/update-hero';

@CommandHandler(UpdateHeroCommand)
export class UpdateHeroCommandHandler
  implements ICommandHandler<UpdateHeroCommand>
{
  constructor(
    private readonly findHeroByIdRepository: FindHeroByIdRepository,
    private readonly updateHeroRepository: UpdateHeroRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateHeroCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const heroId = splitServiceId(data.where?.hero)?.id;
    if (!heroId) {
      throw new ParamNotFoundException('heroId');
    }

    const hero = await this.findHeroByIdRepository.execute(heroId);
    if (!hero) {
      throw new HeroNotFoundException();
    }

    const updated = await this.updateHeroRepository.execute({
      ...data,
      where: {
        ...data.where,
        hero: heroId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const heroUpdated = await this.findHeroByIdRepository.execute(heroId);
    if (!heroUpdated) {
      throw new HeroNotFoundException();
    }
    const heroModel = this.publisher.mergeObjectContext(heroUpdated);
    heroModel.updatedHero({
      updatedBy: data.data.updatedBy
    });
    heroModel.commit();

    return heroUpdated;
  }

  private clearData(command: UpdateHeroCommand): UpdateHeroCommand {
    return cleanObject({
      where: cleanObject({
        app: cleanValue(command?.where?.app),
        hero: cleanValue(command?.where?.hero)
      }),
      data: cleanObject({
        title: cleanValue(command?.data?.title),
        type: cleanValue(command?.data?.type),
        titleHighlight: cleanValue(command?.data?.titleHighlight),
        subtitle: cleanValue(command?.data?.subtitle),
        image: cleanValue(command?.data?.image),
        backgroundImage: cleanValue(command?.data?.backgroundImage),
        video: cleanValue(command?.data?.video),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
