import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountVideosSubtitlesWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountVideosSubtitlesWhereDTO =
  keyof CountVideosSubtitlesWhereDTO;

export type CountVideosSubtitlesDTO =
  IBaseCountDTO<CountVideosSubtitlesWhereDTO>;
