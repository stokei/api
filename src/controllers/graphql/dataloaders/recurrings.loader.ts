import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllRecurringsService } from '@/services/recurrings/find-all-recurrings';

@Injectable({ scope: Scope.REQUEST })
export class RecurringsLoader {
  constructor(private readonly recurringsService: FindAllRecurringsService) {}

  readonly findByIds = new DataLoader(async (recurringIds: string[]) => {
    const recurrings = await this.recurringsService.execute({
      where: {
        AND: {
          ids: recurringIds
        }
      }
    });
    const recurringsMap = new Map(
      recurrings?.items?.map((recurring) => [recurring.id, recurring])
    );
    return recurringIds.map((recurringId) => recurringsMap.get(recurringId));
  });
}
