import { DomainModel } from '@/models/domain.model';

interface IDataDomainCreatedEvent {
  readonly createdBy: string;
  readonly isDefault?: boolean;
  readonly domain: DomainModel;
}

export class DomainCreatedEvent {
  readonly createdBy: string;
  readonly isDefault?: boolean;
  readonly domain: DomainModel;

  constructor(data: IDataDomainCreatedEvent) {
    this.createdBy = data.createdBy;
    this.isDefault = !!data.isDefault;
    this.domain = data.domain;
  }
}
