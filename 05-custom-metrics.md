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

