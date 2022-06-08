import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UpdateCheckoutsCurrencyService } from '.';

describe('UpdateCheckoutsCurrencyService', () => {
  let updateCheckoutsCurrencyService: UpdateCheckoutsCurrencyService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateCheckoutsCurrencyService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateCheckoutsCurrencyService = modRef.get(UpdateCheckoutsCurrencyService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateCheckoutsCurrencyService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
