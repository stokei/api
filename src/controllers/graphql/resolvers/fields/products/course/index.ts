import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { splitServiceId } from '@stokei/nestjs';

import { CoursesLoader } from '@/controllers/graphql/dataloaders/courses.loader';
import { Course } from '@/controllers/graphql/types/course';
import { Product } from '@/controllers/graphql/types/product';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ProductModel } from '@/models/product.model';

@Resolver(() => Product)
export class ProductCourseResolver {
  constructor(private readonly coursesLoader: CoursesLoader) {}

  @ResolveField(() => Course, { nullable: true })
  course(@Parent() product: ProductModel) {
    if (
      product.parent &&
      splitServiceId(product.parent)?.service ===
        ServerStokeiApiIdPrefix.COURSES
    ) {
      return this.coursesLoader.findByIds.load(product.parent);
    }
  }
}
