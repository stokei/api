import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { Phone } from './phone';

@ObjectType()
export class Phones extends Paginated(Phone) {}
