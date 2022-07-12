import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveCartItemService } from '.';

describe('RemoveCartItemService', () => {
  let removeCartItemService: RemoveCartItemService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveCartItemService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeCartItemService = modRef.get(RemoveCartItemService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeCartItemService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
