import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveVideoService } from '.';

describe('RemoveVideoService', () => {
  let removeVideoService: RemoveVideoService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveVideoService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeVideoService = modRef.get(RemoveVideoService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeVideoService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
