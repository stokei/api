import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountClassroomsTagsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountClassroomsTagsWhereDTO =
  keyof CountClassroomsTagsWhereDTO;

export type CountClassroomsTagsDTO = IBaseCountDTO<CountClassroomsTagsWhereDTO>;
