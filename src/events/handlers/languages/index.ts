import { LanguageCreatedHandler } from './language-created.handler';
import { LanguageUpdatedHandler } from './language-updated.handler';
import { LanguageRemovedHandler } from './language-removed.handler';

export const LanguageEventsHandlers = [
  LanguageCreatedHandler,
  LanguageUpdatedHandler,
  LanguageRemovedHandler
];
