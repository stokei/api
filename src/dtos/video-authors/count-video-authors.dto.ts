import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountVideoAuthorsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountVideoAuthorsWhereDTO = keyof CountVideoAuthorsWhereDTO;

export type CountVideoAuthorsDTO = IBaseCountDTO<CountVideoAuthorsWhereDTO>;
