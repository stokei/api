import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountClassroomsInstructorsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountClassroomsInstructorsWhereDTO =
  keyof CountClassroomsInstructorsWhereDTO;

export type CountClassroomsInstructorsDTO =
  IBaseCountDTO<CountClassroomsInstructorsWhereDTO>;
