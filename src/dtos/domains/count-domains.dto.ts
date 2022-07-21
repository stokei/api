import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

import { DomainStatus } from '@/enums/domain-status.enum';

export interface CountDomainsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
  default?: IWhereData<boolean>;
  active?: IWhereData<boolean>;
  fulldomain?: IWhereDataSearch;
  extension?: IWhereData;
  language?: IWhereData;
  status?: IWhereData<DomainStatus>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountDomainsWhereDTO = keyof CountDomainsWhereDTO;

export type CountDomainsDTO = IBaseCountDTO<CountDomainsWhereDTO>;
