import { DomainModel } from '@/models/domain.model';

interface IDataDomainRemovedEvent {
  readonly domain: DomainModel;
}

export class DomainRemovedEvent {
  readonly domain: DomainModel;

  constructor(data: IDataDomainRemovedEvent) {
    this.domain = data.domain;
  }
}
