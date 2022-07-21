import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountLanguagesWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountLanguagesWhereDTO = keyof CountLanguagesWhereDTO;

export type CountLanguagesDTO = IBaseCountDTO<CountLanguagesWhereDTO>;
