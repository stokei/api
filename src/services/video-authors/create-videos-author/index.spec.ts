import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateVideoAuthorService } from '.';

describe('CreateVideoAuthorService', () => {
  let createVideoAuthorService: CreateVideoAuthorService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateVideoAuthorService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createVideoAuthorService = modRef.get(CreateVideoAuthorService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createVideoAuthorService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
