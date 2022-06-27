import { registerEnumType } from '@nestjs/graphql';

import { VideoStatus } from '@/enums/video-status.enum';

registerEnumType(VideoStatus, {
  name: 'VideoStatus'
});

export { VideoStatus };
