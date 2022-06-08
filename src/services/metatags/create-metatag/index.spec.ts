import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { CreateMetatagService } from '.';

describe('CreateMetatagService', () => {
  let createMetatagService: CreateMetatagService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateMetatagService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createMetatagService = modRef.get(CreateMetatagService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createMetatagService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
