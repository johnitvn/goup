import { formatFiles, generateFiles, Tree } from '@nx/devkit';
import { applicationGenerator } from '@nx/nest';
import { join } from 'path';
import { MicroserviceGeneratorSchema } from './schema';

export async function microserviceGenerator(tree: Tree, options: MicroserviceGeneratorSchema) {
  if (!options.name.endsWith('-service')) {
    throw new Error('Service name must end with "-service"');
  }

  const projectName = options.name;
  const projectRoot = join('apps', 'services', options.name);

  await applicationGenerator(tree, {
    name: projectName,
    directory: projectRoot,
    projectNameAndRootFormat: 'as-provided',
    e2eTestRunner: 'none',
    skipFormat: true,
    skipPackageJson: true,
  });

  generateFiles(tree, join(__dirname, 'files'), projectRoot, { projectName, projectRoot });
  tree.delete(join(projectRoot, 'src', 'app'));
  tree.delete(join(projectRoot, 'src', 'assets'));
  await formatFiles(tree);
}

export default microserviceGenerator;
