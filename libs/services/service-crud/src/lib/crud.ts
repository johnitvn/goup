import { EliteLogger } from '@goup/service-logger';
import { v1 } from '@goup/service-protobuf';
import { Model } from 'mongoose';
import { Creating } from './features/create/create';
import { Deleting } from './features/detete/deleting';
import { Listing } from './features/list/listing';
import { Reading } from './features/read/read';
import { Updating } from './features/update/updating';

export class CRUD<T> {
  private readonly logger: EliteLogger;
  private fields: { [key: string]: string };
  private isSoftDeleteable: boolean;
  private listing: Listing<T>;
  private creating: Creating<T>;
  private reading: Reading<T>;
  private updating: Updating<T>;
  private deleting: Deleting<T>;

  constructor(private model: Model<T>) {
    this.logger = new EliteLogger('Repository:' + this.model.modelName);
    this.initialize();
    this.listing = new Listing<T>(model);
    this.reading = new Reading<T>(model);
    this.creating = new Creating<T>(model, this.isSoftDeleteable);
    this.updating = new Updating<T>(model);
    this.deleting = new Deleting<T>(model, this.isSoftDeleteable);
  }

  private initialize() {
    this.logger.trace(`Repository for model ${this.model.modelName} initlizing.`);
    this.initFields();
    this.initSoftDeleteable();
  }

  private initFields() {
    this.fields = Object.keys(this.model.schema.paths).reduce((acc: { [key: string]: string }, path: string) => {
      acc[path] = this.model.schema.paths[path].instance;
      return acc;
    }, {} as { [key: string]: string });
    this.logger.trace(`Fields: ${JSON.stringify(this.fields)}`);
  }

  private initSoftDeleteable() {
    this.isSoftDeleteable = this.fields['deletedAt'] === 'Date';

    if (!this.isSoftDeleteable) return;

    const deletedAtField = this.model.schema.path('deletedAt');

    if (deletedAtField.options.default !== null) {
      throw new Error('The `deletedAt` field must have a default value of `null`.');
    }

    const indexes = this.model.schema.indexes();
    const deletedAtIndex = indexes.find(([indexFields]) => 'deletedAt' in indexFields);

    if (!deletedAtIndex) {
      // Create the index if not found
      this.model.schema.index({ deletedAt: 1 }, { name: 'deletedAt', background: true });
      this.logger.warn('The `deletedAt` field is not indexed. An index has been created for you.');
    } else {
      const [indexFields, indexOptions] = deletedAtIndex;

      // Warn if `deletedAt` is not sorted in ascending order
      if (indexFields['deletedAt'] !== 1) {
        this.logger.warn(
          `The index ${JSON.stringify(
            indexFields
          )} includes 'deletedAt' sorted in descending order, which may not be optimal for performance.`
        );
      }

      // Ensure unique indexes include `deletedAt`
      if (indexOptions.unique && !('deletedAt' in indexFields)) {
        throw new Error(
          `The index ${JSON.stringify(
            indexFields
          )} must include the 'deletedAt' field to be unique when soft delete is enabled.`
        );
      }
    }
  }

  public async list(listing: v1.Listing): Promise<T[]> {
    return this.listing.list(listing);
  }

  public async read(id: string): Promise<T> {
    return this.reading.read(id);
  }

  public async create(create: Array<Partial<T>>): Promise<Array<T>> {
    return this.creating.create(create);
  }

  public async update(ids: Array<string>, update: Partial<T>): Promise<T[]> {
    return this.updating.update(ids, update);
  }

  public async delete(ids: Array<string>): Promise<v1.DeleteOperationResult> {
    return this.deleting.delete(ids);
  }
}
