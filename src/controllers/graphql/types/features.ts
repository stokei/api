import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { Feature } from './feature';

@ObjectType()
export class Features extends Paginated(Feature) {}
