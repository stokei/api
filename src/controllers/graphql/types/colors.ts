import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { Color } from './color';

@ObjectType()
export class Colors extends Paginated(Color) {}
