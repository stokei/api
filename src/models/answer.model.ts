import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { AnswerCreatedEvent } from '@/events/implements/answers/answer-created.event';
import { AnswerRemovedEvent } from '@/events/implements/answers/answer-removed.event';
import { AnswerUpdatedEvent } from '@/events/implements/answers/answer-updated.event';

export interface IAnswerModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class AnswerModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IAnswerModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.ANSWERS,
      module: ServerStokeiApiIdPrefix.ANSWERS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdAnswer() {
    if (this.id) {
      this.apply(
        new AnswerCreatedEvent({
          answer: this
        })
      );
    }
  }

  updatedAnswer() {
    if (this.id) {
      this.apply(
        new AnswerUpdatedEvent({
          answer: this
        })
      );
    }
  }

  removedAnswer() {
    if (this.id) {
      this.apply(
        new AnswerRemovedEvent({
          answer: this
        })
      );
    }
  }
}
