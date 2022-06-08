import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';
import {
  FindAllSitesDarkColorsDTO,
  WhereDataFindAllSitesDarkColorsDTO,
  OrderByDataFindAllSitesDarkColorsDTO
} from '@/dtos/sites-dark-colors/find-all-sites-dark-colors.dto';

export class FindAllSitesDarkColorsQuery
  implements IQuery, FindAllSitesDarkColorsDTO
{
  where?: IWhere<WhereDataFindAllSitesDarkColorsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllSitesDarkColorsDTO;

  constructor(data: FindAllSitesDarkColorsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
