import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountAnswersWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountAnswersWhereDTO = keyof CountAnswersWhereDTO;

export type CountAnswersDTO = IBaseCountDTO<CountAnswersWhereDTO>;
