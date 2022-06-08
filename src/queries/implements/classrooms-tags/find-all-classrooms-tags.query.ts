import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';
import {
  FindAllClassroomsTagsDTO,
  WhereDataFindAllClassroomsTagsDTO,
  OrderByDataFindAllClassroomsTagsDTO
} from '@/dtos/classrooms-tags/find-all-classrooms-tags.dto';

export class FindAllClassroomsTagsQuery
  implements IQuery, FindAllClassroomsTagsDTO
{
  where?: IWhere<WhereDataFindAllClassroomsTagsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllClassroomsTagsDTO;

  constructor(data: FindAllClassroomsTagsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
