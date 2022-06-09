import { KeywordCreatedHandler } from './keyword-created.handler';
import { KeywordRemovedHandler } from './keyword-removed.handler';
import { KeywordUpdatedHandler } from './keyword-updated.handler';

export const KeywordEventsHandlers = [
  KeywordCreatedHandler,
  KeywordUpdatedHandler,
  KeywordRemovedHandler
];
