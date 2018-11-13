/*
* Routers and handlers definition
*/

const handlers = {
  ping: (data, callback) => {
    callback(200, {message: 'The server is still alive'});
  },
  hello: (data, callback) => {
    callback(200, {message: 'Welcome to my first home work'});
  },
  notFound: (data, callback) => {
    callback(404, {message: 'Something not right here'});
  },
};

const routers = {
  ping: handlers.ping,
  hello: handlers.hello,
  notFound: handlers.notFound
};

module.exports = routers;