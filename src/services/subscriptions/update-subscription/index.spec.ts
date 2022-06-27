import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateSubscriptionService } from '.';

describe('UpdateSubscriptionService', () => {
  let updateSubscriptionService: UpdateSubscriptionService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateSubscriptionService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateSubscriptionService = modRef.get(UpdateSubscriptionService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateSubscriptionService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
