import { FindColorByIdRepository } from '@/repositories/colors/find-color-by-id';
import { Test } from '@nestjs/testing';
import { FindColorByIdQueryHandler } from '.';

describe('FindColorByIdQueryHandler', () => {
  let findColorByIdRepository: FindColorByIdRepository;
  let findColorByIdQueryHandler: FindColorByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindColorByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindColorByIdQueryHandler
      ]
    }).compile();

    findColorByIdRepository = moduleRef.get(FindColorByIdRepository);
    findColorByIdQueryHandler = moduleRef.get(FindColorByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findColorByIdQueryHandler).toBeDefined();
    expect(findColorByIdRepository).toBeDefined();
  });
});
