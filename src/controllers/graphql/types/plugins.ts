import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { Plugin } from './plugin';

@ObjectType()
export class Plugins extends Paginated(Plugin) {}
