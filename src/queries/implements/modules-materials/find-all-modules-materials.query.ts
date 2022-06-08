import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';
import {
  FindAllModulesMaterialsDTO,
  WhereDataFindAllModulesMaterialsDTO,
  OrderByDataFindAllModulesMaterialsDTO
} from '@/dtos/modules-materials/find-all-modules-materials.dto';

export class FindAllModulesMaterialsQuery
  implements IQuery, FindAllModulesMaterialsDTO
{
  where?: IWhere<WhereDataFindAllModulesMaterialsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllModulesMaterialsDTO;

  constructor(data: FindAllModulesMaterialsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
