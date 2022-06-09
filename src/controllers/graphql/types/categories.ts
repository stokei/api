import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { Category } from './category';

@ObjectType()
export class Categories extends Paginated(Category) {}
