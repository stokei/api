import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateClassroomStudentCommand } from '@/commands/implements/classroom-students/create-classroom-student.command';
import {
  ClassroomStudentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateClassroomStudentRepository } from '@/repositories/classroom-students/create-classroom-student';

type CreateClassroomStudentCommandKeys = keyof CreateClassroomStudentCommand;

@CommandHandler(CreateClassroomStudentCommand)
export class CreateClassroomStudentCommandHandler
  implements ICommandHandler<CreateClassroomStudentCommand>
{
  constructor(
    private readonly createClassroomStudentRepository: CreateClassroomStudentRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateClassroomStudentCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.classroom) {
      throw new ParamNotFoundException<CreateClassroomStudentCommandKeys>(
        'classroom'
      );
    }
    if (!data?.student) {
      throw new ParamNotFoundException<CreateClassroomStudentCommandKeys>(
        'student'
      );
    }

    const classroomStudentCreated =
      await this.createClassroomStudentRepository.execute(data);
    if (!classroomStudentCreated) {
      throw new ClassroomStudentNotFoundException();
    }
    const classroomStudentModel = this.publisher.mergeObjectContext(
      classroomStudentCreated
    );
    classroomStudentModel.createdClassroomStudent({
      createdBy: data.createdBy
    });
    classroomStudentModel.commit();

    return classroomStudentCreated;
  }

  private clearData(
    command: CreateClassroomStudentCommand
  ): CreateClassroomStudentCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      student: cleanValue(command?.student),
      classroom: cleanValue(command?.classroom)
    });
  }
}
