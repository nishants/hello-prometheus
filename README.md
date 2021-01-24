**TODO** 

- [ ] Create a web app
- [ ] Publish metrics of each type 
  - [ ] counter
  - [ ] gauge
  - [ ] histogram
  - [ ] summary 
  - [ ] untyped
- [ ] Explore running queries
- [ ] Create dashboard with Grafana



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
      res.setHeader('Content-Type', 'text/json');
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

  



Checkout : https://codersociety.com/blog/articles/nodejs-application-monitoring-with-prometheus-and-grafana