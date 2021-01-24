see : https://github.com/siimon/prom-client



### Apply label to all metrics 

```javascript
const defaultLabels = { serviceName: 'api-v1' };
registry.setDefaultLabels(defaultLabels);
```



Now check the http://localhost:8080/metrics, all metrics will have this label

For e.g. this is useful when we need to keep the kubernetes pod name/ cluster name 

```diff
- process_cpu_user_seconds_total 0.028964
+ process_cpu_user_seconds_total{serviceName="api-v1"} 0.028964
```



Add a counter metric

```
const counter = new client.Counter({
  name: 'metric_name',
  help: 'metric_help',
});
counter.inc(); // Increment by 1
counter.inc(10); // Increment by 10
```

