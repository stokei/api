import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllFeaturesService } from '@/services/features/find-all-features';

@Injectable({ scope: Scope.REQUEST })
export class FeaturesLoader {
  constructor(private readonly featuresService: FindAllFeaturesService) {}

  readonly findByIds = new DataLoader(async (featureIds: string[]) => {
    const features = await this.featuresService.execute({
      where: {
        AND: {
          ids: featureIds
        }
      }
    });
    const featuresMap = new Map(
      features?.items?.map((feature) => [feature.id, feature])
    );
    return featureIds.map((featureId) => featuresMap.get(featureId));
  });
}
