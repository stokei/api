import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { Hero } from './hero';

@ObjectType()
export class Heros extends Paginated(Hero) {}
