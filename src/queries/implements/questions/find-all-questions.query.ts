import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllQuestionsDTO,
  OrderByDataFindAllQuestionsDTO,
  WhereDataFindAllQuestionsDTO
} from '@/dtos/questions/find-all-questions.dto';

export class FindAllQuestionsQuery implements IQuery, FindAllQuestionsDTO {
  where?: IWhere<WhereDataFindAllQuestionsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllQuestionsDTO;

  constructor(data: FindAllQuestionsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
