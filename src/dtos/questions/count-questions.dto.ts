import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountQuestionsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountQuestionsWhereDTO = keyof CountQuestionsWhereDTO;

export type CountQuestionsDTO = IBaseCountDTO<CountQuestionsWhereDTO>;
