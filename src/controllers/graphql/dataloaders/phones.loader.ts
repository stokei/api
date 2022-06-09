import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllPhonesService } from '@/services/phones/find-all-phones';

@Injectable({ scope: Scope.REQUEST })
export class PhonesLoader {
  constructor(private readonly phonesService: FindAllPhonesService) {}

  readonly findByIds = new DataLoader(async (phoneIds: string[]) => {
    const phones = await this.phonesService.execute({
      where: {
        AND: {
          ids: phoneIds
        }
      }
    });
    const phonesMap = new Map(phones?.items?.map((phone) => [phone.id, phone]));
    return phoneIds.map((phoneId) => phonesMap.get(phoneId));
  });
}
