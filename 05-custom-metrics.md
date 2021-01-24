see : https://github.com/siimon/prom-client



### Apply label to all metrics 

```javascript
const defaultLabels = { version: 'v1' };
registry.setDefaultLabels(defaultLabels);
```



Now check the http://localhost:8080/metrics, all metrics will have this label

For e.g. this is useful when we need to keep the kubernetes pod name/ cluster name 

```diff
- process_cpu_user_seconds_total 0.028964
+ process_cpu_user_seconds_total{version="v1"} 0.028964
```



### Add a counter metric

```javascript
  // Add a counter that increments every second
  // Counters can increase only
  const counter = new client.Counter({
    name: 'second_increment',
    help: 'Custom: This increments every seconds and then resets at 10 seconds',
  });
  setInterval(() => counter.inc(10), 1000);
  setInterval(() => counter.reset(), 10000);

  registry.registerMetric(counter);
```



Published as : 

```properties
# HELP second_increment This increments every seconds and then resets at 10 seconds
# TYPE second_increment counter
second_increment{version="v1"} 50
```



### Add a Gauge metric

```javascript
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
```



This is published as: 

```properties

# HELP custom_gauge Custom: This increments every 1 second, reduces every 5 seconds by 2 and resets every 10 seconds
# TYPE custom_gauge gauge
custom_gauge{version="v1"} -8
```





### Histogram

- Histograms track sizes and frequency of events.

- **histogram** is an approximate representation of the [distribution](https://en.wikipedia.org/wiki/Frequency_distribution) of numerical data

  ![img](docs/images/Symmetric2.png)

```javascript
const histogramWithBucket = new client.Histogram({
  name: 'custom_historgram_with_buckets',
  help: 'Custom: Random values in histogram with buckets',
  percentiles: [0.1,0.25, 0.5, 0.9, 0.99],
});
setInterval(() => histogramWithBucket.observe(Math.floor(Math.random() * 1000)));
registry.registerMetric(histogramWithBucket);
```



This is published as : 

```properties
# HELP custom_historgram_with_buckets Custom: Random values in histogram with buckets "percentiles: [0.1,0.25, 0.5, 0.9, 0.99]"
# TYPE custom_historgram_with_buckets histogram
custom_historgram_with_buckets_bucket{le="0.005",version="v1"} 37
custom_historgram_with_buckets_bucket{le="0.01",version="v1"} 37
custom_historgram_with_buckets_bucket{le="0.025",version="v1"} 37
custom_historgram_with_buckets_bucket{le="0.05",version="v1"} 37
custom_historgram_with_buckets_bucket{le="0.1",version="v1"} 37
custom_historgram_with_buckets_bucket{le="0.25",version="v1"} 37
custom_historgram_with_buckets_bucket{le="0.5",version="v1"} 37
custom_historgram_with_buckets_bucket{le="1",version="v1"} 63
custom_historgram_with_buckets_bucket{le="2.5",version="v1"} 96
custom_historgram_with_buckets_bucket{le="5",version="v1"} 188
custom_historgram_with_buckets_bucket{le="10",version="v1"} 350
custom_historgram_with_buckets_bucket{le="+Inf",version="v1"} 32252
custom_historgram_with_buckets_sum{version="v1"} 16023700
custom_historgram_with_buckets_count{version="v1"} 32252
```





### Summary

- Used for sliding window observation

- Pretty much like historgram but use if for more temporary trends 

- e.g. like heartbreat live monitor where we just want to know how heartbreat is trending in last 5 minutes and not interested in last 1 day 

  ```javascript
  // Add a summary
  const summary = new client.Summary({
    name: 'custom_summary',
    help: 'Custom: summary with random values',
    maxAgeSeconds: 600,
    ageBuckets: 5,
  });
  setInterval(() => summary.observe(Math.floor(Math.random() * 100)));
  registry.registerMetric(summary);
  ```

  

- This is published as : 

  ```properties
  # HELP custom_summary Custom: summary with random values
  # TYPE custom_summary summary
  custom_summary{quantile="0.01",version="v1"} 0.528
  custom_summary{quantile="0.05",version="v1"} 4.697297297297297
  custom_summary{quantile="0.5",version="v1"} 48.48780487804878
  custom_summary{quantile="0.9",version="v1"} 89.30217391304348
  custom_summary{quantile="0.95",version="v1"} 94.29148936170213
  custom_summary{quantile="0.99",version="v1"} 98.51644444444445
  custom_summary{quantile="0.999",version="v1"} 99
  custom_summary_sum{version="v1"} 216748
  custom_summary_count{version="v1"} 4426
  ```

  



