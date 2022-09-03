import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

import { DomainStatus } from '@/enums/domain-status.enum';

export interface CountDomainsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  name?: IWhereDataSearch;
  active?: IWhereData<boolean>;
  status?: DomainStatus;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountDomainsWhereDTO = keyof CountDomainsWhereDTO;

export type CountDomainsDTO = IBaseCountDTO<CountDomainsWhereDTO>;
