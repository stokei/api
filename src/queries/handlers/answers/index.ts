import { FindAllAnswersQueryHandler } from './find-all-answers';
import { FindAnswerByIdQueryHandler } from './find-answer-by-id';

export const AnswerQueriesHandlers = [
  FindAnswerByIdQueryHandler,
  FindAllAnswersQueryHandler
];
