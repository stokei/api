import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { AppInstructor } from './app-instructor';

@ObjectType()
export class AppInstructors extends Paginated(AppInstructor) {}
