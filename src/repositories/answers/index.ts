import { CountAnswersRepository } from './count-answers';
import { CreateAnswerRepository } from './create-answer';
import { ExistsAnswersRepository } from './exists-answers';
import { FindAnswerByIdRepository } from './find-answer-by-id';
import { FindAllAnswersRepository } from './find-all-answers';
import { RemoveAnswerRepository } from './remove-answer';
import { UpdateAnswerRepository } from './update-answer';

export const AnswersRepositories = [
  CountAnswersRepository,
  CreateAnswerRepository,
  ExistsAnswersRepository,
  FindAnswerByIdRepository,
  FindAllAnswersRepository,
  RemoveAnswerRepository,
  UpdateAnswerRepository
];
