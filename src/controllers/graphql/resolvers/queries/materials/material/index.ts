import { Args, Query, Resolver } from '@nestjs/graphql';

import { MaterialsLoader } from '@/controllers/graphql/dataloaders/materials.loader';
import { Material } from '@/controllers/graphql/types/material';
import { MaterialNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => Material)
export class MaterialResolver {
  constructor(private readonly materialsLoader: MaterialsLoader) {}

  @Query(() => Material)
  async material(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const material = await this.materialsLoader.findByIds.load(id);
    if (!material) {
      throw new MaterialNotFoundException();
    }
    return material;
  }
}
