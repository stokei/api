import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemovePaymentsMethodService } from '.';

describe('RemovePaymentsMethodService', () => {
  let removePaymentsMethodService: RemovePaymentsMethodService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemovePaymentsMethodService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removePaymentsMethodService = modRef.get(RemovePaymentsMethodService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removePaymentsMethodService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
