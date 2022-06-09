import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllColorsDTO,
  OrderByDataFindAllColorsDTO,
  WhereDataFindAllColorsDTO
} from '@/dtos/colors/find-all-colors.dto';

export class FindAllColorsQuery implements IQuery, FindAllColorsDTO {
  where?: IWhere<WhereDataFindAllColorsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllColorsDTO;

  constructor(data: FindAllColorsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
