import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { ProductsCategory } from './products-category';

@ObjectType()
export class ProductsCategories extends Paginated(ProductsCategory) {}
