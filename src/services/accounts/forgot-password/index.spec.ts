import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { ForgotPasswordService } from '.';

describe('ForgotPasswordService', () => {
  let updateAccountService: ForgotPasswordService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        ForgotPasswordService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateAccountService = modRef.get(ForgotPasswordService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateAccountService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
