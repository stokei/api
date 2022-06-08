import { FindAnswerByIdService } from './find-answer-by-id';
import { FindAllAnswersService } from './find-all-answers';
import { CreateAnswerService } from './create-answer';
import { RemoveAnswerService } from './remove-answer';
import { UpdateAnswerService } from './update-answer';

export const AnswerServices = [
  CreateAnswerService,
  RemoveAnswerService,
  UpdateAnswerService,
  FindAnswerByIdService,
  FindAllAnswersService
];
