const client = require('prom-client');

module.exports = (registry) => {
  // Apply labels
  const defaultLabels = { version: 'v1' };
  registry.setDefaultLabels(defaultLabels);

  // Add a counter that increments every second
  // Counters can increase only
  const counter = new client.Counter({
    name: 'second_increment',
    help: 'Custom: This increments every seconds and then resets at 10 seconds',
  });
  setInterval(() => counter.inc(10), 1000);
  setInterval(() => counter.reset(), 10000);

  registry.registerMetric(counter);
}
