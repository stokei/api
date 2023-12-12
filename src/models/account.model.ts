import { AggregateRoot } from '@nestjs/cqrs';
import {
  cleanValue,
  convertToISODateString,
  createServiceId
} from '@stokei/nestjs';
import { Exclude } from 'class-transformer';

import { AccountStatus } from '@/enums/account-status.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { AccountCreatedEvent } from '@/events/implements/accounts/account-created.event';
import { AccountRemovedEvent } from '@/events/implements/accounts/account-removed.event';
import { AccountUpdatedEvent } from '@/events/implements/accounts/account-updated.event';
import { PasswordChangedEvent } from '@/events/implements/accounts/password-changed.event';
import { PasswordForgottenEvent } from '@/events/implements/accounts/password-forgotten.event';
import { UpdateOwnPasswordCreatedEvent } from '@/events/implements/accounts/update-own-password-created.event';

export interface IAccountModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly email: string;
  readonly username: string;
  readonly password: string;
  readonly lastPassword?: string;
  readonly avatar?: string;
  readonly active: boolean;
  readonly forgotPasswordCode?: string;
  readonly dateBirthday?: Date | string;
  readonly status: AccountStatus;
  readonly canceledAt?: Date | string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly app: string;
  readonly stripeCustomer?: string;
  readonly pagarmeCustomer?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class AccountModel extends AggregateRoot {
  readonly id: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly fullname: string;
  readonly email: string;
  readonly username: string;
  @Exclude()
  readonly password: string;
  @Exclude()
  readonly lastPassword?: string;

  readonly avatar?: string;
  @Exclude()
  readonly forgotPasswordCode?: string;
  readonly dateBirthday?: string;
  readonly status: AccountStatus;
  readonly active: boolean;
  readonly canceledAt?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly app: string;
  readonly stripeCustomer?: string;
  readonly pagarmeCustomer?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  readonly isStokei: boolean;

  constructor(data: IAccountModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.ACCOUNTS,
      id: data._id?.toString() || data.id
    });
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.fullname = cleanValue(`${data.firstname} ${data.lastname}`);
    this.email = data.email;
    this.username = data.username;
    this.password = data.password;
    this.lastPassword = data.lastPassword;
    this.avatar = data.avatar;
    this.forgotPasswordCode = data.forgotPasswordCode;
    this.dateBirthday = convertToISODateString(data.dateBirthday);
    this.status = data.status || AccountStatus.ACTIVE;
    this.active = this.status === AccountStatus.ACTIVE || data.active;
    this.canceledAt = convertToISODateString(data.canceledAt);
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.app = data.app;
    this.stripeCustomer = data.stripeCustomer;
    this.pagarmeCustomer = data.pagarmeCustomer;
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
    this.isStokei = !!this.app.match(/stokei/i);
  }

  createdAccount({
    createdBy,
    plainTextPassword
  }: {
    createdBy: string;
    plainTextPassword?: string;
  }) {
    if (this.id) {
      this.apply(
        new AccountCreatedEvent({
          createdBy,
          plainTextPassword,
          account: this
        })
      );
    }
  }

  updatedAccount({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new AccountUpdatedEvent({
          updatedBy,
          account: this
        })
      );
    }
  }

  removedAccount({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new AccountRemovedEvent({
          removedBy,
          account: this
        })
      );
    }
  }

  changedPassword() {
    if (this.id && this.email) {
      this.apply(
        new PasswordChangedEvent({
          account: this
        })
      );
    }
  }

  forgottenPassword() {
    if (this.id && this.email) {
      this.apply(
        new PasswordForgottenEvent({
          account: this
        })
      );
    }
  }

  updatedOwnPasswordCreated() {
    if (this.id && this.email) {
      this.apply(
        new UpdateOwnPasswordCreatedEvent({
          account: this
        })
      );
    }
  }
}
