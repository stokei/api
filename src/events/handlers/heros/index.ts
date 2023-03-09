import { HeroCreatedHandler } from './hero-created.handler';
import { HeroRemovedHandler } from './hero-removed.handler';
import { HeroUpdatedHandler } from './hero-updated.handler';

export const HeroEventsHandlers = [
  HeroCreatedHandler,
  HeroUpdatedHandler,
  HeroRemovedHandler
];
