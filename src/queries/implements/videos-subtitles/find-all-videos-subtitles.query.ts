import { IQuery } from '@nestjs/cqrs';
import { IPaginatinInputDTO, IWhere } from '@stokei/nestjs';
import {
  FindAllVideosSubtitlesDTO,
  WhereDataFindAllVideosSubtitlesDTO,
  OrderByDataFindAllVideosSubtitlesDTO
} from '@/dtos/videos-subtitles/find-all-videos-subtitles.dto';

export class FindAllVideosSubtitlesQuery
  implements IQuery, FindAllVideosSubtitlesDTO
{
  where?: IWhere<WhereDataFindAllVideosSubtitlesDTO>;
  page?: IPaginatinInputDTO;
  orderBy?: OrderByDataFindAllVideosSubtitlesDTO;

  constructor(data: FindAllVideosSubtitlesDTO) {
    this.where = data.where;
    this.page = data.page;
    this.orderBy = data.orderBy;
  }
}
