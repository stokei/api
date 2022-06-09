import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveTagService } from '.';

describe('RemoveTagService', () => {
  let removeTagService: RemoveTagService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveTagService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeTagService = modRef.get(RemoveTagService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeTagService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
