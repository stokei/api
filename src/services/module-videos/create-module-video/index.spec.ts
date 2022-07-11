import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateModuleVideoService } from '.';

describe('CreateModuleVideoService', () => {
  let createModuleVideoService: CreateModuleVideoService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateModuleVideoService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createModuleVideoService = modRef.get(CreateModuleVideoService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createModuleVideoService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
