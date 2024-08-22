import { ExecutorContext, PromiseExecutor } from '@nx/devkit';
import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { ExtractExecutorSchema } from './schema';
import { extractMarker, extractPipe, extractService, findFiles } from './utils';

const runExecutor: PromiseExecutor<ExtractExecutorSchema> = async (
  options: ExtractExecutorSchema,
  context: ExecutorContext
) => {
  const projectRoot = context.workspace.projects[context.projectName].root;
  const input = options.input ? join(context.root, options.input) : join(projectRoot, 'src');
  const output = options.output ? join(context.root, options.output) : join(projectRoot, 'translations.json');

  const files = findFiles(input, ['.ts', 'html']);

  let results = {};
  for (const file of files) {
    const fileContent = readFileSync(file, 'utf-8');
    results = extractPipe(fileContent, file, options.ignoreKeys, results);
    results = extractMarker(fileContent, file, options.ignoreKeys, results);
    results = extractService(fileContent, file, options.ignoreKeys, results);
  }

  writeFileSync(output, JSON.stringify({ defaultLanguage: options.defaultLanguage, translations: results }, null, 2));
  execSync(`npx nx format:write --files ${output}`);

  console.log(`Translations extracted to ${output}`);

  return {
    success: true,
  };
};

export default runExecutor;
