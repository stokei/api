import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { Page } from './page';

@ObjectType()
export class Pages extends Paginated(Page) {}
