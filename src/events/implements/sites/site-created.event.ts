import { SiteModel } from '@/models/site.model';

interface IDataSiteCreatedEvent {
  readonly createdBy: string;
  readonly site: SiteModel;
}

export class SiteCreatedEvent {
  readonly createdBy: string;
  readonly site: SiteModel;

  constructor(data: IDataSiteCreatedEvent) {
    this.createdBy = data.createdBy;
    this.site = data.site;
  }
}
