import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';
import {
  FindAllKeywordsDTO,
  WhereDataFindAllKeywordsDTO,
  OrderByDataFindAllKeywordsDTO
} from '@/dtos/keywords/find-all-keywords.dto';

export class FindAllKeywordsQuery implements IQuery, FindAllKeywordsDTO {
  where?: IWhere<WhereDataFindAllKeywordsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllKeywordsDTO;

  constructor(data: FindAllKeywordsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
