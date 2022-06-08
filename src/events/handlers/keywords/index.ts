import { KeywordCreatedHandler } from './keyword-created.handler';
import { KeywordUpdatedHandler } from './keyword-updated.handler';
import { KeywordRemovedHandler } from './keyword-removed.handler';

export const KeywordEventsHandlers = [
  KeywordCreatedHandler,
  KeywordUpdatedHandler,
  KeywordRemovedHandler
];
