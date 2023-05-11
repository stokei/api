import { DomainModel } from '@/models/domain.model';

interface IDataDomainActivatedEvent {
  readonly updatedBy: string;
  readonly domain: DomainModel;
}

export class DomainActivatedEvent {
  readonly updatedBy: string;
  readonly domain: DomainModel;

  constructor(data: IDataDomainActivatedEvent) {
    this.updatedBy = data.updatedBy;
    this.domain = data.domain;
  }
}
