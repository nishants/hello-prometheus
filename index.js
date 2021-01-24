const http = require('http');
const url = require('url');
const client = require('prom-client');

// Create registry
const Registry = client.Registry;
const registery = new Registry();

// Collect default metrics
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: registery });

const server = http.createServer(async (req, res) => {
  const route = url.parse(req.url).pathname;
  if (route === '/metrics') {
    res.setHeader('Content-Type', registery.contentType);
    const metrics = await registery.metrics();
    return res.end(metrics);
  }
  res.end("I don't have what you want.");
});

server.listen(8080)