import { CardCreatedHandler } from './card-created.handler';
import { CardUpdatedHandler } from './card-updated.handler';
import { CardRemovedHandler } from './card-removed.handler';

export const CardEventsHandlers = [
  CardCreatedHandler,
  CardUpdatedHandler,
  CardRemovedHandler
];
