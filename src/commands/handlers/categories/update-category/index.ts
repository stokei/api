import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCategoryCommand } from '@/commands/implements/categories/update-category.command';
import {
  CategoryNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindCategoryByIdRepository } from '@/repositories/categories/find-category-by-id';
import { UpdateCategoryRepository } from '@/repositories/categories/update-category';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type UpdateCategoryCommandKeys = keyof UpdateCategoryCommand;

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryCommandHandler
  implements ICommandHandler<UpdateCategoryCommand>
{
  constructor(
    private readonly findCategoryByIdRepository: FindCategoryByIdRepository,
    private readonly updateCategoryRepository: UpdateCategoryRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateCategoryCommand) {
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

    const updated = await this.updateCategoryRepository.execute({
      ...data,
      where: {
        ...data.where,
        categoryId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const categoryUpdated = await this.findCategoryByIdRepository.execute(
      categoryId
    );
    if (!categoryUpdated) {
      throw new CategoryNotFoundException();
    }
    const categoryModel = this.publisher.mergeObjectContext(categoryUpdated);
    categoryModel.updatedCategory();
    categoryModel.commit();

    return categoryUpdated;
  }

  private clearData(command: UpdateCategoryCommand): UpdateCategoryCommand {
    return cleanObject({
      where: cleanObject({
        categoryId: cleanValue(command?.where?.categoryId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
