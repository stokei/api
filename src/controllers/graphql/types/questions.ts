import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { Question } from './question';

@ObjectType()
export class Questions extends Paginated(Question) {}
