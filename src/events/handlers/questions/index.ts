import { QuestionCreatedHandler } from './question-created.handler';
import { QuestionRemovedHandler } from './question-removed.handler';
import { QuestionUpdatedHandler } from './question-updated.handler';

export const QuestionEventsHandlers = [
  QuestionCreatedHandler,
  QuestionUpdatedHandler,
  QuestionRemovedHandler
];
