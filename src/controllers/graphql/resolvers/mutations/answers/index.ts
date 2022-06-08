import { CreateAnswerResolver } from './create-answer';
import { RemoveAnswerResolver } from './remove-answer';
import { UpdateAnswerResolver } from './update-answer';

export const AnswersMutations = [
  CreateAnswerResolver,
  RemoveAnswerResolver,
  UpdateAnswerResolver
];
