import { v1 } from '@goup/service-protobuf';
import { EliteLogger } from '@goup/service-logger';
import { Sorting } from './sorting';

/**
 * The `Paginate` class provides methods to apply pagination to database queries.
 * It supports both cursor-based and skip-limit pagination strategies.
 *
 * @remarks
 * - Cursor-based pagination uses a unique identifier (`lastId`) to fetch the next set of results.
 * - Skip-limit pagination uses a page number (`pageNumber`) to fetch results.
 * - Default pagination applies a limit to the number of results returned.
 *
 * @example
 * ```typescript
 * const paginator = new Paginate({ maxPageSize: 100, defaultPageSize: 10 });
 * const query = someDatabaseQuery();
 * const pagingOptions = { pageNumber: 2, pageSize: 5 };
 * const paginatedQuery = paginator.applyPagination(query, pagingOptions);
 * ```
 *
 * @public
 */
export class Paginate {
  private logger: EliteLogger;

  /**
   * The default maximum number of items that can be returned in a single page of results.
   * This value is used to limit the size of paginated responses to prevent excessive data load.
   */
  private static readonly DEFAULT_MAX_PAGE_SIZE = 200;
  /**
   * The default number of items to be displayed per page in pagination.
   * This value is used when no specific page size is provided.
   */
  private static readonly DEFAULT_PAGE_SIZE = 20;

  /**
   * Constructs a new instance of the Paginate class.
   *
   * @param options - Optional configuration for pagination.
   * @param options.maxPageSize - The maximum number of items per page. Defaults to `Paginate.DEFAULT_MAX_PAGE_SIZE` if not provided.
   * @param options.defaultPageSize - The default number of items per page. Defaults to `Paginate.DEFAULT_PAGE_SIZE` if not provided.
   */
  constructor(modelName: string, private options?: { maxPageSize?: number; defaultPageSize?: number }) {
    this.logger = new EliteLogger(Sorting.name + ':' + modelName);
    this.options = {
      maxPageSize: options?.maxPageSize || Paginate.DEFAULT_MAX_PAGE_SIZE,
      defaultPageSize: options?.defaultPageSize || Paginate.DEFAULT_PAGE_SIZE,
    };
  }

  /**
   * Applies pagination to the given query based on the provided paging options.
   *
   * @param query - The query object to which pagination will be applied.
   * @param paging - The paging options containing pagination details.
   * @returns The modified query with pagination applied.
   *
   * @throws Will throw an error if the paging options are invalid.
   */
  public applyPagination(query: any, paging: v1.Paging) {
    this.validatePagingOptions(paging);
    const pageSize = this.getPageSize(paging.pageSize);

    if (paging.lastId !== undefined) {
      return this.applyCursorPagination(query, paging.lastId, pageSize);
    }

    if (paging.pageNumber !== undefined) {
      return this.applySkipLimitPagination(query, paging.pageNumber, pageSize);
    }

    return this.applyDefaultPagination(query, pageSize);
  }

  /**
   * Retrieves the page size for pagination.
   *
   * @param pageSize - Optional parameter to specify the desired page size.
   * @returns The specified page size if provided, otherwise the default page size from options.
   */
  private getPageSize(pageSize?: number): number {
    return pageSize || this.options!.defaultPageSize!;
  }

  /**
   * Validates the paging options provided.
   *
   * This method checks for the following conditions:
   * - Ensures that both `lastId` and `pageNumber` are not used simultaneously,
   *   as it is not allowed to use both skip limit paging and cursor-based paging.
   * - If `pageSize` is defined, it validates the page size.
   *
   * @param paging - The paging options to validate.
   * @throws {Error} If both `lastId` and `pageNumber` are provided.
   */
  private validatePagingOptions(paging: v1.Paging) {
    this.logger.debug({ paging }, 'Validating paging options');
    if (paging.lastId && paging.pageNumber) {
      throw new Error('Cannot use both skip limit paging and cursor-based paging.');
    }
    if (paging.pageSize !== undefined) {
      this.validatePageSize(paging.pageSize);
    }
    if (paging.lastId === null) {
      throw new Error('Invalid lastId provided.');
    }
  }

  /**
   * Validates the provided page size.
   *
   * @param pageSize - The size of the page to be validated.
   * @throws Will throw an error if the page size is less than 1.
   * @throws Will throw an error if the page size exceeds the maximum allowed page size.
   */
  private validatePageSize(pageSize: number) {
    this.logger.debug({ pageSize }, 'Validating page size');
    if (pageSize < 1) {
      throw new Error(`Page size must be greater than 0.`);
    }
    if (pageSize > this.options!.maxPageSize!) {
      throw new Error(`Page size cannot exceed ${this.options!.maxPageSize!}. Received: ${pageSize}.`);
    }
  }

  /**
   * Applies cursor-based pagination to a query.
   *
   * @param query - The database query to which pagination will be applied.
   * @param lastId - The ID of the last item from the previous page.
   * @param pageSize - The number of items to retrieve for the current page.
   * @returns The modified query with pagination applied.
   */
  private applyCursorPagination(query: any, lastId: string, pageSize: number) {
    this.logger.debug({ lastId, pageSize }, 'Applying cursor-based pagination');
    return query.where({ _id: { $gt: lastId } }).limit(pageSize);
  }

  /**
   * Applies skip and limit pagination to the given query.
   *
   * @param query - The query object to which pagination will be applied.
   * @param pageNumber - The current page number (must be greater than 0).
   * @param pageSize - The number of items per page.
   * @returns The modified query with skip and limit applied.
   * @throws {Error} If the page number is less than 1.
   */
  private applySkipLimitPagination(query: any, pageNumber: number, pageSize: number) {
    this.logger.debug({ pageNumber, pageSize }, 'Applying skip-limit pagination');
    if (pageNumber < 1) {
      throw new Error(`Page number must be greater than 0.`);
    }
    return query.skip((pageNumber - 1) * pageSize).limit(pageSize);
  }

  /**
   * Applies default pagination to the given query by setting a limit on the number of results.
   *
   * @param query - The query object to which pagination will be applied.
   * @param pageSize - The maximum number of results to return.
   * @returns The modified query object with pagination applied.
   */
  private applyDefaultPagination(query: any, pageSize: number) {
    this.logger.debug({ pageSize }, 'Applying default pagination');
    return query.limit(pageSize);
  }
}
