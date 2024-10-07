import { v1 } from '@goup/service-protobuf';
import { Paginate } from './paginate';

describe('Paginate', () => {
  let paginateService: Paginate;
  let mockQuery: any;

  beforeEach(() => {
    paginateService = new Paginate('ModelName');
    mockQuery = {
      where: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
    };
  });

  it('should apply default pagination when no paging options are provided', () => {
    const paging: v1.Paging = {};
    paginateService.applyPagination(mockQuery, paging);
    expect(mockQuery.limit).toHaveBeenCalledWith(20);
  });

  it('should apply cursor pagination when lastId is provided', () => {
    const paging: v1.Paging = { lastId: '123' };
    paginateService.applyPagination(mockQuery, paging);
    expect(mockQuery.where).toHaveBeenCalledWith({ _id: { $gt: '123' } });
    expect(mockQuery.limit).toHaveBeenCalledWith(20);
  });

  it('should apply skip-limit pagination when pageNumber is provided', () => {
    const paging: v1.Paging = { pageNumber: 2 };
    paginateService.applyPagination(mockQuery, paging);
    expect(mockQuery.skip).toHaveBeenCalledWith(20);
    expect(mockQuery.limit).toHaveBeenCalledWith(20);
  });

  it('should throw an error when both lastId and pageNumber are provided', () => {
    const paging: v1.Paging = { lastId: '123', pageNumber: 2 };
    expect(() => paginateService.applyPagination(mockQuery, paging)).toThrow(
      'Cannot use both skip limit paging and cursor-based paging.'
    );
  });

  it('should use custom page size when provided', () => {
    const paging: v1.Paging = { pageSize: 50 };
    paginateService.applyPagination(mockQuery, paging);
    expect(mockQuery.limit).toHaveBeenCalledWith(50);
  });

  it('should throw an error when page size is less than 1', () => {
    const paging: v1.Paging = { pageSize: 0 };
    expect(() => paginateService.applyPagination(mockQuery, paging)).toThrow('Page size must be greater than 0.');
  });

  it('should throw an error when page size exceeds max page size', () => {
    const paging: v1.Paging = { pageSize: 201 };
    expect(() => paginateService.applyPagination(mockQuery, paging)).toThrow(
      'Page size cannot exceed 200. Received: 201.'
    );
  });

  it('should throw an error when page number is less than 1', () => {
    const paging: v1.Paging = { pageNumber: 0, pageSize: 20 };
    expect(() => paginateService.applyPagination(mockQuery, paging)).toThrow('Page number must be greater than 0.');
  });

  it('should throw an error when lastId is invalid', () => {
    const paging: v1.Paging = { lastId: null };
    expect(() => paginateService.applyPagination(mockQuery, paging)).toThrow('Invalid lastId provided.');
  });

  it('should use custom max page size when provided', () => {
    paginateService = new Paginate('ModelName', { maxPageSize: 300 });
    const paging: v1.Paging = { pageSize: 250 };
    paginateService.applyPagination(mockQuery, paging);
    expect(mockQuery.limit).toHaveBeenCalledWith(250);
  });

  it('should use custom default page size when provided', () => {
    paginateService = new Paginate('ModelName', { defaultPageSize: 30 });
    const paging: v1.Paging = {};
    paginateService.applyPagination(mockQuery, paging);
    expect(mockQuery.limit).toHaveBeenCalledWith(30);
  });
});
