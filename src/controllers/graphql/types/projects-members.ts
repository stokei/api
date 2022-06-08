import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';
import { ProjectsMember } from './projects-member';

@ObjectType()
export class ProjectsMembers extends Paginated(ProjectsMember) {}
