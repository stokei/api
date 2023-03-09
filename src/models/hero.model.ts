import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { HeroCreatedEvent } from '@/events/implements/heros/hero-created.event';
import { HeroRemovedEvent } from '@/events/implements/heros/hero-removed.event';
import { HeroUpdatedEvent } from '@/events/implements/heros/hero-updated.event';

export interface IHeroModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly app: string;
  readonly parent: string;
  readonly title?: string;
  readonly titleHighlight?: string;
  readonly subtitle?: string;
  readonly image?: string;
  readonly video?: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class HeroModel extends AggregateRoot {
  readonly id: string;
  readonly app: string;
  readonly parent: string;
  readonly title?: string;
  readonly titleHighlight?: string;
  readonly subtitle?: string;
  readonly image?: string;
  readonly video?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IHeroModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.HEROS,
      id: data._id?.toString() || data.id
    });
    this.app = data.app;
    this.parent = data.parent;
    this.title = data.title;
    this.titleHighlight = data.titleHighlight;
    this.subtitle = data.subtitle;
    this.image = data.image;
    this.video = data.video;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdHero({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new HeroCreatedEvent({
          createdBy,
          hero: this
        })
      );
    }
  }

  updatedHero({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new HeroUpdatedEvent({
          updatedBy,
          hero: this
        })
      );
    }
  }

  removedHero({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new HeroRemovedEvent({
          removedBy,
          hero: this
        })
      );
    }
  }
}
