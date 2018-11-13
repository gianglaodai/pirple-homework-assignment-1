/*
* Create and export configuration variables
*/

// Create container for all the environments

const environments = {
  staging: {
    httpPort: 3000,
    httpsPort: 3001,
    name: 'staging',
  },
  production: {
    httpPort: 5000,
    httpsPort: 5001,
    name: 'production',
  },
};

// Get the current environment from command-line arguments
const currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase(): '';

// Determine which environment will be used.
const environmentToExport =  environments[currentEnvironment] ? environments[currentEnvironment]: environments.staging;

module.exports = environmentToExport;