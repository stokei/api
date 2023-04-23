import { registerEnumType } from '@nestjs/graphql';

import { HeroType } from '@/enums/hero-type.enum';

registerEnumType(HeroType, {
  name: 'HeroType'
});

export { HeroType };
