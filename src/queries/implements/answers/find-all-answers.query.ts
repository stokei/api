import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';
import {
  FindAllAnswersDTO,
  WhereDataFindAllAnswersDTO,
  OrderByDataFindAllAnswersDTO
} from '@/dtos/answers/find-all-answers.dto';

export class FindAllAnswersQuery implements IQuery, FindAllAnswersDTO {
  where?: IWhere<WhereDataFindAllAnswersDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllAnswersDTO;

  constructor(data: FindAllAnswersDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
