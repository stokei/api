import { CourseRemovedEvent } from '@/events/implements/courses/course-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(CourseRemovedEvent)
export class CourseRemovedHandler implements IEventHandler<CourseRemovedEvent> {
  async handle(event: CourseRemovedEvent) {
    const { course } = event;
    Logger.log(`#${course.id} - removed!`, CourseRemovedHandler.name);
    return event;
  }
}
