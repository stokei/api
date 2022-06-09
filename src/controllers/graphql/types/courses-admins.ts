import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { CoursesAdmin } from './courses-admin';

@ObjectType()
export class CoursesAdmins extends Paginated(CoursesAdmin) {}
