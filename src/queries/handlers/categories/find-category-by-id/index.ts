import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  CategoryNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CategoryModel } from '@/models/category.model';
import { FindCategoryByIdRepository } from '@/repositories/categories/find-category-by-id';
import { FindCategoryByIdQuery } from '@/queries/implements/categories/find-category-by-id.query';

@QueryHandler(FindCategoryByIdQuery)
export class FindCategoryByIdQueryHandler
  implements IQueryHandler<FindCategoryByIdQuery>
{
  constructor(
    private readonly findCategoryByIdRepository: FindCategoryByIdRepository
  ) {}

  async execute(query: FindCategoryByIdQuery): Promise<CategoryModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const category = await this.findCategoryByIdRepository.execute(id);
    if (!category) {
      throw new CategoryNotFoundException();
    }
    return category;
  }
}
