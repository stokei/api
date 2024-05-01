import { createServiceId } from '@stokei/nestjs';

import { DomainStatus } from '@/controllers/graphql/enums/domain-status.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { DomainModel } from '@/models/domain.model';
import { SiteModel } from '@/models/site.model';
import { getDefaultSiteDomain } from '@/utils/get-default-site-domain';

interface GetSiteStokeiDomainData {
  readonly site: SiteModel;
}

export const getSiteStokeiDomain = ({ site }: GetSiteStokeiDomainData) =>
  new DomainModel({
    id: createServiceId({
      id: 'site-domain-stokei',
      service: ServerStokeiApiIdPrefix.DOMAINS
    }),
    app: site.app,
    parent: site.id,
    free: true,
    name: getDefaultSiteDomain({ slug: site.slug }),
    status: DomainStatus.ACTIVE,
    active: true,
    createdBy: site.parent
  });
