import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveCheckoutsCurrencyService } from '.';

describe('RemoveCheckoutsCurrencyService', () => {
  let removeCheckoutsCurrencyService: RemoveCheckoutsCurrencyService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveCheckoutsCurrencyService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeCheckoutsCurrencyService = modRef.get(RemoveCheckoutsCurrencyService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeCheckoutsCurrencyService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
