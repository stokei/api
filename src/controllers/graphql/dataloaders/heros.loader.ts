import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllHerosService } from '@/services/heros/find-all-heros';

@Injectable({ scope: Scope.REQUEST })
export class HerosLoader {
  constructor(private readonly herosService: FindAllHerosService) {}

  readonly findByIds = new DataLoader(async (heroIds: string[]) => {
    const heros = await this.herosService.execute({
      where: {
        AND: {
          ids: heroIds
        }
      }
    });
    const herosMap = new Map(heros?.items?.map((hero) => [hero.id, hero]));
    return heroIds.map((heroId) => herosMap.get(heroId));
  });
}
