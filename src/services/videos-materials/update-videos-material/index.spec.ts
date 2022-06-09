import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateVideosMaterialService } from '.';

describe('UpdateVideosMaterialService', () => {
  let updateVideosMaterialService: UpdateVideosMaterialService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateVideosMaterialService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateVideosMaterialService = modRef.get(UpdateVideosMaterialService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateVideosMaterialService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
