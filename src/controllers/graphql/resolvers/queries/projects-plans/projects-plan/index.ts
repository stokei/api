import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProjectsPlansLoader } from '@/controllers/graphql/dataloaders/projects-plans.loader';
import { ProjectsPlan } from '@/controllers/graphql/types/projects-plan';
import {
  ProjectsPlanNotFoundException,
  ParamNotFoundException
} from '@/errors';

@Resolver(() => ProjectsPlan)
export class ProjectsPlanResolver {
  constructor(private readonly projectsPlansLoader: ProjectsPlansLoader) {}

  @Query(() => ProjectsPlan)
  async projectsPlan(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const projectsPlan = await this.projectsPlansLoader.findByIds.load(id);
    if (!projectsPlan) {
      throw new ProjectsPlanNotFoundException();
    }
    return projectsPlan;
  }
}
