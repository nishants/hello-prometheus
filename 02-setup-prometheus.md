### Create `prometheus.yml` 

```yaml
global:
  scrape_interval: 5s
scrape_configs:
  - job_name: "nodejs-app"
    static_configs:
      - targets: ["host.docker.internal:8080"]
```



### Run prometheus with custom configuration

```bash
# Ensure that correct yaml file is mounted to /etc/prometheus/prometheus.yml
docker run \
    -p 9090:9090 \
    -v $(pwd)/prometheus.yml:/etc/prometheus/prometheus.yml \
    prom/prometheus
```

Check dashboard at [http://localhost:9090](http://localhost:9090)



### Run a query 

- In prometheus dashboard, type `nodejs_heap_space_size_available_bytes` in search and enter

![image-20210124150956066](docs/images/image-20210124150956066.png)