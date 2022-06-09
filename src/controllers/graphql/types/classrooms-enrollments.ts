import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { ClassroomsEnrollment } from './classrooms-enrollment';

@ObjectType()
export class ClassroomsEnrollments extends Paginated(ClassroomsEnrollment) {}
