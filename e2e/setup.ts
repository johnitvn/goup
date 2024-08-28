import { setup as setupDevServer } from 'jest-dev-server';

async function globalSetup() {
  console.log('Global setup');
  globalThis.servers = await setupDevServer([
    {
      command: 'pnpm exec nx serve config-service',
      port: 3001,
      protocol: 'tcp',
      debug: true,
      launchTimeout: 20000,
      usedPortAction: 'ask',
    },
    {
      command: 'pnpm exec nx serve gateway-service',
      port: 3000,
      debug: true,
      launchTimeout: 20000,
      usedPortAction: 'ask',
    },
    {
      command: 'pnpm exec nx serve home-site',
      port: 4200,
      debug: true,
      launchTimeout: 20000,
      usedPortAction: 'ask',
    },
  ]);
}

export default globalSetup;
