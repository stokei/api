import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateColorService } from '.';

describe('UpdateColorService', () => {
  let updateColorService: UpdateColorService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateColorService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateColorService = modRef.get(UpdateColorService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateColorService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
