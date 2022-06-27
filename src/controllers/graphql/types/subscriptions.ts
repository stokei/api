import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { Subscription } from './subscription';

@ObjectType()
export class Subscriptions extends Paginated(Subscription) {}
