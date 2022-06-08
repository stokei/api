import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountVideosTagsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountVideosTagsWhereDTO = keyof CountVideosTagsWhereDTO;

export type CountVideosTagsDTO = IBaseCountDTO<CountVideosTagsWhereDTO>;
