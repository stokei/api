import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdatePageService } from '.';

describe('UpdatePageService', () => {
  let updatePageService: UpdatePageService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdatePageService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updatePageService = modRef.get(UpdatePageService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updatePageService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
