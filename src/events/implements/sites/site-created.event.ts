import { SiteModel } from '@/models/site.model';

interface IDataSiteCreatedEvent {
  readonly site: SiteModel;
}

export class SiteCreatedEvent {
  readonly site: SiteModel;

  constructor(data: IDataSiteCreatedEvent) {
    this.site = data.site;
  }
}
