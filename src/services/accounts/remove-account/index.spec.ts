import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemoveAccountService } from '.';

describe('RemoveAccountService', () => {
  let removeAccountService: RemoveAccountService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveAccountService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeAccountService = modRef.get(RemoveAccountService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeAccountService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
