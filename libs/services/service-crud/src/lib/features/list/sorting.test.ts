import { v1 } from '@goup/service-protobuf';
import { Sorting } from './sorting';

describe('Sorting', () => {
  let sorting: Sorting;
  const fieldsMap = {
    name: 'String',
    age: 'Number',
    createdAt: 'Date',
    isActive: 'Boolean',
    description: 'Text',
  };

  beforeEach(() => {
    sorting = new Sorting('ModelName', fieldsMap);
  });

  describe('buildSorts', () => {
    it('should build a sorting query object from an array of sorting criteria', () => {
      const sorts: v1.Sorting[] = [
        { field: 'name', direction: v1.SortDirection.ASC },
        { field: 'age', direction: v1.SortDirection.DESC },
      ];
      const sortQuery = sorting.buildSorts(sorts);
      expect(sortQuery).toEqual({ name: 1, age: -1 });
    });

    it('should throw an error if any of the sort fields are invalid', () => {
      const sorts: v1.Sorting[] = [{ field: 'description', direction: v1.SortDirection.ASC }];
      expect(() => sorting.buildSorts(sorts)).toThrowError('Invalid sort field(s): description.');
    });

    it('should handle an empty array of sorting criteria', () => {
      const sorts: v1.Sorting[] = [];
      const sortQuery = sorting.buildSorts(sorts);
      expect(sortQuery).toEqual({});
    });
  });

  describe('validateSortFields', () => {
    it('should not throw an error if all sort fields are valid', () => {
      const sorts: v1.Sorting[] = [
        { field: 'name', direction: v1.SortDirection.ASC },
        { field: 'age', direction: v1.SortDirection.DESC },
      ];
      expect(() => sorting['validateSortFields'](sorts)).not.toThrow();
    });

    it('should throw an error if any of the sort fields are invalid', () => {
      const sorts: v1.Sorting[] = [{ field: 'description', direction: v1.SortDirection.ASC }];
      expect(() => sorting['validateSortFields'](sorts)).toThrowError('Invalid sort field(s): description.');
    });

    it('should handle an empty array of sorting criteria without throwing an error', () => {
      const sorts: v1.Sorting[] = [];
      expect(() => sorting['validateSortFields'](sorts)).not.toThrow();
    });
  });

  describe('initializeSortableFields', () => {
    it('should initialize sortable fields correctly', () => {
      const sortableFields = sorting['sortableFields'];
      expect(sortableFields).toEqual(new Set(['name', 'age', 'createdAt', 'isActive']));
    });

    it('should not include non-sortable fields', () => {
      const sortableFields = sorting['sortableFields'];
      expect(sortableFields.has('description')).toBe(false);
    });

    it('should handle an empty fields map correctly', () => {
      const emptySorting = new Sorting('ModelName', {});
      const sortableFields = emptySorting['sortableFields'];
      expect(sortableFields.size).toBe(0);
    });
  });
});
