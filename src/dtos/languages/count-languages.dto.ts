import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountLanguagesWhereDTO {
  ids?: string[];
  app?: IWhereData;
  name?: IWhereDataSearch;
  active?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountLanguagesWhereDTO = keyof CountLanguagesWhereDTO;

export type CountLanguagesDTO = IBaseCountDTO<CountLanguagesWhereDTO>;
