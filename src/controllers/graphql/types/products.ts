import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { Product } from './product';

@ObjectType()
export class Products extends Paginated(Product) {}
