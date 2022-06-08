import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';
import {
  FindAllPagesDTO,
  WhereDataFindAllPagesDTO,
  OrderByDataFindAllPagesDTO
} from '@/dtos/pages/find-all-pages.dto';

export class FindAllPagesQuery implements IQuery, FindAllPagesDTO {
  where?: IWhere<WhereDataFindAllPagesDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllPagesDTO;

  constructor(data: FindAllPagesDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
