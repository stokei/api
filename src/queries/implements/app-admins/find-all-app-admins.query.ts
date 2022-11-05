import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllAppAdminsDTO,
  OrderByDataFindAllAppAdminsDTO,
  WhereDataFindAllAppAdminsDTO
} from '@/dtos/app-admins/find-all-app-admins.dto';

export class FindAllAppAdminsQuery implements IQuery, FindAllAppAdminsDTO {
  where?: IWhere<WhereDataFindAllAppAdminsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllAppAdminsDTO;

  constructor(data: FindAllAppAdminsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
