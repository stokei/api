import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateCartService } from '.';

describe('UpdateCartService', () => {
  let updateCartService: UpdateCartService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateCartService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateCartService = modRef.get(UpdateCartService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateCartService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
