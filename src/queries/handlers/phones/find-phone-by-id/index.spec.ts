import { FindPhoneByIdRepository } from '@/repositories/phones/find-phone-by-id';
import { Test } from '@nestjs/testing';
import { FindPhoneByIdQueryHandler } from '.';

describe('FindPhoneByIdQueryHandler', () => {
  let findPhoneByIdRepository: FindPhoneByIdRepository;
  let findPhoneByIdQueryHandler: FindPhoneByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindPhoneByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindPhoneByIdQueryHandler
      ]
    }).compile();

    findPhoneByIdRepository = moduleRef.get(FindPhoneByIdRepository);
    findPhoneByIdQueryHandler = moduleRef.get(FindPhoneByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findPhoneByIdQueryHandler).toBeDefined();
    expect(findPhoneByIdRepository).toBeDefined();
  });
});
