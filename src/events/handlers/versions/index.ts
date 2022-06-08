import { VersionCreatedHandler } from './version-created.handler';
import { VersionUpdatedHandler } from './version-updated.handler';
import { VersionRemovedHandler } from './version-removed.handler';

export const VersionEventsHandlers = [
  VersionCreatedHandler,
  VersionUpdatedHandler,
  VersionRemovedHandler
];
