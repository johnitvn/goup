import { v1 } from '@goup/service-protobuf';
import { Model } from 'mongoose';
import { Filtering } from './filtering';
import { Paginate } from './paginate';
import { Sorting } from './sorting';

/**
 * The `Listing` class provides functionality to list items from a database model
 * with support for filtering, sorting, and pagination.
 *
 * @template T - The type of the model.
 *
 * @property {Filtering} filtering - An instance of the Filtering class to handle query filters.
 * @property {Sorting} sorting - An instance of the Sorting class to handle query sorting.
 * @property {Paginate} paginate - An instance of the Paginate class to handle query pagination.
 * @property {Object.<string, string>} fields - A dictionary of model fields and their types.
 *
 * @constructor
 * @param {Model<T>} model - The model to be used for database operations.
 *
 * @method list
 * @async
 * @param {v1.Listing} listing - The listing parameters including filters, sorts, and paging.
 * @param {boolean} [withDeleted] - Flag to include deleted items in the listing.
 * @returns {Promise<T[]>} - A promise that resolves to an array of items of type T.
 */
export class Listing<T = any> {
  filtering: Filtering;
  sorting: Sorting;
  paginate: Paginate;
  fields: { [key: string]: string };

  /**
   * Constructs an instance of the ListItemsService.
   *
   * @param model - The model to be used for database operations.
   */
  constructor(private model: Model<T>) {
    const schemaPaths = this.model.schema.paths;
    this.fields = {};
    for (const path in schemaPaths) {
      this.fields[path] = schemaPaths[path].instance;
    }
    const modelName = this.model.modelName;
    this.filtering = new Filtering(modelName, this.fields);
    this.sorting = new Sorting(modelName, this.fields);
    this.paginate = new Paginate(modelName);
  }

  /**
   * Lists the items from the database based on the provided listing criteria.
   *
   * @param listing - The listing criteria including filters, sorts, and pagination.
   * @param withDeleted - Optional flag to include deleted items in the results.
   * @returns A promise that resolves to an array of items matching the listing criteria.
   */
  public async list(listing: v1.Listing, withDeleted?: boolean): Promise<T[]> {
    let query = this.model.find();

    if (this.fields.deletedAt && !withDeleted) {
      query.where({ $or: [{ deletedAt: { $exists: false } }, { deletedAt: null }] });
    }

    // Apply filters
    if (listing.filters && listing.filters.length > 0) {
      const filterQuery = this.filtering.buildFilters(listing.filters);
      query = query.where(filterQuery);
    }

    // Apply sorting
    if (listing.sorts && listing.sorts.length > 0) {
      const sortQuery = this.sorting.buildSorts(listing.sorts);
      query = query.sort(sortQuery);
    }

    // Apply pagination
    if (listing.paging) {
      query = this.paginate.applyPagination(query, listing.paging);
    }

    return query.exec();
  }
}
