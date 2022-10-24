import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllFeaturesDTO,
  OrderByDataFindAllFeaturesDTO,
  WhereDataFindAllFeaturesDTO
} from '@/dtos/features/find-all-features.dto';

export class FindAllFeaturesQuery implements IQuery, FindAllFeaturesDTO {
  where?: IWhere<WhereDataFindAllFeaturesDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllFeaturesDTO;

  constructor(data: FindAllFeaturesDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
