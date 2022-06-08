import { CourseUpdatedEvent } from '@/events/implements/courses/course-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(CourseUpdatedEvent)
export class CourseUpdatedHandler implements IEventHandler<CourseUpdatedEvent> {
  async handle(event: CourseUpdatedEvent) {
    const { course } = event;
    Logger.log(`#${course.id} - updated!`, CourseUpdatedHandler.name);
    return event;
  }
}
