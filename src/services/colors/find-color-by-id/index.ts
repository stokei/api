import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';
import { ColorModel } from '@/models/color.model';
import { FindColorByIdQuery } from '@/queries/implements/colors/find-color-by-id.query';

@Injectable()
export class FindColorByIdService
  implements IBaseService<string, Promise<ColorModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<ColorModel> {
    return await this.queryBus.execute(new FindColorByIdQuery(data));
  }
}
