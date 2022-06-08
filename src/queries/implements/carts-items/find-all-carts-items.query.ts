import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';
import {
  FindAllCartsItemsDTO,
  WhereDataFindAllCartsItemsDTO,
  OrderByDataFindAllCartsItemsDTO
} from '@/dtos/carts-items/find-all-carts-items.dto';

export class FindAllCartsItemsQuery implements IQuery, FindAllCartsItemsDTO {
  where?: IWhere<WhereDataFindAllCartsItemsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllCartsItemsDTO;

  constructor(data: FindAllCartsItemsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
