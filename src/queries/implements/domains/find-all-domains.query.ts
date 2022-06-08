import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';
import {
  FindAllDomainsDTO,
  WhereDataFindAllDomainsDTO,
  OrderByDataFindAllDomainsDTO
} from '@/dtos/domains/find-all-domains.dto';

export class FindAllDomainsQuery implements IQuery, FindAllDomainsDTO {
  where?: IWhere<WhereDataFindAllDomainsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllDomainsDTO;

  constructor(data: FindAllDomainsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
