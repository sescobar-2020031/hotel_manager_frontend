// `ng build --development` replaces `environment.ts` with `environment.dev.ts`.
// The list of file replacements can be found in `angular.json`.

// A proxy server was configured to change localhost:4200 to https://empresa.edgenexa.com and it is found in proxy.confg.json.

// Global variables
import { environment as baseEnvironment } from './environment.base';

export const environment = {
  ...baseEnvironment,
  apiKey: 'Pruebas123456789',
  production: false
}

// Export missing constants
export * from './environment.base';
