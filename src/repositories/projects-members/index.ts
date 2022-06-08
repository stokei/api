import { CountProjectsMembersRepository } from './count-projects-members';
import { CreateProjectsMemberRepository } from './create-projects-member';
import { ExistsProjectsMembersRepository } from './exists-projects-members';
import { FindProjectsMemberByIdRepository } from './find-projects-member-by-id';
import { FindAllProjectsMembersRepository } from './find-all-projects-members';
import { RemoveProjectsMemberRepository } from './remove-projects-member';
import { UpdateProjectsMemberRepository } from './update-projects-member';

export const ProjectsMembersRepositories = [
  CountProjectsMembersRepository,
  CreateProjectsMemberRepository,
  ExistsProjectsMembersRepository,
  FindProjectsMemberByIdRepository,
  FindAllProjectsMembersRepository,
  RemoveProjectsMemberRepository,
  UpdateProjectsMemberRepository
];
