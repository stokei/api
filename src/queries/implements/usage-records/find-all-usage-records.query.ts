import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllUsageRecordsDTO,
  OrderByDataFindAllUsageRecordsDTO,
  WhereDataFindAllUsageRecordsDTO
} from '@/dtos/usage-records/find-all-usage-records.dto';

export class FindAllUsageRecordsQuery
  implements IQuery, FindAllUsageRecordsDTO
{
  where?: IWhere<WhereDataFindAllUsageRecordsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllUsageRecordsDTO;

  constructor(data: FindAllUsageRecordsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
