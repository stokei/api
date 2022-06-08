import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';
import {
  FindAllImagesDTO,
  WhereDataFindAllImagesDTO,
  OrderByDataFindAllImagesDTO
} from '@/dtos/images/find-all-images.dto';

export class FindAllImagesQuery implements IQuery, FindAllImagesDTO {
  where?: IWhere<WhereDataFindAllImagesDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllImagesDTO;

  constructor(data: FindAllImagesDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
