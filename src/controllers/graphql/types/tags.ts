import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { Tag } from './tag';

@ObjectType()
export class Tags extends Paginated(Tag) {}
