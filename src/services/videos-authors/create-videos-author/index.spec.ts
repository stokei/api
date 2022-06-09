import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateVideosAuthorService } from '.';

describe('CreateVideosAuthorService', () => {
  let createVideosAuthorService: CreateVideosAuthorService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateVideosAuthorService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createVideosAuthorService = modRef.get(CreateVideosAuthorService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createVideosAuthorService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
