import { MaterialCreatedHandler } from './material-created.handler';
import { MaterialRemovedHandler } from './material-removed.handler';
import { MaterialUpdatedHandler } from './material-updated.handler';

export const MaterialEventsHandlers = [
  MaterialCreatedHandler,
  MaterialUpdatedHandler,
  MaterialRemovedHandler
];
