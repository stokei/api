import { CreateQuestionCommandHandler } from './create-question';
import { RemoveQuestionCommandHandler } from './remove-question';
import { UpdateQuestionCommandHandler } from './update-question';

export const QuestionCommandHandlers = [
  CreateQuestionCommandHandler,
  RemoveQuestionCommandHandler,
  UpdateQuestionCommandHandler
];
