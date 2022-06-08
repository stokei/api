import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';
import {
  FindAllVideosTagsDTO,
  WhereDataFindAllVideosTagsDTO,
  OrderByDataFindAllVideosTagsDTO
} from '@/dtos/videos-tags/find-all-videos-tags.dto';

export class FindAllVideosTagsQuery implements IQuery, FindAllVideosTagsDTO {
  where?: IWhere<WhereDataFindAllVideosTagsDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllVideosTagsDTO;

  constructor(data: FindAllVideosTagsDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
