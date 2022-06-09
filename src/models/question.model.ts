import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { QuestionCreatedEvent } from '@/events/implements/questions/question-created.event';
import { QuestionRemovedEvent } from '@/events/implements/questions/question-removed.event';
import { QuestionUpdatedEvent } from '@/events/implements/questions/question-updated.event';

export interface IQuestionModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class QuestionModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IQuestionModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.QUESTIONS,
      module: ServerStokeiApiIdPrefix.QUESTIONS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdQuestion() {
    if (this.id) {
      this.apply(
        new QuestionCreatedEvent({
          question: this
        })
      );
    }
  }

  updatedQuestion() {
    if (this.id) {
      this.apply(
        new QuestionUpdatedEvent({
          question: this
        })
      );
    }
  }

  removedQuestion() {
    if (this.id) {
      this.apply(
        new QuestionRemovedEvent({
          question: this
        })
      );
    }
  }
}
