import { Args, Query, Resolver } from '@nestjs/graphql';
import { ClassroomsAdminsLoader } from '@/controllers/graphql/dataloaders/classrooms-admins.loader';
import { ClassroomsAdmin } from '@/controllers/graphql/types/classrooms-admin';
import {
  ClassroomsAdminNotFoundException,
  ParamNotFoundException
} from '@/errors';

@Resolver(() => ClassroomsAdmin)
export class ClassroomsAdminResolver {
  constructor(
    private readonly classroomsAdminsLoader: ClassroomsAdminsLoader
  ) {}

  @Query(() => ClassroomsAdmin)
  async classroomsAdmin(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const classroomsAdmin = await this.classroomsAdminsLoader.findByIds.load(
      id
    );
    if (!classroomsAdmin) {
      throw new ClassroomsAdminNotFoundException();
    }
    return classroomsAdmin;
  }
}
