import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { AppAdmin } from './app-admin';

@ObjectType()
export class AppAdmins extends Paginated(AppAdmin) {}
