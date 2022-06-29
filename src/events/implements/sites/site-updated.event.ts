import { SiteModel } from '@/models/site.model';

interface IDataSiteUpdatedEvent {
  readonly updatedBy: string;
  readonly site: SiteModel;
}

export class SiteUpdatedEvent {
  readonly updatedBy: string;
  readonly site: SiteModel;

  constructor(data: IDataSiteUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.site = data.site;
  }
}
