import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllModulesVideosDTO,
  OrderByDataFindAllModulesVideosDTO,
  WhereDataFindAllModulesVideosDTO
} from '@/dtos/modules-videos/find-all-modules-videos.dto';

export class FindAllModulesVideosQuery
  implements IQuery, FindAllModulesVideosDTO
{
  where?: IWhere<WhereDataFindAllModulesVideosDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllModulesVideosDTO;

  constructor(data: FindAllModulesVideosDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
