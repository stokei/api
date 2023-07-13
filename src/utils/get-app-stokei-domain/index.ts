import { createServiceId } from '@stokei/nestjs';

import { DomainStatus } from '@/controllers/graphql/enums/domain-status.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { AppModel } from '@/models/app.model';
import { DomainModel } from '@/models/domain.model';
import { getDefaultAppDomain } from '@/utils/get-default-app-domain';

interface GetAppStokeiDomainData {
  readonly app: AppModel;
}

export const getAppStokeiDomain = ({ app }: GetAppStokeiDomainData) =>
  new DomainModel({
    id: createServiceId({
      id: 'app-domain-stokei',
      service: ServerStokeiApiIdPrefix.DOMAINS
    }),
    app: app.id,
    parent: app.id,
    name: getDefaultAppDomain({ appId: app.id }),
    status: DomainStatus.ACTIVE,
    active: true,
    createdBy: app.parent
  });
