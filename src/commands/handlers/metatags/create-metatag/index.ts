import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateMetatagCommand } from '@/commands/implements/metatags/create-metatag.command';
import {
  MetatagNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateMetatagRepository } from '@/repositories/metatags/create-metatag';
import { cleanObject, cleanValue } from '@stokei/nestjs';

type CreateMetatagCommandKeys = keyof CreateMetatagCommand;

@CommandHandler(CreateMetatagCommand)
export class CreateMetatagCommandHandler
  implements ICommandHandler<CreateMetatagCommand>
{
  constructor(
    private readonly createMetatagRepository: CreateMetatagRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateMetatagCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateMetatagCommandKeys>('parent');
    }

    const metatagCreated = await this.createMetatagRepository.execute(data);
    if (!metatagCreated) {
      throw new MetatagNotFoundException();
    }
    const metatagModel = this.publisher.mergeObjectContext(metatagCreated);
    metatagModel.createdMetatag();
    metatagModel.commit();

    return metatagCreated;
  }

  private clearData(command: CreateMetatagCommand): CreateMetatagCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
