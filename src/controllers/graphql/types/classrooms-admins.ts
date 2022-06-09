import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { ClassroomsAdmin } from './classrooms-admin';

@ObjectType()
export class ClassroomsAdmins extends Paginated(ClassroomsAdmin) {}
