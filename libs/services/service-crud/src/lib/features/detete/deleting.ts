import { v1 } from '@goup/service-protobuf';
import { Model } from 'mongoose';

export class Deleting<T> {
  constructor(private model: Model<T>, private isSoftDeleteable: boolean) {}

  public async delete(ids: Array<string>): Promise<v1.DeleteOperationResult> {
    if (ids.length === 0) {
      return {
        acknowledged: true,
        deletedCount: 0,
      };
    } else if (this.isSoftDeleteable) {
      const result = await this.model.updateMany({ _id: { $in: ids } }, { deletedAt: null }).exec();
      return {
        acknowledged: true,
        deletedCount: result.modifiedCount,
      };
    } else {
      return this.model.deleteMany({ _id: { $in: ids } }).exec();
    }
  }
}
