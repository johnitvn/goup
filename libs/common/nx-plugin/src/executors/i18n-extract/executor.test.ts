import { ExecutorContext } from '@nx/devkit';
import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import i18nExtractExecutor from './executor';
import { ExtractExecutorSchema } from './schema';
import { extractMarker, extractPipe, extractService, findFiles } from './utils';

jest.mock('child_process', () => ({
  execSync: jest.fn(),
}));

jest.mock('fs', () => ({
  readFileSync: jest.fn(),
  writeFileSync: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn((...args) => args.join('/')),
}));

jest.mock('./utils', () => ({
  extractMarker: jest.fn((content, file, ignoreKeywords, results) => results),
  extractPipe: jest.fn((content, file, ignoreKeywords, results) => results),
  extractService: jest.fn((content, file, ignoreKeywords, results) => results),
  findFiles: jest.fn(() => ['file1.ts', 'file2.html']),
}));

describe('i18nExtractExecutor', () => {
  let context: ExecutorContext;
  let options: ExtractExecutorSchema;

  beforeEach(() => {
    context = {
      root: '/root',
      projectName: 'test-project',
      workspace: {
        projects: {
          'test-project': {
            root: 'libs/test-project',
          },
        },
      },
    } as unknown as ExecutorContext;

    options = {
      input: 'src',
      output: 'translations.json',
      ignoreKeys: ['ignore.this'],
    };

    (readFileSync as jest.Mock).mockReturnValue('file content');
  });

  it('should extract translations and write to output file', async () => {
    const result = await i18nExtractExecutor(options, context);

    expect(findFiles).toHaveBeenCalledWith('/root/src', ['.ts', 'html']);
    expect(readFileSync).toHaveBeenCalledTimes(2);
    expect(extractPipe).toHaveBeenCalledTimes(2);
    expect(extractMarker).toHaveBeenCalledTimes(2);
    expect(extractService).toHaveBeenCalledTimes(2);
    expect(writeFileSync).toHaveBeenCalledWith('/root/translations.json', JSON.stringify({}, null, 2));
    expect(execSync).toHaveBeenCalledWith('npx nx format:write --files /root/translations.json');
    expect(result).toEqual({ success: true });
  });

  it('should use default input and output paths if not provided', async () => {
    delete options.input;
    delete options.output;

    const result = await i18nExtractExecutor(options, context);

    expect(findFiles).toHaveBeenCalledWith('libs/test-project/src', ['.ts', 'html']);
    expect(writeFileSync).toHaveBeenCalledWith('libs/test-project/translations.json', JSON.stringify({}, null, 2));
    expect(result).toEqual({ success: true });
  });

  it('should include default ignore keywords', async () => {
    options.ignoreKeys = undefined;

    await i18nExtractExecutor(options, context);

    expect(extractPipe).toHaveBeenCalledWith('file content', 'file1.ts', ['global.*'], {});
    expect(extractMarker).toHaveBeenCalledWith('file content', 'file1.ts', ['global.*'], {});
    expect(extractService).toHaveBeenCalledWith('file content', 'file1.ts', ['global.*'], {});
  });
});
