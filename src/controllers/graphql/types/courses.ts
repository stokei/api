import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { Course } from './course';

@ObjectType()
export class Courses extends Paginated(Course) {}
