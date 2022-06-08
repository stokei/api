import { Resolver, ResolveReference } from '@nestjs/graphql';
import { ProjectsLoader } from '@/controllers/graphql/dataloaders/projects.loader';
import { Project } from '@/controllers/graphql/types/project';

@Resolver(() => Project)
export class ProjectReferenceResolver {
  constructor(private readonly projectsLoader: ProjectsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.projectsLoader.findByIds.load(reference.id);
  }
}
