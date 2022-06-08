import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';
import {
  FindAllTagsDTO,
  WhereDataFindAllTagsDTO,
  OrderByDataFindAllTagsDTO
} from '@/dtos/tags/find-all-tags.dto';

export class FindAllTagsQuery implements IQuery, FindAllTagsDTO {
  where?: IWhere<WhereDataFindAllTagsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllTagsDTO;

  constructor(data: FindAllTagsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
