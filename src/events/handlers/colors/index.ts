import { ColorCreatedHandler } from './color-created.handler';
import { ColorUpdatedHandler } from './color-updated.handler';
import { ColorRemovedHandler } from './color-removed.handler';

export const ColorEventsHandlers = [
  ColorCreatedHandler,
  ColorUpdatedHandler,
  ColorRemovedHandler
];
