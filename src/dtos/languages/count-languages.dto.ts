import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountLanguagesWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountLanguagesWhereDTO = keyof CountLanguagesWhereDTO;

export type CountLanguagesDTO = IBaseCountDTO<CountLanguagesWhereDTO>;
