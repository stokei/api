import { Resolver, ResolveReference } from '@nestjs/graphql';
import { ProjectsPlansLoader } from '@/controllers/graphql/dataloaders/projects-plans.loader';
import { ProjectsPlan } from '@/controllers/graphql/types/projects-plan';

@Resolver(() => ProjectsPlan)
export class ProjectsPlanReferenceResolver {
  constructor(private readonly projectsPlansLoader: ProjectsPlansLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.projectsPlansLoader.findByIds.load(reference.id);
  }
}
