import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { CardCreatedEvent } from '@/events/implements/cards/card-created.event';
import { CardUpdatedEvent } from '@/events/implements/cards/card-updated.event';
import { CardRemovedEvent } from '@/events/implements/cards/card-removed.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

export interface ICardModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class CardModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: ICardModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.CARDS,
      module: ServerStokeiApiIdPrefix.CARDS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdCard() {
    if (this.id) {
      this.apply(
        new CardCreatedEvent({
          card: this
        })
      );
    }
  }

  updatedCard() {
    if (this.id) {
      this.apply(
        new CardUpdatedEvent({
          card: this
        })
      );
    }
  }

  removedCard() {
    if (this.id) {
      this.apply(
        new CardRemovedEvent({
          card: this
        })
      );
    }
  }
}
