import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreatePageCommand } from '@/commands/implements/pages/create-page.command';
import {
  PageNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreatePageRepository } from '@/repositories/pages/create-page';
import { cleanObject, cleanValue } from '@stokei/nestjs';

type CreatePageCommandKeys = keyof CreatePageCommand;

@CommandHandler(CreatePageCommand)
export class CreatePageCommandHandler
  implements ICommandHandler<CreatePageCommand>
{
  constructor(
    private readonly createPageRepository: CreatePageRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreatePageCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreatePageCommandKeys>('parent');
    }

    const pageCreated = await this.createPageRepository.execute(data);
    if (!pageCreated) {
      throw new PageNotFoundException();
    }
    const pageModel = this.publisher.mergeObjectContext(pageCreated);
    pageModel.createdPage();
    pageModel.commit();

    return pageCreated;
  }

  private clearData(command: CreatePageCommand): CreatePageCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
