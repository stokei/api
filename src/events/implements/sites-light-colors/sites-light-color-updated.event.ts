import { SitesLightColorModel } from '@/models/sites-light-color.model';

interface IDataSitesLightColorUpdatedEvent {
  readonly sitesLightColor: SitesLightColorModel;
}

export class SitesLightColorUpdatedEvent {
  readonly sitesLightColor: SitesLightColorModel;

  constructor(data: IDataSitesLightColorUpdatedEvent) {
    this.sitesLightColor = data.sitesLightColor;
  }
}
