import { ColorCreatedHandler } from './color-created.handler';
import { ColorRemovedHandler } from './color-removed.handler';
import { ColorUpdatedHandler } from './color-updated.handler';

export const ColorEventsHandlers = [
  ColorCreatedHandler,
  ColorUpdatedHandler,
  ColorRemovedHandler
];
