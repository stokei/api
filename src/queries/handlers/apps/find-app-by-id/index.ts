import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { AppModel } from '@/models/app.model';
import { FindAppByIdQuery } from '@/queries/implements/apps/find-app-by-id.query';
import { FindAppByIdRepository } from '@/repositories/apps/find-app-by-id';

@QueryHandler(FindAppByIdQuery)
export class FindAppByIdQueryHandler
  implements IQueryHandler<FindAppByIdQuery>
{
  constructor(private readonly findAppByIdRepository: FindAppByIdRepository) {}

  async execute(query: FindAppByIdQuery): Promise<AppModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const app = await this.findAppByIdRepository.execute(id);
    if (!app) {
      throw new AppNotFoundException();
    }
    return app;
  }
}
