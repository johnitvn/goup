import { Dict } from '@goup/common-types';
import { v1 } from '@goup/service-protobuf';
import { EliteLogger } from '@goup/service-logger';

/**
 * A service class for managing and applying filters to fields.
 *
 * @remarks
 * This class provides methods to initialize filterable fields, build filter queries,
 * and validate filters based on predefined operators for different data types.
 *
 * @example
 * ```typescript
 * const fieldsMap = { name: 'String', age: 'Number', createdAt: 'Date', isActive: 'Boolean' };
 * const filteringService = new Filtering(fieldsMap);
 * const filters = [
 *   { field: 'name', operator: v1.FilterOperator.EQUAL, stringValue: 'John' },
 *   { field: 'age', operator: v1.FilterOperator.GREATER_THAN, numberValue: 30 }
 * ];
 * const filterQuery = filteringService.buildFilters(filters);
 * console.log(filterQuery);
 * ```
 */
export class Filtering {
  /**
   * A map that associates field names with a set of filter operators.
   *
   * @private
   * @type {Map<string, Set<v1.FilterOperator>>}
   *
   * @remarks
   * This map is used to determine which fields can be filtered and what
   * filter operations are allowed on those fields.
   */
  private filterableFields: Map<string, Set<v1.FilterOperator>> = new Map<string, Set<v1.FilterOperator>>();
  private logger: EliteLogger;

  /**
   * Constructs an instance of the filtering service.
   *
   * @param fieldsMap - A dictionary mapping field names to their corresponding string values.
   */
  constructor(modelName: string, fieldsMap: Dict<string>) {
    this.logger = new EliteLogger(Filtering.name + ':' + modelName);
    this.initializeFilterableFields(fieldsMap);
  }

  /**
   * Caches the filterable fields and their valid operators based on their types.
   *
   * @param fieldsMap - A map of field names to their types.
   */
  private initializeFilterableFields(fieldsMap: { [key: string]: string }): void {
    this.logger.debug(`initializing filterable fields...`);
    const stringOperators = new Set([
      v1.FilterOperator.EQUAL,
      v1.FilterOperator.NOT_EQUAL,
      v1.FilterOperator.IN,
      v1.FilterOperator.NOT_IN,
      v1.FilterOperator.SEARCH,
      v1.FilterOperator.IS_NULL,
      v1.FilterOperator.IS_NOT_NULL,
      v1.FilterOperator.IS_NOT_EMPTY_STRING,
    ]);

    const numberOperators = new Set([
      v1.FilterOperator.EQUAL,
      v1.FilterOperator.NOT_EQUAL,
      v1.FilterOperator.GREATER_THAN,
      v1.FilterOperator.LESS_THAN,
      v1.FilterOperator.IN,
      v1.FilterOperator.NOT_IN,
      v1.FilterOperator.BETWEEN,
      v1.FilterOperator.IS_NULL,
      v1.FilterOperator.IS_NOT_NULL,
    ]);

    const dateOperators = new Set([
      v1.FilterOperator.EQUAL,
      v1.FilterOperator.NOT_EQUAL,
      v1.FilterOperator.GREATER_THAN,
      v1.FilterOperator.LESS_THAN,
      v1.FilterOperator.BETWEEN,
      v1.FilterOperator.IS_NULL,
      v1.FilterOperator.IS_NOT_NULL,
    ]);

    const booleanOperators = new Set([
      v1.FilterOperator.EQUAL,
      v1.FilterOperator.NOT_EQUAL,
      v1.FilterOperator.IS_NULL,
      v1.FilterOperator.IS_NOT_NULL,
    ]);

    for (const [field, type] of Object.entries(fieldsMap)) {
      switch (type) {
        case 'String':
          this.filterableFields.set(field, stringOperators);
          break;
        case 'Number':
          this.filterableFields.set(field, numberOperators);
          break;
        case 'Date':
          this.filterableFields.set(field, dateOperators);
          break;
        case 'Boolean':
          this.filterableFields.set(field, booleanOperators);
          break;
        default:
          // Không hỗ trợ loại dữ liệu này
          break;
      }
    }
  }

  /**
   * Builds a filter query object based on the provided filters.
   *
   * @param filters - An array of filter objects to be applied.
   * @returns An object representing the filter query.
   */
  public buildFilters(filters: v1.Filtering[]): any {
    this.logger.debug(`building filter query...`);
    this.validateFilters(filters);

    const filterQuery: Record<string, any> = {};
    filters.forEach((filter) => {
      if (filter.field) {
        filterQuery[filter.field] = this.getFilterCondition(filter);
      }
    });

    return filterQuery;
  }

