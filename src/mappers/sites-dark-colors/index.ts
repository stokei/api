import { convertToISODateString } from '@stokei/nestjs';

import { SitesDarkColorEntity } from '@/entities';
import { SitesDarkColorModel } from '@/models/sites-dark-color.model';

export class SitesDarkColorMapper {
  toModel(sitesDarkColor: SitesDarkColorEntity) {
    return (
      sitesDarkColor &&
      new SitesDarkColorModel({
        ...sitesDarkColor,
        updatedAt: convertToISODateString(sitesDarkColor.updatedAt),
        createdAt: convertToISODateString(sitesDarkColor.createdAt)
      })
    );
  }
  toModels(sitesDarkColors: SitesDarkColorEntity[]) {
    return sitesDarkColors?.length > 0
      ? sitesDarkColors.map(this.toModel).filter(Boolean)
      : [];
  }
}
