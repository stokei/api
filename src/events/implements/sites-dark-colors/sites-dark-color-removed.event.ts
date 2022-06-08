import { SitesDarkColorModel } from '@/models/sites-dark-color.model';

interface IDataSitesDarkColorRemovedEvent {
  readonly sitesDarkColor: SitesDarkColorModel;
}

export class SitesDarkColorRemovedEvent {
  readonly sitesDarkColor: SitesDarkColorModel;

  constructor(data: IDataSitesDarkColorRemovedEvent) {
    this.sitesDarkColor = data.sitesDarkColor;
  }
}
