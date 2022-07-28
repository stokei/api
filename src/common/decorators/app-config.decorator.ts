import { SetMetadata } from '@nestjs/common';

import { IAppConfigDecorator } from '@/interfaces';

export const APP_CONFIG = 'APP_CONFIG';
export const AppConfig = (config: IAppConfigDecorator) =>
  SetMetadata(APP_CONFIG, {
    ...config,
    isRequired:
      config?.isRequired !== undefined || config?.isRequired !== null
        ? config?.isRequired === true
        : true
  });
