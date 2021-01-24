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