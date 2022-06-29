import { SiteModel } from '@/models/site.model';

interface IDataSiteRemovedEvent {
  readonly removedBy: string;
  readonly site: SiteModel;
}

export class SiteRemovedEvent {
  readonly removedBy: string;
  readonly site: SiteModel;

  constructor(data: IDataSiteRemovedEvent) {
    this.removedBy = data.removedBy;
    this.site = data.site;
  }
}
