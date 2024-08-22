import { readdirSync, statSync } from 'fs';
import { extractMarker, extractPipe, extractService, findFiles } from './utils';
jest.mock('fs');
describe('utils', () => {
  const file = 'file.ts';
  const ignoreKeywords = ['branding.*', 'featurea.keyword'];

  describe('findFiles', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return an empty array if there are no files', () => {
      (readdirSync as jest.Mock).mockReturnValueOnce([]);
      const result = findFiles('/fake/path', ['.txt', '.js']);
      expect(result).toEqual([]);
    });

    it('should recursively find files in subdirectories', () => {
      (readdirSync as jest.Mock).mockReturnValueOnce(['dir1']);
      (readdirSync as jest.Mock).mockReturnValueOnce(['file1.txt']);
      (readdirSync as jest.Mock).mockReturnValueOnce([]);

      (statSync as jest.Mock).mockImplementation((path) => {
        if (path.endsWith('dir1')) {
          return { isDirectory: () => true };
        }
        return { isDirectory: () => false };
      });

      const result = findFiles('/fake/path', ['.txt']);
      expect(result).toEqual(['/fake/path/dir1/file1.txt']);
    });
  });

  describe('extractPipe', () => {
    it('should return empty object if no match', () => {
      expect(extractPipe('', file, ignoreKeywords, {})).toEqual({});
    });

    it('should skip ignored keywords (exact match)', () => {
      const content = `
        <h1>{{ 'branding.company-name' | translator }}</h1>
        <h1>{{ 'featurea.keyword' | translator }}</h1>
      `;
      expect(extractPipe(content, file, ignoreKeywords, {})).toEqual({});
    });

    it('should skip ignored keywords (glob match)', () => {
      const content = `
        <h1>{{ 'branding.any-key' | translator }}</h1>
        <h1>{{ 'branding.other-key' | translator }}</h1>
      `;
      expect(extractPipe(content, file, ignoreKeywords, {})).toEqual({});
    });

    it('should throw error when empty lvaue', () => {
      expect(() => extractPipe("{{ 'HELLO' | translator : '' : '' }}", file, ignoreKeywords, {})).toThrow(
        'Empty default value: HELLO at file.ts:1'
      );
    });

    it('should extract keyword with value and description', () => {
      expect(extractPipe("{{ 'HELLO' | translator : 'Welcome' : 'Greeting' }}", file, ignoreKeywords, {})).toEqual({
        HELLO: {
          value: 'Welcome',
          description: 'Greeting',
          file,
          params: [],
        },
      });
    });

    it('should extract keyword with value, description, and arguments', () => {
      expect(
        extractPipe(
          "{{ 'HELLO' | translator : 'Welcome' : 'Greeting' : { name: 'John', age: variable } }}",
          file,
          ignoreKeywords,
          {}
        )
      ).toEqual({
        HELLO: {
          value: 'Welcome',
          description: 'Greeting',
          file,
          params: ['name', 'age'],
        },
      });
    });

    it('should handle multiple lines and ignore keywords', () => {
      const content = `
        <h1>{{ 'branding.company-name' | translator }}</h1>
        <h3>{{ 'feature.hello' | translator : 'Value' : 'Desc' : { name: 'John' } }}</h3>
        <h3>{{ 'featurea.keyword' | translator : 'Value' : 'Desc' }}</h3>
      `;
      expect(extractPipe(content, file, ignoreKeywords, {})).toEqual({
        'feature.hello': {
          value: 'Value',
          description: 'Desc',
          file,
          params: ['name'],
        },
      });
    });

    it('should throw error for duplicate keywords in the same file', () => {
      const content = `
        <h3>{{ 'feature.keyword' | translator : 'Val 1' : 'Desc 1' }}</h3>
        <h3>{{ 'feature.keyword' | translator : 'Val 2' : 'Desc 2' }}</h3>
      `;
      expect(() => extractPipe(content, file, ignoreKeywords, {})).toThrow('Duplicate keyword: feature.keyword');
    });

    it('should throw error for duplicate keywords with existing ones', () => {
      const content = `
      {{ 'duplicate.keyword' | translator : 'Val' : 'Desc' }}`;
      const existingKeywords = {
        'duplicate.keyword': { value: '', description: '', file: '', params: [] },
      };
      expect(() => extractPipe(content, file, ignoreKeywords, existingKeywords)).toThrow(
        `Duplicate keyword: duplicate.keyword at ${file}:2`
      );
    });

    it('should not throw error for duplicate ignored keywords', () => {
      const content = `
        <h1>{{ 'branding.company-name' | translator }}</h1>
        <h3>{{ 'feature.keyword' | translator : 'Value' : 'Desc' }}</h3>
      `;
      expect(extractPipe(content, file, ignoreKeywords, {})).toEqual({
        'feature.keyword': {
          value: 'Value',
          description: 'Desc',
          file,
          params: [],
        },
      });
    });
  });

  describe('extractMarker', () => {
    it('should return empty object if no match', () => {
      expect(extractMarker('', file, ignoreKeywords, {})).toEqual({});
    });

    it('should ignore keywords in ignoreKeywords', () => {
      const content = `
        marker('branding.company-name', 'Company Name', 'The name of the company'),
        marker('featurea.keyword', 'Feature Keyword', 'This keyword should be ignored')
      `;
      expect(extractMarker(content, file, ignoreKeywords, {})).toEqual({});
    });

    it('should extract keyword, default value, and description', () => {
      const content = `marker('HELLO', 'Default Value', 'This is a description')`;
      expect(extractMarker(content, file, ignoreKeywords, {})).toEqual({
        HELLO: { value: 'Default Value', description: 'This is a description', file, params: [] },
      });
    });

    it('should extract keyword and arguments', () => {
      const content = `marker('HELLO', 'Default Value', 'This is a description', { name: 'John', age: 30 })`;
      expect(extractMarker(content, file, ignoreKeywords, {})).toEqual({
        HELLO: { value: 'Default Value', file, description: 'This is a description', params: ['name', 'age'] },
      });
    });

    it('should throw error on duplicate keyword', () => {
      const content = `
      marker('duplicate.keyword', 'Another Value', 'Another description')`;
      const existingKeywords = {
        'duplicate.keyword': { value: '', description: '', file: '', params: [] },
      };
      expect(() => extractMarker(content, file, ignoreKeywords, existingKeywords)).toThrow(
        `Duplicate keyword: duplicate.keyword at ${file}:2`
      );
    });

    it('should handle multiple markers in content, ignoring ignored keywords', () => {
      const content = `
        marker('branding.company-name', 'Company Name', 'Ignored description'),
        marker('SECOND', 'Second Value', 'Second description', { user: 'Alice' })
      `;
      expect(extractMarker(content, file, ignoreKeywords, {})).toEqual({
        SECOND: { value: 'Second Value', file, description: 'Second description', params: ['user'] },
      });
    });
  });

  describe('extractService', () => {
    it('should return empty object if no match', () => {
      expect(extractService('', file, ignoreKeywords, {})).toEqual({});
    });

    it('should ignore keywords in ignoreKeywords', () => {
      const content = `
        translator.translate('branding.company-name', 'Company Name', 'The name of the company'),
        translator.translate('featurea.keyword', 'Feature Keyword', 'This keyword should be ignored')
      `;
      expect(extractService(content, file, ignoreKeywords, {})).toEqual({});
    });

    it('should extract keyword, default value, and description', () => {
      const content = `translator.translate('HELLO', 'Default Value', 'This is a description')`;
      expect(extractService(content, file, ignoreKeywords, {})).toEqual({
        HELLO: { value: 'Default Value', description: 'This is a description', file, params: [] },
      });
    });

    it('should extract keyword and arguments from translate function', () => {
      const content = `translator.translate('HELLO', 'Default Value', 'This is a description', { name: 'John', age: 30 })`;
      expect(extractService(content, file, ignoreKeywords, {})).toEqual({
        HELLO: { value: 'Default Value', file, description: 'This is a description', params: ['name', 'age'] },
      });
    });

    it('should extract keyword and arguments from instant function', () => {
      const content = `translator.instant('HELLO', 'Default Value', 'This is a description', { name: 'John', age: 30 })`;
      expect(extractService(content, file, ignoreKeywords, {})).toEqual({
        HELLO: { value: 'Default Value', file, description: 'This is a description', params: ['name', 'age'] },
      });
    });

    it('should throw error on duplicate keyword', () => {
      const content = `
      translator.translate('duplicate.keyword', 'Another Value', 'Another description')`;
      const existingKeywords = {
        'duplicate.keyword': { value: '', description: '', file: '', params: [] },
      };
      expect(() => extractService(content, file, ignoreKeywords, existingKeywords)).toThrow(
        `Duplicate keyword: duplicate.keyword at ${file}:2`
      );
    });

    it('should handle multiple markers in content, ignoring ignored keywords', () => {
      const content = `
        translator.translate('branding.company-name', 'Company Name', 'Ignored description'),
        translator.translate('SECOND', 'Second Value', 'Second description', { user: 'Alice' })
      `;
      expect(extractService(content, file, ignoreKeywords, {})).toEqual({
        SECOND: { value: 'Second Value', file, description: 'Second description', params: ['user'] },
      });
    });
  });
});
