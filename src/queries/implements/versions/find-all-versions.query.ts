import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';
import {
  FindAllVersionsDTO,
  WhereDataFindAllVersionsDTO,
  OrderByDataFindAllVersionsDTO
} from '@/dtos/versions/find-all-versions.dto';

export class FindAllVersionsQuery implements IQuery, FindAllVersionsDTO {
  where?: IWhere<WhereDataFindAllVersionsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllVersionsDTO;

  constructor(data: FindAllVersionsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
