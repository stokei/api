import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';
import {
  FindAllClassroomsMaterialsDTO,
  WhereDataFindAllClassroomsMaterialsDTO,
  OrderByDataFindAllClassroomsMaterialsDTO
} from '@/dtos/classrooms-materials/find-all-classrooms-materials.dto';

export class FindAllClassroomsMaterialsQuery
  implements IQuery, FindAllClassroomsMaterialsDTO
{
  where?: IWhere<WhereDataFindAllClassroomsMaterialsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllClassroomsMaterialsDTO;

  constructor(data: FindAllClassroomsMaterialsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
