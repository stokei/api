import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllSitesLightColorsDTO,
  OrderByDataFindAllSitesLightColorsDTO,
  WhereDataFindAllSitesLightColorsDTO
} from '@/dtos/sites-light-colors/find-all-sites-light-colors.dto';

export class FindAllSitesLightColorsQuery
  implements IQuery, FindAllSitesLightColorsDTO
{
  where?: IWhere<WhereDataFindAllSitesLightColorsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllSitesLightColorsDTO;

  constructor(data: FindAllSitesLightColorsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
