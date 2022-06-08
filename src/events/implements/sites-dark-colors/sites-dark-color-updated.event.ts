import { SitesDarkColorModel } from '@/models/sites-dark-color.model';

interface IDataSitesDarkColorUpdatedEvent {
  readonly sitesDarkColor: SitesDarkColorModel;
}

export class SitesDarkColorUpdatedEvent {
  readonly sitesDarkColor: SitesDarkColorModel;

  constructor(data: IDataSitesDarkColorUpdatedEvent) {
    this.sitesDarkColor = data.sitesDarkColor;
  }
}