  /**
   * Generates a filter condition based on the provided filter object.
   *
   * @param filter - The filter object containing the field and operator to filter by.
   * @returns The filter condition to be used in a database query.
   * @throws Will throw an error if the operator is invalid.
   */
  private getFilterCondition(filter: v1.Filtering): any {
    this.logger.debug(`generating filter condition for ${filter.field} field...`);
    const { field, operator } = filter;
    const conditionMap: Record<string, any> = {
      [v1.FilterOperator.EQUAL]: filter.stringValue || filter.numberValue,
      [v1.FilterOperator.NOT_EQUAL]: { $ne: filter.stringValue || filter.numberValue },
      [v1.FilterOperator.GREATER_THAN]: { $gt: filter.numberValue },
      [v1.FilterOperator.LESS_THAN]: { $lt: filter.numberValue },
      [v1.FilterOperator.IN]: { $in: filter.stringValues || filter.numberValues },
      [v1.FilterOperator.NOT_IN]: { $nin: filter.stringValues || filter.numberValues },
      [v1.FilterOperator.BETWEEN]: { $gte: filter.from, $lte: filter.to },
      [v1.FilterOperator.SEARCH]: { $regex: filter.keyword, $options: 'i' },
      [v1.FilterOperator.IS_NULL]: { $eq: null },
      [v1.FilterOperator.IS_NOT_NULL]: { $ne: null },
      [v1.FilterOperator.IS_NOT_EMPTY_STRING]: { $ne: '' },
    };

    if (operator === undefined) {
      throw new Error(`Operator is undefined for field ${field}.`);
    }
    const condition = conditionMap[operator];
    if (condition === undefined) {
      const operatorName = Object.keys(v1.FilterOperator).find(
        (key: string) => v1.FilterOperator[key as keyof typeof v1.FilterOperator] === operator
      );
      throw new Error(`Invalid operator: ${operatorName} for field ${field}.`);
    }

    return condition;
  }

  /**
   * Validates the provided filters by checking their fields and operators.
   *
   * @param filters - An array of filter objects to be validated.
   * @throws Will throw an error if any filter field or operator is invalid.
   */
  private validateFilters(filters: v1.Filtering[]): void {
    this.logger.debug(`validating filters...`);
    filters.forEach((filter) => {
      const { field, operator } = filter;
      if (!field) {
        throw new Error('Field is undefined.');
      }
      const validOperators = this.filterableFields.get(field);

      if (!validOperators) {
        throw new Error(`Invalid filter field: ${field}.`);
      }

      if (operator === undefined || !validOperators.has(operator)) {
        const operatorName = Object.keys(v1.FilterOperator).find(
          (key: string) => v1.FilterOperator[key as keyof typeof v1.FilterOperator] === operator
        );
        throw new Error(`Invalid operator: ${operatorName} for field ${field}.`);
      }

      this.validateFilterValue(operator, filter, field);
    });
  }

  /**
   * Validates the filter value based on the provided operator, filter, and field.
   * Throws an error if the filter value does not meet the required criteria for the given operator.
   *
   * @param operator - The filter operator to validate against.
   * @param filter - The filtering object containing the filter values.
   * @param field - The field being filtered.
   *
   * @throws {Error} If the filter value does not meet the required criteria for the given operator.
   */
  private validateFilterValue(operator: v1.FilterOperator, filter: v1.Filtering, field: string): void {
    this.logger.debug(`validating filter value for ${field} field...`);
    const operatorName = Object.keys(v1.FilterOperator).find(
      (key: string) => v1.FilterOperator[key as keyof typeof v1.FilterOperator] === operator
    );
    switch (operator) {
      case v1.FilterOperator.EQUAL:
      case v1.FilterOperator.NOT_EQUAL:
        if (filter.stringValue === undefined && filter.numberValue === undefined) {
          throw new Error(
            `Filter operator ${operatorName} for ${field} field requires a 'stringValue' or 'numberValue'.`
          );
        }
        break;
      case v1.FilterOperator.GREATER_THAN:
      case v1.FilterOperator.LESS_THAN:
        if (filter.numberValue === undefined) {
          throw new Error(`Filter operator ${operatorName} for ${field} field requires a 'numberValue'.`);
        }
        break;
      case v1.FilterOperator.IN:
      case v1.FilterOperator.NOT_IN:
        if (filter.stringValues === undefined && filter.numberValues === undefined) {
          throw new Error(
            `Filter operator ${operatorName} for ${field} field requires 'stringValues' or 'numberValues' as a non-empty array.`
          );
        }
        break;
      case v1.FilterOperator.BETWEEN:
        if (filter.from === undefined || filter.to === undefined || filter.from >= filter.to) {
          throw new Error(`Filter operator ${operatorName} for ${field} field requires 'from' to be less than 'to'.`);
        }
        break;
      case v1.FilterOperator.SEARCH:
        if (!filter.keyword) {
          throw new Error(`Filter operator ${operatorName} for ${field} field requires a 'keyword'.`);
        }
        break;
      case v1.FilterOperator.IS_NULL:
      case v1.FilterOperator.IS_NOT_NULL:
      case v1.FilterOperator.IS_NOT_EMPTY_STRING:
      default:
        // No additional validation required
        break;
    }
  }
}
