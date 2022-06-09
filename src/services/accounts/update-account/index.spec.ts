import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateAccountService } from '.';

describe('UpdateAccountService', () => {
  let updateAccountService: UpdateAccountService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateAccountService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateAccountService = modRef.get(UpdateAccountService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateAccountService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
