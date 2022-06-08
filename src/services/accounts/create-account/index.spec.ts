import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { CreateAccountService } from '.';

describe('CreateAccountService', () => {
  let createAccountService: CreateAccountService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateAccountService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createAccountService = modRef.get(CreateAccountService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createAccountService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
