import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateSitesDarkColorService } from '.';

describe('UpdateSitesDarkColorService', () => {
  let updateSitesDarkColorService: UpdateSitesDarkColorService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateSitesDarkColorService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateSitesDarkColorService = modRef.get(UpdateSitesDarkColorService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateSitesDarkColorService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
