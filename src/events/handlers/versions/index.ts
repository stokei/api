import { VersionCreatedHandler } from './version-created.handler';
import { VersionPublishedHandler } from './version-published.handler';
import { VersionRemovedHandler } from './version-removed.handler';
import { VersionUpdatedHandler } from './version-updated.handler';

export const VersionEventsHandlers = [
  VersionCreatedHandler,
  VersionUpdatedHandler,
  VersionRemovedHandler,
  VersionPublishedHandler
];
