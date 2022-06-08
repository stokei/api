import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { CreateSiteService } from '.';

describe('CreateSiteService', () => {
  let createSiteService: CreateSiteService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateSiteService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createSiteService = modRef.get(CreateSiteService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createSiteService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
