import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllPluginsDTO,
  OrderByDataFindAllPluginsDTO,
  WhereDataFindAllPluginsDTO
} from '@/dtos/plugins/find-all-plugins.dto';

export class FindAllPluginsQuery implements IQuery, FindAllPluginsDTO {
  where?: IWhere<WhereDataFindAllPluginsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllPluginsDTO;

  constructor(data: FindAllPluginsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
