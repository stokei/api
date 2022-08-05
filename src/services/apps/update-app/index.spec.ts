import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateAppService } from '.';

describe('UpdateAppService', () => {
  let updateAppService: UpdateAppService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateAppService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateAppService = modRef.get(UpdateAppService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateAppService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});