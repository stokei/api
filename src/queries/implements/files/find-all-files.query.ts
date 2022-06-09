import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllFilesDTO,
  OrderByDataFindAllFilesDTO,
  WhereDataFindAllFilesDTO
} from '@/dtos/files/find-all-files.dto';

export class FindAllFilesQuery implements IQuery, FindAllFilesDTO {
  where?: IWhere<WhereDataFindAllFilesDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllFilesDTO;

  constructor(data: FindAllFilesDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
