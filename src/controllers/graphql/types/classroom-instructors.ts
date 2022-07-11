import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { ClassroomInstructor } from './classroom-instructor';

@ObjectType()
export class ClassroomInstructors extends Paginated(ClassroomInstructor) {}
