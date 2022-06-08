import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateClassroomsAdminCommand } from '@/commands/implements/classrooms-admins/update-classrooms-admin.command';
import {
  ClassroomsAdminNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindClassroomsAdminByIdRepository } from '@/repositories/classrooms-admins/find-classrooms-admin-by-id';
import { UpdateClassroomsAdminRepository } from '@/repositories/classrooms-admins/update-classrooms-admin';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type UpdateClassroomsAdminCommandKeys = keyof UpdateClassroomsAdminCommand;

@CommandHandler(UpdateClassroomsAdminCommand)
export class UpdateClassroomsAdminCommandHandler
  implements ICommandHandler<UpdateClassroomsAdminCommand>
{
  constructor(
    private readonly findClassroomsAdminByIdRepository: FindClassroomsAdminByIdRepository,
    private readonly updateClassroomsAdminRepository: UpdateClassroomsAdminRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateClassroomsAdminCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const classroomsAdminId = splitServiceId(data.where?.classroomsAdminId)?.id;
    if (!classroomsAdminId) {
      throw new ParamNotFoundException('classroomsAdminId');
    }

    const classroomsAdmin =
      await this.findClassroomsAdminByIdRepository.execute(classroomsAdminId);
    if (!classroomsAdmin) {
      throw new ClassroomsAdminNotFoundException();
    }

    const updated = await this.updateClassroomsAdminRepository.execute({
      ...data,
      where: {
        ...data.where,
        classroomsAdminId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const classroomsAdminUpdated =
      await this.findClassroomsAdminByIdRepository.execute(classroomsAdminId);
    if (!classroomsAdminUpdated) {
      throw new ClassroomsAdminNotFoundException();
    }
    const classroomsAdminModel = this.publisher.mergeObjectContext(
      classroomsAdminUpdated
    );
    classroomsAdminModel.updatedClassroomsAdmin();
    classroomsAdminModel.commit();

    return classroomsAdminUpdated;
  }

  private clearData(
    command: UpdateClassroomsAdminCommand
  ): UpdateClassroomsAdminCommand {
    return cleanObject({
      where: cleanObject({
        classroomsAdminId: cleanValue(command?.where?.classroomsAdminId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
