import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveCheckoutService } from '.';

describe('RemoveCheckoutService', () => {
  let removeCheckoutService: RemoveCheckoutService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveCheckoutService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeCheckoutService = modRef.get(RemoveCheckoutService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeCheckoutService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
