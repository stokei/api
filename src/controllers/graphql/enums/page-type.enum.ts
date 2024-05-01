import { registerEnumType } from '@nestjs/graphql';

import { PageType } from '@/enums/page-type.enum';

registerEnumType(PageType, {
  name: 'PageType'
});

export { PageType };
