import { IS_PRODUCTION } from '@/environments';

import { TusService } from './tus-service';

export const TusServices = !IS_PRODUCTION ? [TusService] : [];
