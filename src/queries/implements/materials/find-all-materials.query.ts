import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';

import {
  FindAllMaterialsDTO,
  OrderByDataFindAllMaterialsDTO,
  WhereDataFindAllMaterialsDTO
} from '@/dtos/materials/find-all-materials.dto';

export class FindAllMaterialsQuery implements IQuery, FindAllMaterialsDTO {
  where?: IWhere<WhereDataFindAllMaterialsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllMaterialsDTO;

  constructor(data: FindAllMaterialsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
