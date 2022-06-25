import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { CardBrand } from '@/enums/card-brand.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { CardCreatedEvent } from '@/events/implements/cards/card-created.event';
import { CardRemovedEvent } from '@/events/implements/cards/card-removed.event';
import { CardUpdatedEvent } from '@/events/implements/cards/card-updated.event';

export interface ICardModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly externalCardId: string;
  readonly lastFourNumber: string;
  readonly brand: CardBrand;
  readonly default: boolean;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
}

export class CardModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly externalCardId: string;
  readonly lastFourNumber: string;
  readonly brand: CardBrand;
  readonly default: boolean;
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
    this.externalCardId = data.externalCardId;
    this.lastFourNumber = data.lastFourNumber;
    this.brand = data.brand;
    this.default = data.default;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
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
