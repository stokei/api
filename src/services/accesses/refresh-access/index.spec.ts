import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RefreshAccessService } from '.';

describe('RefreshAccessService', () => {
  let updateAccessService: RefreshAccessService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RefreshAccessService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateAccessService = modRef.get(RefreshAccessService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateAccessService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});