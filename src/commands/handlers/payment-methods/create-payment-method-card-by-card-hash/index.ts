import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreatePaymentMethodCardByCardHashCommand } from '@/commands/implements/payment-methods/create-payment-method-card-by-card-hash.command';
import { PaymentMethodType } from '@/enums/payment-method-type.enum';
import {
  AddressNotFoundException,
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PaymentMethodNotFoundException
} from '@/errors';
import { PaymentMethodModel } from '@/models/payment-method.model';
import { CreatePaymentMethodCardRepository } from '@/repositories/payment-methods/create-payment-method-card';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { FindAddressByIdService } from '@/services/addresses/find-address-by-id';
import { CreatePagarmeCardService } from '@/services/pagarme/create-pagarme-card';
import { FindAllPaymentMethodsService } from '@/services/payment-methods/find-all-payment-methods';

type CreatePaymentMethodCardByCardHashCommandKeys =
  keyof CreatePaymentMethodCardByCardHashCommand;

@CommandHandler(CreatePaymentMethodCardByCardHashCommand)
export class CreatePaymentMethodCardByCardHashCommandHandler
  implements ICommandHandler<CreatePaymentMethodCardByCardHashCommand>
{
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService,
    private readonly findAddressByIdService: FindAddressByIdService,
    private readonly createPaymentMethodRepository: CreatePaymentMethodCardRepository,
    private readonly createPagarmeCardService: CreatePagarmeCardService,
    private readonly findAllPaymentMethodsService: FindAllPaymentMethodsService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreatePaymentMethodCardByCardHashCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreatePaymentMethodCardByCardHashCommandKeys>(
        'parent'
      );
    }
    if (!data?.app) {
      throw new ParamNotFoundException<CreatePaymentMethodCardByCardHashCommandKeys>(
        'app'
      );
    }
    if (!data?.cardHash) {
      throw new ParamNotFoundException<CreatePaymentMethodCardByCardHashCommandKeys>(
        'cardHash'
      );
    }
    if (!data?.address) {
      throw new ParamNotFoundException<CreatePaymentMethodCardByCardHashCommandKeys>(
        'address'
      );
    }

    const account = await this.findAccountByIdService.execute(data.parent);
    if (!account) {
      throw new AppNotFoundException();
    }

    const address = await this.findAddressByIdService.execute(data.address);
    if (!address) {
      throw new AddressNotFoundException();
    }

    const cardPagarme = await this.createPagarmeCardService.execute({
      cardHash: data?.cardHash,
      address,
      customer: account.pagarmeCustomer
    });
    if (!cardPagarme) {
      throw new PaymentMethodNotFoundException();
    }

    let paymentMethod: PaymentMethodModel;
    const paymentMethods = await this.findAllPaymentMethodsService.execute({
      where: {
        AND: {
          paymentMethodType: PaymentMethodType.CARD,
          parent: {
            equals: data.parent
          },
          app: {
            equals: data.app
          },
          referenceId: {
            equals: cardPagarme.id
          }
        }
      }
    });
    if (paymentMethods?.items?.length) {
      paymentMethod = paymentMethods?.items?.[0];
      if (paymentMethod) {
        return paymentMethod;
      }
    }

    const paymentMethodCreated =
      await this.createPaymentMethodRepository.execute({
        parent: data.parent,
        createdBy: data.createdBy,
        app: data.app,
        referenceId: cardPagarme.id,
        lastFourCardNumber: cardPagarme.lastFourNumber,
        cardBrand: cardPagarme.brand,
        cardExpiryMonth: cardPagarme.expiryMonth,
        cardExpiryYear: cardPagarme.expiryYear,
        paymentMethodType: PaymentMethodType.CARD
      });
    if (!paymentMethodCreated) {
      throw new PaymentMethodNotFoundException();
    }

    const paymentMethodModel =
      this.publisher.mergeObjectContext(paymentMethodCreated);
    paymentMethodModel.createdPaymentMethod({
      createdBy: data.createdBy
    });
    paymentMethodModel.commit();
    return paymentMethodCreated;
  }

  private clearData(
    command: CreatePaymentMethodCardByCardHashCommand
  ): CreatePaymentMethodCardByCardHashCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      parent: cleanValue(command?.parent),
      cardHash: cleanValue(command?.cardHash),
      address: cleanValue(command?.address)
    });
  }
}
