import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveCartService } from '.';

describe('RemoveCartService', () => {
  let removeCartService: RemoveCartService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveCartService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeCartService = modRef.get(RemoveCartService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeCartService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
