import { Tree, readProjectConfiguration } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { microserviceGenerator } from './generator';
import { MicroserviceGeneratorSchema } from './schema';

describe('libs/services/nx-service/src/generators/microservice/microservice generator', () => {
  let tree: Tree;
  const options: MicroserviceGeneratorSchema = { name: 'test-service' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await microserviceGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test-service');
    expect(config).toBeDefined();
  });
});
