import { Model, UpdateQuery } from 'mongoose';

export class Updating<T> {
  constructor(private model: Model<T>, private allowedMultiUpdateFields?: Array<keyof T>) {}

  /**
   * Updates multiple items in the database.
   *
   * @template T - The type of the items to be updated.
   * @param {Array<string>} ids - An array of item ids to be updated.
   * @param {Partial<Record<keyof T, any>>} fields - The fields to be updated.
   * @returns {Promise<Array<T>>} A promise that resolves to an array of updated items.
   * @throws Will throw an error if the update fails.
   */
  public async update(ids: Array<string>, fields: Partial<Record<keyof T, any>>): Promise<T[]> {
    if (ids.length === 0) {
      return [];
    } else if (ids.length === 1) {
      await this.model.updateOne({ _id: ids[0] }, fields as UpdateQuery<T>).exec();
      return this.model.find({ _id: ids[0] }).exec();
    } else {
      if (this.allowedMultiUpdateFields) {
        const disallowedFields = Object.keys(fields).filter(
          (field) => !this.allowedMultiUpdateFields!.includes(field as keyof T)
        );
        if (disallowedFields.length > 0) {
          throw new Error(`The following fields cannot be updated in bulk: ${disallowedFields.join(', ')}`);
        }
      }
      await this.model.updateMany({ _id: { $in: ids } }, fields as UpdateQuery<T>).exec();
      return this.model.find({ _id: { $in: ids } }).exec();
    }
  }
}
