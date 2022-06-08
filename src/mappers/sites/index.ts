import { convertToISODateString } from '@stokei/nestjs';
import { SiteEntity } from '@/entities';
import { SiteModel } from '@/models/site.model';

export class SiteMapper {
  toModel(site: SiteEntity) {
    return (
      site &&
      new SiteModel({
        ...site,
        updatedAt: convertToISODateString(site.updatedAt),
        createdAt: convertToISODateString(site.createdAt)
      })
    );
  }
  toModels(sites: SiteEntity[]) {
    return sites?.length > 0 ? sites.map(this.toModel).filter(Boolean) : [];
  }
}
