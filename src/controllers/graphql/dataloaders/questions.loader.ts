import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllQuestionsService } from '@/services/questions/find-all-questions';

@Injectable({ scope: Scope.REQUEST })
export class QuestionsLoader {
  constructor(private readonly questionsService: FindAllQuestionsService) {}

  readonly findByIds = new DataLoader(async (questionIds: string[]) => {
    const questions = await this.questionsService.execute({
      where: {
        AND: {
          ids: questionIds
        }
      }
    });
    const questionsMap = new Map(
      questions?.items?.map((question) => [question.id, question])
    );
    return questionIds.map((questionId) => questionsMap.get(questionId));
  });
}
