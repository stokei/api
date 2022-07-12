import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateVideoAuthorService } from '.';

describe('UpdateVideoAuthorService', () => {
  let updateVideoAuthorService: UpdateVideoAuthorService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateVideoAuthorService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateVideoAuthorService = modRef.get(UpdateVideoAuthorService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateVideoAuthorService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
