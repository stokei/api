import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { ClassroomStudent } from './classroom-student';

@ObjectType()
export class ClassroomStudents extends Paginated(ClassroomStudent) {}
