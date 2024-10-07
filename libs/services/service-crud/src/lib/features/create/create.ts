import { EliteLogger } from '@goup/service-logger';
import { Model } from 'mongoose';

export class Creating<T> {
  private logger: EliteLogger;

  constructor(private model: Model<T>, private isSoftDeleteable: boolean) {
    this.logger = new EliteLogger('Creating:' + this.model.modelName);
  }

  /**
   * Creates multiple items in the database.
   *
   * @template T - The type of the items to be created.
   * @param {Array<T>} items - An array of items to be created.
   * @returns {Promise<Array<T>>} A promise that resolves to an array of created items.
   * @throws Will throw an error if the create fails.
   */
  async create(items: Array<Partial<T>>): Promise<Array<T>> {
    this.logger.debug('Creating items: %O', items);
    if (this.isSoftDeleteable) {
      const createdItems = await this.model.insertMany(items.map((item) => ({ ...item, deletedAt: null })));
      return createdItems as T[];
    } else {
      const createdItems = await this.model.insertMany(items);
      return createdItems as T[];
    }
  }
}
