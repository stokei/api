import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { ClassroomsStudent } from './classrooms-student';

@ObjectType()
export class ClassroomsStudents extends Paginated(ClassroomsStudent) {}
