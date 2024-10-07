import { formatFiles, generateFiles, Tree } from '@nx/devkit';
import { applicationGenerator } from '@nx/nest';
import { join } from 'path';
import { MicroserviceGeneratorSchema } from './schema';
/**
 * Generates a new microservice project within the Nx workspace.
 *
 * This function performs the following steps:
 * 1. Validates that the service name ends with "-service".
 * 2. Defines the project name and root directory based on the provided options.
 * 3. Invokes the `applicationGenerator` to scaffold the new application.
 * 4. Generates additional files from a template.
 * 5. Deletes unnecessary directories (`src/app` and `src/assets`).
 * 6. Formats the generated files.
 *
 * @param tree - The file system tree representing the current state of the workspace.
 * @param options - The schema containing options for the microservice generator.
 * @throws {Error} If the service name does not end with "-service".
 */
export async function microserviceGenerator(tree: Tree, options: MicroserviceGeneratorSchema) {
  if (!options.name.endsWith('-service')) {
    throw new Error('Service name must end with "-service"');
  }

  const projectRoot = join('apps', 'services', options.name);

  await applicationGenerator(tree, {
    name: options.name,
    directory: projectRoot,
    projectNameAndRootFormat: 'as-provided',
    e2eTestRunner: 'none',
    skipFormat: true,
    skipPackageJson: true,
  });

  generateFiles(tree, join(__dirname, 'files'), projectRoot, { projectName: options.name, projectRoot });
  ['src/app', 'src/assets'].forEach((path) => tree.delete(join(projectRoot, path)));
  await formatFiles(tree);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default microserviceGenerator;
