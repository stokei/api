import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { ColorType } from '@/enums/color-type.enum';
import { ThemeMode } from '@/enums/theme-mode.enum';
import { ColorModel, IColorModelData } from '@/models/color.model';

export class ColorModelMock extends ColorModel {
  constructor(data?: Partial<IColorModelData>) {
    super({
      _id: data?.id ?? nanoid(),
      parent: data?.parent ?? 'anyParent',
      themeMode: data?.themeMode ?? ThemeMode.LIGHT,
      type: data?.type ?? ColorType.PRIMARY,
      color: data?.color ?? '#123456',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      app: data?.app ?? 'apps.anyApp',
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
