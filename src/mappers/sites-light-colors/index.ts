import { convertToISODateString } from '@stokei/nestjs';

import { SitesLightColorEntity } from '@/entities';
import { SitesLightColorModel } from '@/models/sites-light-color.model';

export class SitesLightColorMapper {
  toModel(sitesLightColor: SitesLightColorEntity) {
    return (
      sitesLightColor &&
      new SitesLightColorModel({
        ...sitesLightColor,
        updatedAt: convertToISODateString(sitesLightColor.updatedAt),
        createdAt: convertToISODateString(sitesLightColor.createdAt)
      })
    );
  }
  toModels(sitesLightColors: SitesLightColorEntity[]) {
    return sitesLightColors?.length > 0
      ? sitesLightColors.map(this.toModel).filter(Boolean)
      : [];
  }
}
