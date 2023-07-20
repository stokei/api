import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { FilesLoader } from '@/controllers/graphql/dataloaders/files.loader';
import { File } from '@/controllers/graphql/types/file';
import { Material } from '@/controllers/graphql/types/material';
import { MaterialModel } from '@/models/material.model';

@Resolver(() => Material)
export class MaterialFileResolver {
  constructor(private readonly filesLoader: FilesLoader) {}

  @ResolveField(() => File, { nullable: true })
  file(@Parent() material: MaterialModel) {
    return material.file && this.filesLoader.findByIds.load(material.file);
  }
}
