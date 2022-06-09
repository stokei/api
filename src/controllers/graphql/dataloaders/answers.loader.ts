import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllAnswersService } from '@/services/answers/find-all-answers';

@Injectable({ scope: Scope.REQUEST })
export class AnswersLoader {
  constructor(private readonly answersService: FindAllAnswersService) {}

  readonly findByIds = new DataLoader(async (answerIds: string[]) => {
    const answers = await this.answersService.execute({
      where: {
        AND: {
          ids: answerIds
        }
      }
    });
    const answersMap = new Map(
      answers?.items?.map((answer) => [answer.id, answer])
    );
    return answerIds.map((answerId) => answersMap.get(answerId));
  });
}
