import { LanguageCreatedHandler } from './language-created.handler';
import { LanguageRemovedHandler } from './language-removed.handler';
import { LanguageUpdatedHandler } from './language-updated.handler';

export const LanguageEventsHandlers = [
  LanguageCreatedHandler,
  LanguageUpdatedHandler,
  LanguageRemovedHandler
];
