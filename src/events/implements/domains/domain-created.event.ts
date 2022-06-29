import { DomainModel } from '@/models/domain.model';

interface IDataDomainCreatedEvent {
  readonly createdBy: string;
  readonly domain: DomainModel;
}

export class DomainCreatedEvent {
  readonly createdBy: string;
  readonly domain: DomainModel;

  constructor(data: IDataDomainCreatedEvent) {
    this.createdBy = data.createdBy;
    this.domain = data.domain;
  }
}
