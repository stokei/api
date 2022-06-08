import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { LanguageCreatedEvent } from '@/events/implements/languages/language-created.event';
import { LanguageUpdatedEvent } from '@/events/implements/languages/language-updated.event';
import { LanguageRemovedEvent } from '@/events/implements/languages/language-removed.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

export interface ILanguageModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class LanguageModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: ILanguageModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.LANGUAGES,
      module: ServerStokeiApiIdPrefix.LANGUAGES,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdLanguage() {
    if (this.id) {
      this.apply(
        new LanguageCreatedEvent({
          language: this
        })
      );
    }
  }

  updatedLanguage() {
    if (this.id) {
      this.apply(
        new LanguageUpdatedEvent({
          language: this
        })
      );
    }
  }

  removedLanguage() {
    if (this.id) {
      this.apply(
        new LanguageRemovedEvent({
          language: this
        })
      );
    }
  }
}
