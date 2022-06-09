import { CreateQuestionService } from './create-question';
import { FindAllQuestionsService } from './find-all-questions';
import { FindQuestionByIdService } from './find-question-by-id';
import { RemoveQuestionService } from './remove-question';
import { UpdateQuestionService } from './update-question';

export const QuestionServices = [
  CreateQuestionService,
  RemoveQuestionService,
  UpdateQuestionService,
  FindQuestionByIdService,
  FindAllQuestionsService
];
