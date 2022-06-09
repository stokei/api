import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { ProductsImage } from './products-image';

@ObjectType()
export class ProductsImages extends Paginated(ProductsImage) {}
