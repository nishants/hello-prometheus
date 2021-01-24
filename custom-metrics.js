const client = require('prom-client');

module.export = (registry) => {
  // Apply labels
  const defaultLabels = { serviceName: 'api-v1' };
  registry.setDefaultLabels(defaultLabels);
}
