import { CardCreatedHandler } from './card-created.handler';
import { CardRemovedHandler } from './card-removed.handler';
import { CardUpdatedHandler } from './card-updated.handler';

export const CardEventsHandlers = [
  CardCreatedHandler,
  CardUpdatedHandler,
  CardRemovedHandler
];
