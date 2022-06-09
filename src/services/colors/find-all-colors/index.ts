import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllColorsDTO } from '@/dtos/colors/find-all-colors.dto';
import { ColorModel } from '@/models/color.model';
import { FindAllColorsQuery } from '@/queries/implements/colors/find-all-colors.query';

@Injectable()
export class FindAllColorsService
  implements
    IBaseService<FindAllColorsDTO, Promise<IPaginatedType<ColorModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: FindAllColorsDTO): Promise<IPaginatedType<ColorModel>> {
    return await this.queryBus.execute(new FindAllColorsQuery(data));
  }
}
