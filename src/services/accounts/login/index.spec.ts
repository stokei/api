import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { LoginService } from '.';

describe('LoginService', () => {
  let loginService: LoginService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        LoginService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    loginService = modRef.get(LoginService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(loginService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
