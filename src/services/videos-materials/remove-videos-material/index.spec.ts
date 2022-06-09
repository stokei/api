import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveVideosMaterialService } from '.';

describe('RemoveVideosMaterialService', () => {
  let removeVideosMaterialService: RemoveVideosMaterialService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveVideosMaterialService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeVideosMaterialService = modRef.get(RemoveVideosMaterialService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeVideosMaterialService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
