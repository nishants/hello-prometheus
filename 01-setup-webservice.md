### Create a node project

```
yarn init
yarn add prom-client
```



### Create a nodejs web server 

- Create an `index.js` file as : 

  ```javascript
  const http = require('http');
  const url = require('url');
  
  const server = http.createServer(async (req, res) => {
    const route = url.parse(req.url).pathname;
    if (route === '/metrics') {
      res.setHeader('Content-Type', 'text/plain');
      return res.end("metrics will come here");
    }
    res.end("I don't have what you want.");
  });
  
  server.listen(8080)
  ```

  

- Update `package.json`

  ```diff
  +  "scripts": {
  +    "start" : "node index.js"
  +  },
  ```



- Now check url http://localhost:8080/metrics, it should show : 

  ```
  metrics will come here
  ```



### Publish default prometheus metric

- Add the prometheus client to project :  https://github.com/siimon/prom-client

  ```
  yarn add prom-client
  ```



- Create a regitery for metrics in `index.js` itself

  ```javascript
  const client = require('prom-client');
  
  // Create registry
  const Registry = client.Registry;
  const registery = new Registry();
  
  // Collect default metrics
  const collectDefaultMetrics = client.collectDefaultMetrics;
  collectDefaultMetrics({ register: registery });
  
  
  const server = http.createServer(async (req, res) => {//....
  ```



- Update the endpoint `/metrics` to publish default metrics captured by the client library: 

  ```diff
  - res.setHeader('Content-Type', 'text/json');
  + res.setHeader('Content-Type', registery.contentType);
  
  - return res.end("metrics will come here");
  + const metrics = await registery.metrics();
  + return res.end(metrics);
  ```

  

