import { registerEnumType } from '@nestjs/graphql';

import { FileStatus } from '@/enums/file-status.enum';

registerEnumType(FileStatus, {
  name: 'FileStatus'
});

export { FileStatus };
