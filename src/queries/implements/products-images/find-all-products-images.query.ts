import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';
import {
  FindAllProductsImagesDTO,
  WhereDataFindAllProductsImagesDTO,
  OrderByDataFindAllProductsImagesDTO
} from '@/dtos/products-images/find-all-products-images.dto';

export class FindAllProductsImagesQuery
  implements IQuery, FindAllProductsImagesDTO
{
  where?: IWhere<WhereDataFindAllProductsImagesDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllProductsImagesDTO;

  constructor(data: FindAllProductsImagesDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