- Publish default metrics at http://localhost:8080/metrics

  ```properties
  # HELP process_cpu_user_seconds_total Total user CPU time spent in seconds.
  # TYPE process_cpu_user_seconds_total counter
  process_cpu_user_seconds_total 0.015288
  
  # HELP process_cpu_system_seconds_total Total system CPU time spent in seconds.
  # TYPE process_cpu_system_seconds_total counter
  process_cpu_system_seconds_total 0.003109
  
  # HELP process_cpu_seconds_total Total user and system CPU time spent in seconds.
  # TYPE process_cpu_seconds_total counter
  process_cpu_seconds_total 0.018397
  
  # HELP process_start_time_seconds Start time of the process since unix epoch in seconds.
  # TYPE process_start_time_seconds gauge
  process_start_time_seconds 1611479892
  
  # HELP process_resident_memory_bytes Resident memory size in bytes.
  # TYPE process_resident_memory_bytes gauge
  process_resident_memory_bytes 29622272
  
  # HELP nodejs_eventloop_lag_seconds Lag of event loop in seconds.
  # TYPE nodejs_eventloop_lag_seconds gauge
  nodejs_eventloop_lag_seconds 0
  
  # HELP nodejs_eventloop_lag_min_seconds The minimum recorded event loop delay.
  # TYPE nodejs_eventloop_lag_min_seconds gauge
  nodejs_eventloop_lag_min_seconds 0.010010624
  
  # HELP nodejs_eventloop_lag_max_seconds The maximum recorded event loop delay.
  # TYPE nodejs_eventloop_lag_max_seconds gauge
  nodejs_eventloop_lag_max_seconds 0.017612799
  
  # HELP nodejs_eventloop_lag_mean_seconds The mean of the recorded event loop delays.
  # TYPE nodejs_eventloop_lag_mean_seconds gauge
  nodejs_eventloop_lag_mean_seconds 0.011515829527272727
  
  # HELP nodejs_eventloop_lag_stddev_seconds The standard deviation of the recorded event loop delays.
  # TYPE nodejs_eventloop_lag_stddev_seconds gauge
  nodejs_eventloop_lag_stddev_seconds 0.001166459019883898
  
  # HELP nodejs_eventloop_lag_p50_seconds The 50th percentile of the recorded event loop delays.
  # TYPE nodejs_eventloop_lag_p50_seconds gauge
  nodejs_eventloop_lag_p50_seconds 0.011591679
  
  # HELP nodejs_eventloop_lag_p90_seconds The 90th percentile of the recorded event loop delays.
  # TYPE nodejs_eventloop_lag_p90_seconds gauge
  nodejs_eventloop_lag_p90_seconds 0.012656639
  
  # HELP nodejs_eventloop_lag_p99_seconds The 99th percentile of the recorded event loop delays.
  # TYPE nodejs_eventloop_lag_p99_seconds gauge
  nodejs_eventloop_lag_p99_seconds 0.012697599
  
  # HELP nodejs_active_handles Number of active libuv handles grouped by handle type. Every handle type is C++ class name.
  # TYPE nodejs_active_handles gauge
  nodejs_active_handles{type="WriteStream"} 2
  nodejs_active_handles{type="ReadStream"} 1
  nodejs_active_handles{type="Server"} 1
  nodejs_active_handles{type="Socket"} 2
  
  # HELP nodejs_active_handles_total Total number of active handles.
  # TYPE nodejs_active_handles_total gauge
  nodejs_active_handles_total 6
  
  # HELP nodejs_active_requests Number of active libuv requests grouped by request type. Every request type is C++ class name.
  # TYPE nodejs_active_requests gauge
  
  # HELP nodejs_active_requests_total Total number of active requests.
  # TYPE nodejs_active_requests_total gauge
  nodejs_active_requests_total 0
  
  # HELP nodejs_heap_size_total_bytes Process heap size from Node.js in bytes.
  # TYPE nodejs_heap_size_total_bytes gauge
  nodejs_heap_size_total_bytes 9187328
  
  # HELP nodejs_heap_size_used_bytes Process heap size used from Node.js in bytes.
  # TYPE nodejs_heap_size_used_bytes gauge
  nodejs_heap_size_used_bytes 5821536
  
  # HELP nodejs_external_memory_bytes Node.js external memory size in bytes.
  # TYPE nodejs_external_memory_bytes gauge
  nodejs_external_memory_bytes 1473015
  
  # HELP nodejs_heap_space_size_total_bytes Process heap space size total from Node.js in bytes.
  # TYPE nodejs_heap_space_size_total_bytes gauge
  nodejs_heap_space_size_total_bytes{space="read_only"} 122880
  nodejs_heap_space_size_total_bytes{space="new"} 4194304
  nodejs_heap_space_size_total_bytes{space="old"} 3551232
  nodejs_heap_space_size_total_bytes{space="code"} 339968
  nodejs_heap_space_size_total_bytes{space="map"} 528384
  nodejs_heap_space_size_total_bytes{space="large_object"} 401408
  nodejs_heap_space_size_total_bytes{space="code_large_object"} 49152
  nodejs_heap_space_size_total_bytes{space="new_large_object"} 0
  
  # HELP nodejs_heap_space_size_used_bytes Process heap space size used from Node.js in bytes.
  # TYPE nodejs_heap_space_size_used_bytes gauge
  nodejs_heap_space_size_used_bytes{space="read_only"} 118840
  nodejs_heap_space_size_used_bytes{space="new"} 1358256
  nodejs_heap_space_size_used_bytes{space="old"} 3423672
  nodejs_heap_space_size_used_bytes{space="code"} 80736
  nodejs_heap_space_size_used_bytes{space="map"} 459000
  nodejs_heap_space_size_used_bytes{space="large_object"} 393272
  nodejs_heap_space_size_used_bytes{space="code_large_object"} 2784
  nodejs_heap_space_size_used_bytes{space="new_large_object"} 0
  
  # HELP nodejs_heap_space_size_available_bytes Process heap space size available from Node.js in bytes.
  # TYPE nodejs_heap_space_size_available_bytes gauge
  nodejs_heap_space_size_available_bytes{space="read_only"} 0
  nodejs_heap_space_size_available_bytes{space="new"} 736592
  nodejs_heap_space_size_available_bytes{space="old"} 2448
  nodejs_heap_space_size_available_bytes{space="code"} 0
  nodejs_heap_space_size_available_bytes{space="map"} 0
  nodejs_heap_space_size_available_bytes{space="large_object"} 0
  nodejs_heap_space_size_available_bytes{space="code_large_object"} 0
  nodejs_heap_space_size_available_bytes{space="new_large_object"} 2094848
  
  # HELP nodejs_version_info Node.js version info.
  # TYPE nodejs_version_info gauge
  nodejs_version_info{version="v14.5.0",major="14",minor="5",patch="0"} 1
  
  # HELP nodejs_gc_duration_seconds Garbage collection duration by kind, one of major, minor, incremental or weakcb.
  # TYPE nodejs_gc_duration_seconds histogram
  ```

  