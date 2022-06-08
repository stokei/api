import { SitesDarkColorModel } from '@/models/sites-dark-color.model';

interface IDataSitesDarkColorCreatedEvent {
  readonly sitesDarkColor: SitesDarkColorModel;
}

export class SitesDarkColorCreatedEvent {
  readonly sitesDarkColor: SitesDarkColorModel;

  constructor(data: IDataSitesDarkColorCreatedEvent) {
    this.sitesDarkColor = data.sitesDarkColor;
  }
}
