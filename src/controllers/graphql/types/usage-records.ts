import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { UsageRecord } from './usage-record';

@ObjectType()
export class UsageRecords extends Paginated(UsageRecord) {}
