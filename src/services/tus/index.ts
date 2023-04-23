import { IS_DEVELOPMENT } from '@/environments';

import { TusService } from './tus-service';

export const TusServices = IS_DEVELOPMENT ? [TusService] : [];
