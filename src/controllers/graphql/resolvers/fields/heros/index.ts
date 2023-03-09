import { HeroAppResolver } from './app';
import { HeroCreatedByResolver } from './created-by';
import { HeroImageResolver } from './image';
import { HeroReferenceResolver } from './reference';
import { HeroUpdatedByResolver } from './updated-by';
import { HeroVideoResolver } from './video';

export const HerosFieldsResolvers = [
  HeroReferenceResolver,
  HeroAppResolver,
  HeroCreatedByResolver,
  HeroUpdatedByResolver,
  HeroImageResolver,
  HeroVideoResolver
];
