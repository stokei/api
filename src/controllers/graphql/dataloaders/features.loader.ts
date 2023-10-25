import { Injectable, Scope } from '@nestjs/common';
import { PaginationMapper } from '@stokei/nestjs';
import DataLoader from 'dataloader';

import { FeatureModel } from '@/models/feature.model';
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

  readonly findByParentIds = new DataLoader(
    async (featureParentIds: string[]) => {
      const features = await this.featuresService.execute({
        where: {
          AND: {
            parent: {
              equals: featureParentIds
            }
          }
        }
      });
      return featureParentIds.map((parentId) => {
        const items = features?.items?.filter(
          (feature) => feature.parent === parentId
        );
        return new PaginationMapper<FeatureModel>().toPaginationList({
          totalCount: items?.length || 0,
          items
        });
      });
    }
  );
}
