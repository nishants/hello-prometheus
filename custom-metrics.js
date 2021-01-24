const client = require('prom-client');

module.exports = (registry) => {
  // Apply labels
  const defaultLabels = { version: 'v1' };
  registry.setDefaultLabels(defaultLabels);

  // Add a counter that increments every second
  // Counters can increase only
  const counter = new client.Counter({
    name: 'custom_increment',
    help: 'Custom: This increments every seconds and then resets at 100 seconds',
  });
  setInterval(() => counter.inc(10), 1000);
  setInterval(() => counter.reset(), 100000);

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

  // Add a histogram without buckets
  const histogram = new client.Histogram({
    name: 'custom_historgram_no_buckets',
    help: 'Custom: Random values in histogram with no buckets',
  });
  setInterval(() => histogram.observe(Math.floor(Math.random() * 100)));
  registry.registerMetric(histogram);

  // Add a histogram with buckets
  const histogramWithBucket = new client.Histogram({
    name: 'custom_historgram_with_buckets',
    help: 'Custom: Random values in histogram with buckets "percentiles: [0.1,0.25, 0.5, 0.9, 0.99]"',
    percentiles: [0.1,0.25, 0.5, 0.9, 0.99],
  });
  setInterval(() => histogramWithBucket.observe(Math.floor(Math.random() * 1000)));
  registry.registerMetric(histogramWithBucket);

  // Add a summary
  const summary = new client.Summary({
    name: 'custom_summary',
    help: 'Custom: summary with random values',
    maxAgeSeconds: 600,
    ageBuckets: 5,
  });
  setInterval(() => summary.observe(Math.floor(Math.random() * 100)));
  registry.registerMetric(summary);
}
