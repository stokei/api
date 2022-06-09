import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateCheckoutService } from '.';

describe('UpdateCheckoutService', () => {
  let updateCheckoutService: UpdateCheckoutService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateCheckoutService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateCheckoutService = modRef.get(UpdateCheckoutService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateCheckoutService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
