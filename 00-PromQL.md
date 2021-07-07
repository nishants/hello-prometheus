TODO 

- [ ] Four expression types

  > instant vector, range vector, scalar (number), string

- [ ] **String literal**

  > ```
  > "Double quote with escapre chars \t \\  \n"
  > `BackTick does not support escapre chars \t \\  \n`
  > ```

- [ ] **Float Literals**

  > Examples
  > ```
  > 23
  > -2.43
  > 3.4e-9
  > 0x8f
  > -Inf
  > NaN
  > ```
  
- [ ] Comments 

  >   ```
  >   # This is a comment
  >   ```

- [ ] **Empy label values in vector selector**: will select all values where the label is missing

- [ ] **Metrics vs Labels**

- [ ] [Staleness](https://prometheus.io/docs/prometheus/latest/querying/basics/#staleness) 

- [ ] [Operators](https://prometheus.io/docs/prometheus/latest/querying/operators/)

- [ ] ##  Aggregation operators

- [ ] [Query Functions](https://prometheus.io/docs/prometheus/latest/querying/functions/)

- [ ] [Query Examples](https://prometheus.io/docs/prometheus/latest/querying/examples/)



### **Time series Selectors**

For election of a set of time series and a single sample value for each at a given timestamp (instant):

Can be filtered by comma separated list of label matchers in curly braces (`{}`).

```
http_requests_total{job="prometheus",group="canary"}
```



 **Supports regex**

Supported regex syntax is **RE2Syntax**:  https://github.com/google/re2/wiki/Syntax

 - `=`: Select labels that are exactly equal to the provided string.
 - `!=`: Select labels that are not equal to the provided string.
 - `=~`: Select labels that regex-match the provided string.
 - `!~`: Select labels that do not regex-match the provided string.

 For example, this selects all `http_requests_total` time series for `staging`, `testing`, and `development` environments and HTTP methods other than `GET`

 ```
 http_requests_total{environment=~"staging|testing|development",method!="GET"}
 ```

**Empy label values in vector selector**: will select all values where the label is missing



 **Vectro selector** (selecting label values)

 - Must not match empty string (else it will select values where the label is missing)

   ```yaml
   {job=~".*"} # Bad! (selects values where label is missing)
   {job=~".+"} # Good!
   ```



**Using metric name as label**

- Instead of metric name, we can use `__name__` label in vector selector. 
- i.e. `http_requests_total` is equivalent to `{__name__="http_requests_total"}`
- This helps when
  - We need regex for metric `{__name__=~"job:.*"}`
  - We need to use metric where name is reserved keyword like `bool`, `on`, `ignoring`, `group_left` and `group_right`.



### Selecting range of values

- **Range Vector Selectors** 

  > Select range of values back ***from current instant***
  >
  > Time duration appended to expression with `[]`
  >
  > e.g. 
  >
  > ```
  > http_requests_total{job="prometheus"}[5m]    # from 5 min ago to now
  > http_requests_total{job="prometheus"}[1h30m]
  > ```

  

- **Offset Modifier**

  > ***Disabled by default `--enable-feature=promql-negative-offset`***
  >
  > Set current instant to offset in past
  >
  > ```
  > http_requests_total offset 5m # Till 5 min ago
  > ```
  >
  > 
  >
  > ```
  > # Should follow the selector immediately
  > sum(http_requests_total{method="GET"} offset 5m) // GOOD.
  > sum(http_requests_total{method="GET"}) offset 5m // INVALID.
  > ```
  >
  > 
  >
  > Can be used along with Range 
  >
  > ```
  > # Duration of 5 minutes, 1 week ago 
  > rate(http_requests_total[5m] offset 1w)
  > ```

  

- **`@` Modifier**

  > ***Disabled by defualt `--enable-feature=promql-at-modifier`***
  >
  > Set current instant to specific time. Can be used along with range vector.
  >
  > Uses ***unix timestamp***
  >
  > ```
  > # Should follow the selector immediately
  > sum(http_requests_total{method="GET"} @ 1609746000) // GOOD.
  > sum(http_requests_total{method="GET"}) @ 1609746000 // INVALID.
  > ```
  >
  > Use along with range
  >
  > ```
  > rate(http_requests_total[5m] @ 1609746000)
  > ```
  >
  > 







**Time durations**

- `ms` - milliseconds
- `s` - seconds
- `m` - minutes
- `h` - hours
- `d` - days - assuming a day has always 24h
- `w` - weeks - assuming a week has always 7d
- `y` - years - assuming a year has always 365d



## Aggregation operators

Prometheus supports the following built-in aggregation operators that can be used to aggregate the elements of a single instant vector, resulting in a new vector of fewer elements with aggregated values:

- `sum` (calculate sum over dimensions)
- `min` (select minimum over dimensions)
- `max` (select maximum over dimensions)
- `avg` (calculate the average over dimensions)
- `group` (all values in the resulting vector are 1)
- `stddev` (calculate population standard deviation over dimensions)
- `stdvar` (calculate population standard variance over dimensions)
- `count` (count number of elements in the vector)
- `count_values` (count number of elements with the same value)
- `bottomk` (smallest k elements by sample value)
- `topk` (largest k elements by sample value)
- `quantile` (calculate φ-quantile (0 ≤ φ ≤ 1) over dimensions)

```yaml
# Given http_requests_total has three labels application, instance, and group 

# Then following are same : 
sum without (instance) (http_requests_total)
sum by (application, group) (http_requests_total)
```



### Sample queries

```yaml
#5 largest HTTP requests counts across all instances
topk(5, http_requests_total)

# calculate the average request duration during the last 5 minute from a histogram or summary
rate(http_request_duration_seconds_sum[5m])

# Relative amount of requests served within 300ms
sum(rate(http_request_duration_seconds_bucket{le="0.3"}[5m]))

# Service runs replicated with a number of instances, you will collect request durations from every single one of them, and then you want to aggregate everything into an overall 95th percentile.
histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le)) 

# Usng regex
http_requests_total{job=~".*server"}

# Return the 5-minute rate of the http_requests_total metric for the past 30 minutes
rate(http_requests_total[5m])[30m:1m]

# Return the per-second rate over the last 5 minutes:
rate(http_requests_total[5m])

# Get request for each instance
sum by (instance) (
  rate(http_requests_total[5m])
)

# The unused memory in MiB for every instance (given both metrics have same label)
(instance_memory_limit_bytes - instance_memory_usage_bytes) / 1024 / 1024

# Get top cpu users app and processes
topk(3, sum by (app, proc) (rate(instance_cpu_time_ns[5m])))

# Assuming this metric contains one time series per running instance, you could count the number of running instances per application like this:
count by (app) (instance_cpu_time_ns)
```





### Quiz

- What will be result of giving an empty label value `http_requests_total{environment=~""}`

  > Will select all values where the label is missing

- Why is the vector selector bad : `{job=~".*"}`

  > This will select the values where job is missing. Correct way should be `{job=~".+"}`

- What is the difference between **Range Vector** `[5m]`and **Offset Modifier** `offset 5m`

  > **Range** : Select values since 5m ago to current instant
  >
  > **Offset** : Set current instant to 5 minutes in past

