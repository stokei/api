import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProjectsLoader } from '@/controllers/graphql/dataloaders/projects.loader';
import { Project } from '@/controllers/graphql/types/project';
import { ProjectNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly projectsLoader: ProjectsLoader) {}

  @Query(() => Project)
  async project(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const project = await this.projectsLoader.findByIds.load(id);
    if (!project) {
      throw new ProjectNotFoundException();
    }
    return project;
  }
}
