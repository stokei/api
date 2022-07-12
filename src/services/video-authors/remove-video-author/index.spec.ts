import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveVideoAuthorService } from '.';

describe('RemoveVideoAuthorService', () => {
  let removeVideoAuthorService: RemoveVideoAuthorService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveVideoAuthorService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeVideoAuthorService = modRef.get(RemoveVideoAuthorService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeVideoAuthorService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
