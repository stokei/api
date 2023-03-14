import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { SortedItem } from './sorted-item';

@ObjectType()
export class SortedItems extends Paginated(SortedItem) {}
