import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import {
  IModuleVideoModelData,
  ModuleVideoModel
} from '@/models/module-video.model';

export class ModuleVideoModelMock extends ModuleVideoModel {
  constructor(data?: Partial<IModuleVideoModelData>) {
    super({
      _id: nanoid(),
      module: data?.module ?? 'modules.anyModule',
      video: data?.video ?? 'videos.anyVideo',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
