import { QuestionCreatedHandler } from './question-created.handler';
import { QuestionUpdatedHandler } from './question-updated.handler';
import { QuestionRemovedHandler } from './question-removed.handler';

export const QuestionEventsHandlers = [
  QuestionCreatedHandler,
  QuestionUpdatedHandler,
  QuestionRemovedHandler
];
