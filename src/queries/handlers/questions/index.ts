import { FindAllQuestionsQueryHandler } from './find-all-questions';
import { FindQuestionByIdQueryHandler } from './find-question-by-id';

export const QuestionQueriesHandlers = [
  FindQuestionByIdQueryHandler,
  FindAllQuestionsQueryHandler
];
