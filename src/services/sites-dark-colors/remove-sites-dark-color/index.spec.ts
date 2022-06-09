import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveSitesDarkColorService } from '.';

describe('RemoveSitesDarkColorService', () => {
  let removeSitesDarkColorService: RemoveSitesDarkColorService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveSitesDarkColorService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeSitesDarkColorService = modRef.get(RemoveSitesDarkColorService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeSitesDarkColorService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
