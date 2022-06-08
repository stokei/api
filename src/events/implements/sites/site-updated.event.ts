import { SiteModel } from '@/models/site.model';

interface IDataSiteUpdatedEvent {
  readonly site: SiteModel;
}

export class SiteUpdatedEvent {
  readonly site: SiteModel;

  constructor(data: IDataSiteUpdatedEvent) {
    this.site = data.site;
  }
}
