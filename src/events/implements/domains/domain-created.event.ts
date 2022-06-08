import { DomainModel } from '@/models/domain.model';

interface IDataDomainCreatedEvent {
  readonly domain: DomainModel;
}

export class DomainCreatedEvent {
  readonly domain: DomainModel;

  constructor(data: IDataDomainCreatedEvent) {
    this.domain = data.domain;
  }
}
