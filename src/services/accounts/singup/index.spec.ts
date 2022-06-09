import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { SignUpService } from '.';

describe('SignUpService', () => {
  let createAccountService: SignUpService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        SignUpService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createAccountService = modRef.get(SignUpService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createAccountService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
