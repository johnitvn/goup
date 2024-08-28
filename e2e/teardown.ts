import { teardown as teardownDevServer } from 'jest-dev-server';

async function globalTeardown() {
  console.log('Global teardown');
  await teardownDevServer(globalThis.servers);
  console.log('Server killed');
}

export default globalTeardown;
