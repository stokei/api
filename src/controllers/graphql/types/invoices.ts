import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { Invoice } from './invoice';

@ObjectType()
export class Invoices extends Paginated(Invoice) {}
