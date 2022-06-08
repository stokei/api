import { SiteModel } from '@/models/site.model';

interface IDataSiteRemovedEvent {
  readonly site: SiteModel;
}

export class SiteRemovedEvent {
  readonly site: SiteModel;

  constructor(data: IDataSiteRemovedEvent) {
    this.site = data.site;
  }
}
