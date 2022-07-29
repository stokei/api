import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateSubscriptionContractService } from '.';

describe('UpdateSubscriptionContractService', () => {
  let updateSubscriptionContractService: UpdateSubscriptionContractService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateSubscriptionContractService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateSubscriptionContractService = modRef.get(
      UpdateSubscriptionContractService
    );
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateSubscriptionContractService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
