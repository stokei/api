import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateSubscriptionService } from '.';

describe('CreateSubscriptionService', () => {
  let createSubscriptionService: CreateSubscriptionService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateSubscriptionService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createSubscriptionService = modRef.get(CreateSubscriptionService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createSubscriptionService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
