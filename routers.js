/*
* Routers and handlers definition
*/

const handlers = {
  ping: (data, callback) => {
    callback(200);
  },
  hello: (data, callback) => {
    callback(200);
  },
  notFound: (data, callback) => {
    callback(404);
  },
};

const routers = {
  ping: handlers.ping,
  hello: handlers.hello,
  notFound: handlers.notFound
};

module.exports = routers;