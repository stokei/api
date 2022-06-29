import { DomainModel } from '@/models/domain.model';

interface IDataDomainUpdatedEvent {
  readonly updatedBy: string;
  readonly domain: DomainModel;
}

export class DomainUpdatedEvent {
  readonly updatedBy: string;
  readonly domain: DomainModel;

  constructor(data: IDataDomainUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.domain = data.domain;
  }
}
