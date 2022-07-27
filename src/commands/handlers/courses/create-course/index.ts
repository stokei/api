import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateCourseCommand } from '@/commands/implements/courses/create-course.command';
import {
  CourseNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateCourseRepository } from '@/repositories/courses/create-course';

type CreateCourseCommandKeys = keyof CreateCourseCommand;

@CommandHandler(CreateCourseCommand)
export class CreateCourseCommandHandler
  implements ICommandHandler<CreateCourseCommand>
{
  constructor(
    private readonly createCourseRepository: CreateCourseRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateCourseCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateCourseCommandKeys>('parent');
    }

    const courseCreated = await this.createCourseRepository.execute(data);
    if (!courseCreated) {
      throw new CourseNotFoundException();
    }
    const courseModel = this.publisher.mergeObjectContext(courseCreated);
    courseModel.createdCourse({
      createdBy: data.createdBy
    });
    courseModel.commit();

    return courseCreated;
  }

  private clearData(command: CreateCourseCommand): CreateCourseCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      name: cleanValue(command?.name),
      description: cleanValue(command?.description),
      avatar: cleanValue(command?.avatar),
      parent: cleanValue(command?.parent)
    });
  }
}
