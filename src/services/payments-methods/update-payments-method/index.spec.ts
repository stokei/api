import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UpdatePaymentsMethodService } from '.';

describe('UpdatePaymentsMethodService', () => {
  let updatePaymentsMethodService: UpdatePaymentsMethodService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdatePaymentsMethodService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updatePaymentsMethodService = modRef.get(UpdatePaymentsMethodService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updatePaymentsMethodService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
