import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CourseRemovedEvent } from '@/events/implements/courses/course-removed.event';

@EventsHandler(CourseRemovedEvent)
export class CourseRemovedHandler implements IEventHandler<CourseRemovedEvent> {
  async handle(event: CourseRemovedEvent) {
    const { course } = event;
    Logger.log(`#${course.id} - removed!`, CourseRemovedHandler.name);
    return event;
  }
}
