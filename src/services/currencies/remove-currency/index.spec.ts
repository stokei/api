import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveCurrencyService } from '.';

describe('RemoveCurrencyService', () => {
  let removeCurrencyService: RemoveCurrencyService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveCurrencyService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeCurrencyService = modRef.get(RemoveCurrencyService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeCurrencyService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
