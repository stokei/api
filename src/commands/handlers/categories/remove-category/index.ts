import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemoveCategoryCommand } from '@/commands/implements/categories/remove-category.command';
import {
  CategoryNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindCategoryByIdRepository } from '@/repositories/categories/find-category-by-id';
import { RemoveCategoryRepository } from '@/repositories/categories/remove-category';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type RemoveCategoryCommandKeys = keyof RemoveCategoryCommand;

@CommandHandler(RemoveCategoryCommand)
export class RemoveCategoryCommandHandler
  implements ICommandHandler<RemoveCategoryCommand>
{
  constructor(
    private readonly findCategoryByIdRepository: FindCategoryByIdRepository,
    private readonly removeCategoryRepository: RemoveCategoryRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveCategoryCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const categoryId = splitServiceId(data.where?.categoryId)?.id;
    if (!categoryId) {
      throw new ParamNotFoundException('categoryId');
    }

    const category = await this.findCategoryByIdRepository.execute(categoryId);
    if (!category) {
      throw new CategoryNotFoundException();
    }

    const removed = await this.removeCategoryRepository.execute({
      where: {
        categoryId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const categoryModel = this.publisher.mergeObjectContext(category);
    categoryModel.removedCategory();
    categoryModel.commit();

    return category;
  }

  private clearData(command: RemoveCategoryCommand): RemoveCategoryCommand {
    return cleanObject({
      where: cleanObject({
        categoryId: cleanValue(command?.where?.categoryId)
      })
    });
  }
}
