import { CreateQuestionResolver } from './create-question';
import { RemoveQuestionResolver } from './remove-question';
import { UpdateQuestionResolver } from './update-question';

export const QuestionsMutations = [
  CreateQuestionResolver,
  RemoveQuestionResolver,
  UpdateQuestionResolver
];
