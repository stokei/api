import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCoursesAdminCommand } from '@/commands/implements/courses-admins/update-courses-admin.command';
import {
  CoursesAdminNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindCoursesAdminByIdRepository } from '@/repositories/courses-admins/find-courses-admin-by-id';
import { UpdateCoursesAdminRepository } from '@/repositories/courses-admins/update-courses-admin';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type UpdateCoursesAdminCommandKeys = keyof UpdateCoursesAdminCommand;

@CommandHandler(UpdateCoursesAdminCommand)
export class UpdateCoursesAdminCommandHandler
  implements ICommandHandler<UpdateCoursesAdminCommand>
{
  constructor(
    private readonly findCoursesAdminByIdRepository: FindCoursesAdminByIdRepository,
    private readonly updateCoursesAdminRepository: UpdateCoursesAdminRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateCoursesAdminCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const coursesAdminId = splitServiceId(data.where?.coursesAdminId)?.id;
    if (!coursesAdminId) {
      throw new ParamNotFoundException('coursesAdminId');
    }

    const coursesAdmin = await this.findCoursesAdminByIdRepository.execute(
      coursesAdminId
    );
    if (!coursesAdmin) {
      throw new CoursesAdminNotFoundException();
    }

    const updated = await this.updateCoursesAdminRepository.execute({
      ...data,
      where: {
        ...data.where,
        coursesAdminId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const coursesAdminUpdated =
      await this.findCoursesAdminByIdRepository.execute(coursesAdminId);
    if (!coursesAdminUpdated) {
      throw new CoursesAdminNotFoundException();
    }
    const coursesAdminModel =
      this.publisher.mergeObjectContext(coursesAdminUpdated);
    coursesAdminModel.updatedCoursesAdmin();
    coursesAdminModel.commit();

    return coursesAdminUpdated;
  }

  private clearData(
    command: UpdateCoursesAdminCommand
  ): UpdateCoursesAdminCommand {
    return cleanObject({
      where: cleanObject({
        coursesAdminId: cleanValue(command?.where?.coursesAdminId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
