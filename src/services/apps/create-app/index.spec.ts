import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateAppService } from '.';

describe('CreateAppService', () => {
  let createAppService: CreateAppService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateAppService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createAppService = modRef.get(CreateAppService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createAppService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
