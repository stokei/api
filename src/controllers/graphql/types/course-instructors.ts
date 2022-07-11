import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { CourseInstructor } from './course-instructor';

@ObjectType()
export class CourseInstructors extends Paginated(CourseInstructor) {}
