import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { LanguageCreatedEvent } from '@/events/implements/languages/language-created.event';
import { LanguageRemovedEvent } from '@/events/implements/languages/language-removed.event';
import { LanguageUpdatedEvent } from '@/events/implements/languages/language-updated.event';

export interface ILanguageModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly name: string;
  readonly icon?: string;
  readonly active: boolean;
  readonly activatedAt?: Date | string;
  readonly deactivatedAt?: Date | string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class LanguageModel extends AggregateRoot {
  readonly id: string;
  readonly name: string;
  readonly icon?: string;
  readonly active: boolean;
  readonly activatedAt?: string;
  readonly deactivatedAt?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: ILanguageModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.LANGUAGES,
      module: ServerStokeiApiIdPrefix.LANGUAGES,
      id: data._id?.toString() || data.id
    });
    this.name = data.name;
    this.icon = data.icon;
    this.active = data.active;
    this.activatedAt = convertToISODateString(data.activatedAt);
    this.deactivatedAt = convertToISODateString(data.deactivatedAt);
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdLanguage({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new LanguageCreatedEvent({
          createdBy,
          language: this
        })
      );
    }
  }

  updatedLanguage({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new LanguageUpdatedEvent({
          updatedBy,
          language: this
        })
      );
    }
  }

  removedLanguage({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new LanguageRemovedEvent({
          removedBy,
          language: this
        })
      );
    }
  }
}
