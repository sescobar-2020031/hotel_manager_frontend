// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Global variables
import { environment as baseEnvironment } from './environment.base';


export const environment = {
  ...baseEnvironment,
  apiKey: '"h-kCE_?zi@)IyWj~KH->9eHtF~a<%%6K9bgu5]LSZV6P:kODigM,#e%]7?3zmqXZVT#abak!d123ds%%undwKBC!"',
  production: true
}

// Export missing constants
export * from './environment.base';
