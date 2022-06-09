import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllCardsDTO,
  OrderByDataFindAllCardsDTO,
  WhereDataFindAllCardsDTO
} from '@/dtos/cards/find-all-cards.dto';

export class FindAllCardsQuery implements IQuery, FindAllCardsDTO {
  where?: IWhere<WhereDataFindAllCardsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllCardsDTO;

  constructor(data: FindAllCardsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
