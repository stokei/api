import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { Account } from './account';

@ObjectType()
export class Accounts extends Paginated(Account) {}
