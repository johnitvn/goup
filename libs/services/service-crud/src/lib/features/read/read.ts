import { Model } from 'mongoose';

export class Reading<T> {
  constructor(private model: Model<T>) {}

  /**
   * Retrieves a document by its unique identifier.
   *
   * @param id - The unique identifier of the document to be retrieved.
   * @returns A promise that resolves to the document of type `T` if found, or `null` if not found.
   */
  read(id: string): Promise<T> {
    return this.model.findById(id).exec();
  }
}
