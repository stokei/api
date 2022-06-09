import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { Project } from './project';

@ObjectType()
export class Projects extends Paginated(Project) {}
