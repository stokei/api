import { DomainModel } from '@/models/domain.model';

interface IDataDomainUpdatedEvent {
  readonly domain: DomainModel;
}

export class DomainUpdatedEvent {
  readonly domain: DomainModel;

  constructor(data: IDataDomainUpdatedEvent) {
    this.domain = data.domain;
  }
}
