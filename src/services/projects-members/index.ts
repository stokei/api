import { CreateProjectsMemberService } from './create-projects-member';
import { FindAllProjectsMembersService } from './find-all-projects-members';
import { FindProjectsMemberByIdService } from './find-projects-member-by-id';
import { RemoveProjectsMemberService } from './remove-projects-member';
import { UpdateProjectsMemberService } from './update-projects-member';

export const ProjectsMemberServices = [
  CreateProjectsMemberService,
  RemoveProjectsMemberService,
  UpdateProjectsMemberService,
  FindProjectsMemberByIdService,
  FindAllProjectsMembersService
];
