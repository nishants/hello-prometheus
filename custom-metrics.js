const client = require('prom-client');

module.exports = (registry) => {
  // Apply labels
  const defaultLabels = { version: 'v1' };
  registry.setDefaultLabels(defaultLabels);

  // Add a counter that increments every second
  // Counters can increase only
  const counter = new client.Counter({
    name: 'custom_increment',
    help: 'Custom: This increments every seconds and then resets at 10 seconds',
  });
  setInterval(() => counter.inc(10), 1000);
  setInterval(() => counter.reset(), 10000);

  registry.registerMetric(counter);

  // Add a gauge metric
  // This can increase or decrease
  const gauge = new client.Gauge({
    name: 'custom_gauge',
    help: 'Custom: This increments every 1 second, reduces every 5 seconds by 2 and resets every 10 seconds'
  });

  setInterval(() => gauge.inc(1), 1000);
  setInterval(() => gauge.dec(10), 5000);
  setInterval(() => gauge.set(0), 10000);

  registry.registerMetric(gauge);
}
