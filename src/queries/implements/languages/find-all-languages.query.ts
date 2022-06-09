import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllLanguagesDTO,
  OrderByDataFindAllLanguagesDTO,
  WhereDataFindAllLanguagesDTO
} from '@/dtos/languages/find-all-languages.dto';

export class FindAllLanguagesQuery implements IQuery, FindAllLanguagesDTO {
  where?: IWhere<WhereDataFindAllLanguagesDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllLanguagesDTO;

  constructor(data: FindAllLanguagesDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
