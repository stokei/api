import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { Access } from './access';

@ObjectType()
export class Accesses extends Paginated(Access) {}
