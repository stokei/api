import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllVideosMaterialsDTO,
  OrderByDataFindAllVideosMaterialsDTO,
  WhereDataFindAllVideosMaterialsDTO
} from '@/dtos/videos-materials/find-all-videos-materials.dto';

export class FindAllVideosMaterialsQuery
  implements IQuery, FindAllVideosMaterialsDTO
{
  where?: IWhere<WhereDataFindAllVideosMaterialsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllVideosMaterialsDTO;

  constructor(data: FindAllVideosMaterialsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
