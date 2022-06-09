import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveDomainService } from '.';

describe('RemoveDomainService', () => {
  let removeDomainService: RemoveDomainService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveDomainService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeDomainService = modRef.get(RemoveDomainService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeDomainService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
