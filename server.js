/*
* Create and export server logic
*/

// Absolute dependencies
const http = require('http');
const https = require('https');
const url = require('url');
const fs = require('fs');
const {StringDecoder} = require('string_decoder');

// Relative dependencies
const config = require('./config');
const routers = require('./routers');

// Server logic
const unifiedServer = (req, res) => {
  const parseUrl = url.parse(req.url, true);
  const path = parseUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');
  const method = req.method.toUpperCase();
  const queryString = parseUrl.query;
  const headers = req.headers;
  const decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', data => {
    buffer += decoder.write(data)
  });

  req.on('end', () => {
    buffer += decoder.end();
    const chosenHandler = routers[trimmedPath] ? routers[trimmedPath] : routers.notFound;
    const data = {
      path: trimmedPath,
      queryString,
      method,
      headers,
      payload: buffer,
    };

    chosenHandler(data, (status = 200, payload = {}) => {
      const statusCode = Number.isNaN(Number.parseInt(status, 10)) ? 200 : status;
      const payloadString = JSON.stringify(payload);
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);
      console.log('Returning: ', statusCode, payloadString);
    });
  });
};

// Http server
const httpServer = http.createServer(unifiedServer);

const httpsServerOptions = {
  key: fs.readFileSync('./https/key.pem'),
  cert: fs.readFileSync('./https/cert.pem'),
};

// Https server
const httpsServer = https.createServer(httpsServerOptions, unifiedServer);

const server = {
  start: () => {
    httpServer.listen(config.httpPort, () => console.log('Http server listening on port', config.httpPort));
    httpsServer.listen(config.httpsPort, () => console.log('Https server listening on port', config.httpsPort));
  },
};

module.exports = server;