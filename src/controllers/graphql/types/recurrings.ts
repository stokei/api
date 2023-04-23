import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { Recurring } from './recurring';

@ObjectType()
export class Recurrings extends Paginated(Recurring) {}
