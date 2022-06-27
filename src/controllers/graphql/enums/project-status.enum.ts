import { registerEnumType } from '@nestjs/graphql';

import { ProjectStatus } from '@/enums/project-status.enum';

registerEnumType(ProjectStatus, {
  name: 'ProjectStatus'
});

export { ProjectStatus };
