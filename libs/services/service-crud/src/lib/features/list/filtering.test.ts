import { v1 } from '@goup/service-protobuf';
import { Filtering } from './filtering';

describe('Filtering', () => {
  let filtering: Filtering;

  beforeEach(() => {
    const fieldsMap = {
      name: 'String',
      age: 'Number',
      birthdate: 'Date',
      isActive: 'Boolean',
    };
    filtering = new Filtering('ModelName', fieldsMap);
  });

  describe('buildFilters', () => {
    it('should build a correct filter query', () => {
      const filters: v1.Filtering[] = [
        { field: 'name', operator: v1.FilterOperator.EQUAL, stringValue: 'John' },
        { field: 'age', operator: v1.FilterOperator.GREATER_THAN, numberValue: 30 },
      ];
      const filterQuery = filtering.buildFilters(filters);
      expect(filterQuery).toEqual({
        name: 'John',
        age: { $gt: 30 },
      });
    });

    it('should throw an error for invalid filter field', () => {
      const filters: v1.Filtering[] = [
        { field: 'invalidField', operator: v1.FilterOperator.EQUAL, stringValue: 'John' },
      ];
      expect(() => filtering.buildFilters(filters)).toThrow('Invalid filter field: invalidField.');
    });

    it('should throw an error for invalid filter operator', () => {
      const filters: v1.Filtering[] = [
        { field: 'name', operator: v1.FilterOperator.GREATER_THAN, stringValue: 'John' },
      ];
      expect(() => filtering.buildFilters(filters)).toThrow('Invalid operator: GREATER_THAN for field name.');
    });

    it('should throw an error for missing filter value', () => {
      const filters: v1.Filtering[] = [{ field: 'name', operator: v1.FilterOperator.EQUAL }];
      expect(() => filtering.buildFilters(filters)).toThrow(
        "Filter operator EQUAL for name field requires a 'stringValue' or 'numberValue'."
      );
    });

    // Bổ sung các trường hợp kiểm tra khác
    it('should build a correct filter query for NOT_EQUAL operator', () => {
      const filters: v1.Filtering[] = [{ field: 'name', operator: v1.FilterOperator.NOT_EQUAL, stringValue: 'John' }];
      const filterQuery = filtering.buildFilters(filters);
      expect(filterQuery).toEqual({
        name: { $ne: 'John' },
      });
    });

    it('should build a correct filter query for LESS_THAN operator', () => {
      const filters: v1.Filtering[] = [{ field: 'age', operator: v1.FilterOperator.LESS_THAN, numberValue: 30 }];
      const filterQuery = filtering.buildFilters(filters);
      expect(filterQuery).toEqual({
        age: { $lt: 30 },
      });
    });

    it('should build a correct filter query for IN operator', () => {
      const filters: v1.Filtering[] = [
        { field: 'name', operator: v1.FilterOperator.IN, stringValues: ['John', 'Doe'] },
      ];
      const filterQuery = filtering.buildFilters(filters);
      expect(filterQuery).toEqual({
        name: { $in: ['John', 'Doe'] },
      });
    });

    it('should build a correct filter query for NOT_IN operator', () => {
      const filters: v1.Filtering[] = [
        { field: 'name', operator: v1.FilterOperator.NOT_IN, stringValues: ['John', 'Doe'] },
      ];
      const filterQuery = filtering.buildFilters(filters);
      expect(filterQuery).toEqual({
        name: { $nin: ['John', 'Doe'] },
      });
    });

    it('should build a correct filter query for BETWEEN operator', () => {
      const filters: v1.Filtering[] = [{ field: 'age', operator: v1.FilterOperator.BETWEEN, from: 20, to: 30 }];
      const filterQuery = filtering.buildFilters(filters);
      expect(filterQuery).toEqual({
        age: { $gte: 20, $lte: 30 },
      });
    });

    it('should build a correct filter query for SEARCH operator', () => {
      const filters: v1.Filtering[] = [{ field: 'name', operator: v1.FilterOperator.SEARCH, keyword: 'John' }];
      const filterQuery = filtering.buildFilters(filters);
      expect(filterQuery).toEqual({
        name: { $regex: 'John', $options: 'i' },
      });
    });

    it('should build a correct filter query for IS_NULL operator', () => {
      const filters: v1.Filtering[] = [{ field: 'name', operator: v1.FilterOperator.IS_NULL }];
      const filterQuery = filtering.buildFilters(filters);
      expect(filterQuery).toEqual({
        name: { $eq: null },
      });
    });

    it('should build a correct filter query for IS_NOT_NULL operator', () => {
      const filters: v1.Filtering[] = [{ field: 'name', operator: v1.FilterOperator.IS_NOT_NULL }];
      const filterQuery = filtering.buildFilters(filters);
      expect(filterQuery).toEqual({
        name: { $ne: null },
      });
    });

    it('should build a correct filter query for IS_NOT_EMPTY_STRING operator', () => {
      const filters: v1.Filtering[] = [{ field: 'name', operator: v1.FilterOperator.IS_NOT_EMPTY_STRING }];
      const filterQuery = filtering.buildFilters(filters);
      expect(filterQuery).toEqual({
        name: { $ne: '' },
      });
    });

    // Bổ sung các trường hợp kiểm tra giá trị lọc không hợp lệ
    it('should throw an error for missing numberValue for GREATER_THAN operator', () => {
      const filters: v1.Filtering[] = [{ field: 'age', operator: v1.FilterOperator.GREATER_THAN }];
      expect(() => filtering.buildFilters(filters)).toThrow(
        "Filter operator GREATER_THAN for age field requires a 'numberValue'."
      );
    });

    it('should throw an error for missing stringValues for IN operator', () => {
      const filters: v1.Filtering[] = [{ field: 'name', operator: v1.FilterOperator.IN }];
      expect(() => filtering.buildFilters(filters)).toThrow(
        "Filter operator IN for name field requires 'stringValues' or 'numberValues' as a non-empty array."
      );
    });

    it('should throw an error for missing from or to for BETWEEN operator', () => {
      const filters: v1.Filtering[] = [{ field: 'age', operator: v1.FilterOperator.BETWEEN, from: 30 }];
      expect(() => filtering.buildFilters(filters)).toThrow(
        "Filter operator BETWEEN for age field requires 'from' to be less than 'to'."
      );
    });

    it('should throw an error for missing keyword for SEARCH operator', () => {
      const filters: v1.Filtering[] = [{ field: 'name', operator: v1.FilterOperator.SEARCH }];
      expect(() => filtering.buildFilters(filters)).toThrow(
        "Filter operator SEARCH for name field requires a 'keyword'."
      );
    });
  });
});
