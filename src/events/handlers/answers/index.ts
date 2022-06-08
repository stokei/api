import { AnswerCreatedHandler } from './answer-created.handler';
import { AnswerUpdatedHandler } from './answer-updated.handler';
import { AnswerRemovedHandler } from './answer-removed.handler';

export const AnswerEventsHandlers = [
  AnswerCreatedHandler,
  AnswerUpdatedHandler,
  AnswerRemovedHandler
];
