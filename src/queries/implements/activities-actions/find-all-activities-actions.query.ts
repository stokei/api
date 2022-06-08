import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';
import {
  FindAllActivitiesActionsDTO,
  WhereDataFindAllActivitiesActionsDTO,
  OrderByDataFindAllActivitiesActionsDTO
} from '@/dtos/activities-actions/find-all-activities-actions.dto';

export class FindAllActivitiesActionsQuery
  implements IQuery, FindAllActivitiesActionsDTO
{
  where?: IWhere<WhereDataFindAllActivitiesActionsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllActivitiesActionsDTO;

  constructor(data: FindAllActivitiesActionsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
