import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateDomainService } from '.';

describe('UpdateDomainService', () => {
  let updateDomainService: UpdateDomainService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateDomainService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateDomainService = modRef.get(UpdateDomainService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateDomainService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
