import { convertToISODateString } from '@stokei/nestjs';

import { AppEntity } from '@/entities';
import { AppModel } from '@/models/app.model';

export class AppMapper {
  toModel(app: AppEntity) {
    return (
      app &&
      new AppModel({
        ...app,
        updatedAt: convertToISODateString(app.updatedAt),
        createdAt: convertToISODateString(app.createdAt)
      })
    );
  }
  toModels(apps: AppEntity[]) {
    return apps?.length > 0 ? apps.map(this.toModel).filter(Boolean) : [];
  }
}
