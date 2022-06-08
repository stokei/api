import { Resolver, ResolveReference } from '@nestjs/graphql';
import { ProjectsMembersLoader } from '@/controllers/graphql/dataloaders/projects-members.loader';
import { ProjectsMember } from '@/controllers/graphql/types/projects-member';

@Resolver(() => ProjectsMember)
export class ProjectsMemberReferenceResolver {
  constructor(private readonly projectsMembersLoader: ProjectsMembersLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.projectsMembersLoader.findByIds.load(reference.id);
  }
}
