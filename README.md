

# Contents



- ***[Create a web server](./01-setup-webservice.md)***

  > - Create a server with node
  >
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

  

**TODO** 

- [x] Create a web app

- [x] Run prometheus as docker container

- [x] Create dashboard with Grafana

- [x] Persist data on mounted volume 

  - [x] grafana
  - [ ] prometheus

- [ ] Create `docker-compose.yml`

- [ ] Publish metrics of each type 
  - [ ] counter
  - [ ] gauge
  - [ ] histogram
  - [ ] summary 
  - [ ] untyped
  
- [ ] Explore running queries

- [ ] 

- [ ] Simulate

  - [ ] requests per node

  - [ ] incoming request/out-going request latency

    







Checkout :

- https://grafana.com/docs/grafana/latest/administration/configure-docker/
- https://codersociety.com/blog/articles/nodejs-application-monitoring-with-prometheus-and-grafana
- https://github.com/coder-society/nodejs-application-monitoring-with-prometheus-and-grafana



