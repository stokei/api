import { AnswerCreatedHandler } from './answer-created.handler';
import { AnswerRemovedHandler } from './answer-removed.handler';
import { AnswerUpdatedHandler } from './answer-updated.handler';

export const AnswerEventsHandlers = [
  AnswerCreatedHandler,
  AnswerUpdatedHandler,
  AnswerRemovedHandler
];
