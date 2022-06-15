import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { ChangePasswordService } from '.';

describe('ChangePasswordService', () => {
  let updateAccountService: ChangePasswordService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        ChangePasswordService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateAccountService = modRef.get(ChangePasswordService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateAccountService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
