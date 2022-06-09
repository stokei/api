import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateVideosMaterialService } from '.';

describe('CreateVideosMaterialService', () => {
  let createVideosMaterialService: CreateVideosMaterialService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateVideosMaterialService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createVideosMaterialService = modRef.get(CreateVideosMaterialService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createVideosMaterialService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
