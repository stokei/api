import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { Role } from './role';

@ObjectType()
export class Roles extends Paginated(Role) {}
