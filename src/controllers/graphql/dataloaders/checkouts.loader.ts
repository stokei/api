import { Injectable, Scope } from '@nestjs/common';
import { FindAllCheckoutsService } from '@/services/checkouts/find-all-checkouts';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class CheckoutsLoader {
  constructor(private readonly checkoutsService: FindAllCheckoutsService) {}

  readonly findByIds = new DataLoader(async (checkoutIds: string[]) => {
    const checkouts = await this.checkoutsService.execute({
      where: {
        AND: {
          ids: checkoutIds
        }
      }
    });
    const checkoutsMap = new Map(
      checkouts?.items?.map((checkout) => [checkout.id, checkout])
    );
    return checkoutIds.map((checkoutId) => checkoutsMap.get(checkoutId));
  });
}
