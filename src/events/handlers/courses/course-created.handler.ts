import { CourseCreatedEvent } from '@/events/implements/courses/course-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(CourseCreatedEvent)
export class CourseCreatedHandler implements IEventHandler<CourseCreatedEvent> {
  async handle(event: CourseCreatedEvent) {
    const { course } = event;
    Logger.log(`#${course.id} - created!`, CourseCreatedHandler.name);
    return event;
  }
}
