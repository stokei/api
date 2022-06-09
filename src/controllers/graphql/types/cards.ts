import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { Card } from './card';

@ObjectType()
export class Cards extends Paginated(Card) {}
