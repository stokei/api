import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { CourseStudent } from './course-student';

@ObjectType()
export class CourseStudents extends Paginated(CourseStudent) {}
