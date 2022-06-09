import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateCategoryCommand } from '@/commands/implements/categories/create-category.command';
import {
  CategoryNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateCategoryRepository } from '@/repositories/categories/create-category';

type CreateCategoryCommandKeys = keyof CreateCategoryCommand;

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryCommandHandler
  implements ICommandHandler<CreateCategoryCommand>
{
  constructor(
    private readonly createCategoryRepository: CreateCategoryRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateCategoryCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateCategoryCommandKeys>('parent');
    }

    const categoryCreated = await this.createCategoryRepository.execute(data);
    if (!categoryCreated) {
      throw new CategoryNotFoundException();
    }
    const categoryModel = this.publisher.mergeObjectContext(categoryCreated);
    categoryModel.createdCategory();
    categoryModel.commit();

    return categoryCreated;
  }

  private clearData(command: CreateCategoryCommand): CreateCategoryCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
