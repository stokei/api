import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdatePaymentService } from '.';

describe('UpdatePaymentService', () => {
  let updatePaymentService: UpdatePaymentService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdatePaymentService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updatePaymentService = modRef.get(UpdatePaymentService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updatePaymentService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
