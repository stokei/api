import { CountQuestionsRepository } from './count-questions';
import { CreateQuestionRepository } from './create-question';
import { ExistsQuestionsRepository } from './exists-questions';
import { FindAllQuestionsRepository } from './find-all-questions';
import { FindQuestionByIdRepository } from './find-question-by-id';
import { RemoveQuestionRepository } from './remove-question';
import { UpdateQuestionRepository } from './update-question';

export const QuestionsRepositories = [
  CountQuestionsRepository,
  CreateQuestionRepository,
  ExistsQuestionsRepository,
  FindQuestionByIdRepository,
  FindAllQuestionsRepository,
  RemoveQuestionRepository,
  UpdateQuestionRepository
];
