import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { AppInstructorCreatedEvent } from '@/events/implements/app-instructors/app-instructor-created.event';
import { AppInstructorRemovedEvent } from '@/events/implements/app-instructors/app-instructor-removed.event';

export interface IAppInstructorModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly app: string;
  readonly instructor: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class AppInstructorModel extends AggregateRoot {
  readonly id: string;
  readonly app: string;
  readonly instructor: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IAppInstructorModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.APP_INSTRUCTORS,
      module: ServerStokeiApiIdPrefix.APP_INSTRUCTORS,
      id: data._id?.toString() || data.id
    });
    this.app = data.app;
    this.instructor = data.instructor;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdAppInstructor({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new AppInstructorCreatedEvent({
          createdBy,
          appInstructor: this
        })
      );
    }
  }

  removedAppInstructor({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new AppInstructorRemovedEvent({
          removedBy,
          appInstructor: this
        })
      );
    }
  }
}
