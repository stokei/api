import { DomainModel } from '@/models/domain.model';

interface IDataDomainRemovedEvent {
  readonly removedBy: string;
  readonly domain: DomainModel;
}

export class DomainRemovedEvent {
  readonly removedBy: string;
  readonly domain: DomainModel;

  constructor(data: IDataDomainRemovedEvent) {
    this.removedBy = data.removedBy;
    this.domain = data.domain;
  }
}
