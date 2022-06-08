import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';
import { ProductsTag } from './products-tag';

@ObjectType()
export class ProductsTags extends Paginated(ProductsTag) {}
