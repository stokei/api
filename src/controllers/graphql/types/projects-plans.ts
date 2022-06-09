import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { ProjectsPlan } from './projects-plan';

@ObjectType()
export class ProjectsPlans extends Paginated(ProjectsPlan) {}
