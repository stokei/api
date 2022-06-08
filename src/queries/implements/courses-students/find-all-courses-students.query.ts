import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';
import {
  FindAllCoursesStudentsDTO,
  WhereDataFindAllCoursesStudentsDTO,
  OrderByDataFindAllCoursesStudentsDTO
} from '@/dtos/courses-students/find-all-courses-students.dto';

export class FindAllCoursesStudentsQuery
  implements IQuery, FindAllCoursesStudentsDTO
{
  where?: IWhere<WhereDataFindAllCoursesStudentsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllCoursesStudentsDTO;

  constructor(data: FindAllCoursesStudentsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
