import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';
import {
  FindAllActivitiesDTO,
  WhereDataFindAllActivitiesDTO,
  OrderByDataFindAllActivitiesDTO
} from '@/dtos/activities/find-all-activities.dto';

export class FindAllActivitiesQuery implements IQuery, FindAllActivitiesDTO {
  where?: IWhere<WhereDataFindAllActivitiesDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllActivitiesDTO;

  constructor(data: FindAllActivitiesDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
