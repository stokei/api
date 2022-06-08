import { SitesLightColorModel } from '@/models/sites-light-color.model';

interface IDataSitesLightColorRemovedEvent {
  readonly sitesLightColor: SitesLightColorModel;
}

export class SitesLightColorRemovedEvent {
  readonly sitesLightColor: SitesLightColorModel;

  constructor(data: IDataSitesLightColorRemovedEvent) {
    this.sitesLightColor = data.sitesLightColor;
  }
}
