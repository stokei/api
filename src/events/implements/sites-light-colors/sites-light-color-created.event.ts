import { SitesLightColorModel } from '@/models/sites-light-color.model';

interface IDataSitesLightColorCreatedEvent {
  readonly sitesLightColor: SitesLightColorModel;
}

export class SitesLightColorCreatedEvent {
  readonly sitesLightColor: SitesLightColorModel;

  constructor(data: IDataSitesLightColorCreatedEvent) {
    this.sitesLightColor = data.sitesLightColor;
  }
}
