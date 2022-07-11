import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllModuleVideosDTO,
  OrderByDataFindAllModuleVideosDTO,
  WhereDataFindAllModuleVideosDTO
} from '@/dtos/module-videos/find-all-module-videos.dto';

export class FindAllModuleVideosQuery
  implements IQuery, FindAllModuleVideosDTO
{
  where?: IWhere<WhereDataFindAllModuleVideosDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllModuleVideosDTO;

  constructor(data: FindAllModuleVideosDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
