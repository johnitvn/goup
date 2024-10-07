import { ExecutorContext, PromiseExecutor, workspaceRoot } from '@nx/devkit';
import { execSync } from 'child_process';
import { readdirSync, rmSync, statSync } from 'fs';
import { join } from 'path';
import { ProtoToTsExecutorSchema } from './schema';
import { TypescriptMerger } from './typescript-merger';

const clearDirectory = (directory: string) => {
  if (readdirSync(directory).length > 0) {
    readdirSync(directory).forEach((file) => {
      const filePath = join(directory, file);
      rmSync(filePath, { recursive: true, force: true });
    });
  }
};

const generateProtobufs = (input: string, output: string, cwd: string) => {
  execSync(`npx tsproto --path ${input} -o ${output}`, { cwd, stdio: 'inherit' });
};

const removeSubdirectories = (directory: string) => {
  const subdirectories = readdirSync(directory).filter((subdir) => {
    const subdirPath = join(directory, subdir);
    return statSync(subdirPath).isDirectory();
  });

  subdirectories.forEach((subdir) => {
    const subdirPath = join(directory, subdir);
    rmSync(subdirPath, { recursive: true, force: true });
  });
};

const mergeTypeScriptFiles = (directory: string) => {
  new TypescriptMerger(
    readdirSync(directory).map((file) => join(directory, file)),
    join(directory, 'index.ts')
  ).mergeFiles();
};

const removeNonIndexFiles = (directory: string) => {
  readdirSync(directory).forEach((file) => {
    const filePath = join(directory, file);
    if (file !== 'index.ts') {
      rmSync(filePath, { force: true });
    }
  });
};

const runExecutor: PromiseExecutor<ProtoToTsExecutorSchema> = async (
  options: ProtoToTsExecutorSchema,
  context: ExecutorContext
) => {
  const projectRoot = context.workspace.projects[context.projectName].root;
  const output = join(workspaceRoot, projectRoot, options.output);

  clearDirectory(output);
  generateProtobufs(options.input, options.output, join(workspaceRoot, projectRoot));
  removeSubdirectories(output);
  mergeTypeScriptFiles(output);
  removeNonIndexFiles(output);

  return {
    success: true,
  };
};

export default runExecutor;
