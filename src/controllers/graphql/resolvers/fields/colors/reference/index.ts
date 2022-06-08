import { Resolver, ResolveReference } from '@nestjs/graphql';
import { ColorsLoader } from '@/controllers/graphql/dataloaders/colors.loader';
import { Color } from '@/controllers/graphql/types/color';

@Resolver(() => Color)
export class ColorReferenceResolver {
  constructor(private readonly colorsLoader: ColorsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.colorsLoader.findByIds.load(reference.id);
  }
}
