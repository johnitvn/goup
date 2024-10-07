import { Dict } from '@goup/common-types';
import { v1 } from '@goup/service-protobuf';
import { EliteLogger } from '@goup/service-logger';
import { SortOrder } from 'mongoose';

export class Sorting {
  private logger: EliteLogger;
  private sortableFields: Set<string> = new Set<string>();

  constructor(modelName: string, fieldsMap: Dict<string>) {
    this.logger = new EliteLogger(Sorting.name + ':' + modelName);
    this.initializeSortableFields(fieldsMap);
  }

  /**
   * Caches the sortable fields based on their types.
   *
   * @param fieldsMap - A map of field names to their types.
   */
  private initializeSortableFields(fieldsMap: { [key: string]: string }): void {
    this.logger.debug(`initializing sortable fields...`);
    const sortableTypes = ['String', 'Number', 'Date', 'Boolean'];
    for (const [field, type] of Object.entries(fieldsMap)) {
      if (sortableTypes.includes(type)) {
        this.sortableFields.add(field);
      }
    }
    this.logger.debug(`Sortable fields: ${Array.from(this.sortableFields).join(', ')}`);
  }

  /**
   * Builds a sorting query object from an array of sorting criteria.
   *
   * @param sorts - An array of sorting criteria, where each criterion specifies a field and a direction.
   * @returns An object representing the sorting query, where keys are field names and values are sort orders.
   *
   * @throws Will throw an error if any of the sort fields are invalid.
   */
  public buildSorts(sorts: v1.Sorting[]): { [key: string]: SortOrder } {
    this.logger.debug(`building sort query...`);
    this.validateSortFields(sorts);
    return sorts.reduce((sortQuery, sort) => {
      if (sort.field) {
        sortQuery[sort.field] = sort.direction === v1.SortDirection.DESC ? -1 : 1;
      }
      return sortQuery;
    }, {} as { [key: string]: SortOrder });
  }

  /**
   * Validates the provided sorting fields against the allowed sortable fields.
   *
   * @param sorts - An array of sorting objects to be validated.
   * @throws NotSortableFieldsException - If any of the provided sorting fields are not allowed.
   */
  private validateSortFields(sorts: v1.Sorting[]): void {
    this.logger.debug(`validating sort fields...`);
    const invalidFields = sorts
      .filter((sort) => sort.field && !this.sortableFields.has(sort.field))
      .map((sort) => sort.field as string);
    if (invalidFields.length > 0) {
      throw new Error(`Invalid sort field(s): ${invalidFields.join(', ')}.`);
    }
  }
}
