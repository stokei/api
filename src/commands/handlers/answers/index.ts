import { CreateAnswerCommandHandler } from './create-answer';
import { RemoveAnswerCommandHandler } from './remove-answer';
import { UpdateAnswerCommandHandler } from './update-answer';

export const AnswerCommandHandlers = [
  CreateAnswerCommandHandler,
  RemoveAnswerCommandHandler,
  UpdateAnswerCommandHandler
];
