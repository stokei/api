import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveSitesLightColorService } from '.';

describe('RemoveSitesLightColorService', () => {
  let removeSitesLightColorService: RemoveSitesLightColorService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveSitesLightColorService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeSitesLightColorService = modRef.get(RemoveSitesLightColorService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeSitesLightColorService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
