***[Add custom metrics](./05-custom-metrics.md)***

> 



- ***[Create a web server](./01-setup-webservice.md)***

  > - Create a server with node
  > - Publish default metrics

- ***[Setup Prometheus](./02-setup-prometheus.md)***

  > - Run prometheus with docker
  > - Scrape data from nodejs url
  > - Run a query for metric
  > - Persist prometheus time series data

- ***[Setup Grafana](./03-setup-grafana.md)***

  > - Run Grafana with docker
  > - Add prometheus as data source
  > - Create a dashboard
  > - Mount local dir to persist data

- ***[Dockerize setup](./04-dockerize-setup.md)***

  > - Dockerize web serivce
  > - Create `docker-compose.yml`

- ***[Add custom metrics](./05-custom-metrics.md)***

  > - Create a custom label for all metrics
  > - Create a counter
  > - Create a gauge
  > - Create a historgram 
  > - Create a historgram with percentiles bucket
  > - Create a summary





**TODO** 

- [x] Create a web app

- [x] Run prometheus as docker container

- [x] Create dashboard with Grafana

- [x] Persist data on mounted volume 

  - [x] grafana
  - [x] prometheus

- [x] Create `docker-compose.yml`

- [x] Publish metrics of each type 

  - [x] counter
  - [x] gauge
  - [x] histogram
  - [x] summary 
  - [ ] untyped

- [ ] Visualize a historical data

- [ ] Select dat in range

- [ ] Explore running queries

- [ ] Simulate

  - [ ] requests per node

  - [ ] incoming request/out-going request latency

    







Checkout :

- https://github.com/siimon/prom-client
- https://grafana.com/docs/grafana/latest/administration/configure-docker/
- https://codersociety.com/blog/articles/nodejs-application-monitoring-with-prometheus-and-grafana
- https://github.com/coder-society/nodejs-application-monitoring-with-prometheus-and-grafana



