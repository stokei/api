import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';
import {
  FindAllProjectsMembersDTO,
  WhereDataFindAllProjectsMembersDTO,
  OrderByDataFindAllProjectsMembersDTO
} from '@/dtos/projects-members/find-all-projects-members.dto';

export class FindAllProjectsMembersQuery
  implements IQuery, FindAllProjectsMembersDTO
{
  where?: IWhere<WhereDataFindAllProjectsMembersDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllProjectsMembersDTO;

  constructor(data: FindAllProjectsMembersDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
