import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { App } from './app';

@ObjectType()
export class Apps extends Paginated(App) {}
