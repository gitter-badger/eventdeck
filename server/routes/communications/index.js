var server = require('server').hapi;
var handlers = require('./handlers');


server.route({
  method: 'GET',
  path: '/api/communications',
  config: handlers.list
});

server.route({
  method: 'GET',
  path: '/api/communications/{id}',
  config: handlers.get
});

server.route({
  method: 'POST',
  path: '/api/communications',
  config: handlers.create
});

server.route({
  method: 'PUT',
  path: '/api/communications/{id}',
  config: handlers.update
});

server.route({
  method: 'DELETE',
  path: '/api/communications/{id}',
  config: handlers.remove
});

server.route({
  method: 'GET',
  path: '/api/companies/{id}/communications',
  config: handlers.getByThread
});

server.route({
  method: 'GET',
  path: '/api/speakers/{id}/communications',
  config: handlers.getByThread
});

server.route({
  method: 'GET',
  path: '/api/members/{id}/communications',
  config: handlers.getByMember
});

server.route({
  method: 'GET',
  path: '/api/events/{id}/communications',
  config: handlers.getByEvent
});

