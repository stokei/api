import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateHeroCommand } from '@/commands/implements/heros/create-hero.command';
import {
  DataNotFoundException,
  HeroNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateHeroRepository } from '@/repositories/heros/create-hero';

type CreateHeroCommandKeys = keyof CreateHeroCommand;

@CommandHandler(CreateHeroCommand)
export class CreateHeroCommandHandler
  implements ICommandHandler<CreateHeroCommand>
{
  constructor(
    private readonly createHeroRepository: CreateHeroRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateHeroCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateHeroCommandKeys>('parent');
    }

    const heroCreated = await this.createHeroRepository.execute(data);
    if (!heroCreated) {
      throw new HeroNotFoundException();
    }
    const heroModel = this.publisher.mergeObjectContext(heroCreated);
    heroModel.createdHero({
      createdBy: data.createdBy
    });
    heroModel.commit();

    return heroCreated;
  }

  private clearData(command: CreateHeroCommand): CreateHeroCommand {
    return cleanObject({
      parent: cleanValue(command?.parent),
      app: cleanValue(command?.app),
      type: cleanValue(command?.type),
      title: cleanValue(command?.title),
      titleHighlight: cleanValue(command?.titleHighlight),
      subtitle: cleanValue(command?.subtitle),
      image: cleanValue(command?.image),
      backgroundImage: cleanValue(command?.backgroundImage),
      video: cleanValue(command?.video),
      createdBy: cleanValue(command?.createdBy)
    });
  }
}
