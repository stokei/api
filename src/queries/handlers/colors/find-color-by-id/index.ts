import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  ColorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { ColorModel } from '@/models/color.model';
import { FindColorByIdQuery } from '@/queries/implements/colors/find-color-by-id.query';
import { FindColorByIdRepository } from '@/repositories/colors/find-color-by-id';

@QueryHandler(FindColorByIdQuery)
export class FindColorByIdQueryHandler
  implements IQueryHandler<FindColorByIdQuery>
{
  constructor(
    private readonly findColorByIdRepository: FindColorByIdRepository
  ) {}

  async execute(query: FindColorByIdQuery): Promise<ColorModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const color = await this.findColorByIdRepository.execute(id);
    if (!color) {
      throw new ColorNotFoundException();
    }
    return color;
  }
}
