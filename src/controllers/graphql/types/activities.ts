import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { Activity } from './activity';

@ObjectType()
export class Activities extends Paginated(Activity) {}
