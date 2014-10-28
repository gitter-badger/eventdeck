var Hapi = require('hapi');
var SocketIO = {server: require('socket.io'), client: require('socket.io-client')};
var log = require('server/helpers/logger');
var config = require('config');
var cookieConfig = config.cookie;

log.info('### Starting EventDeck ###');

var server = module.exports.hapi = new Hapi.Server(config.port);

require('./db');

server.pack.register([
    { plugin: require('hapi-swagger'), options: config.swagger }, 
    require('hapi-auth-cookie'),
  ], 
  function (err) {

  server.auth.strategy('session', 'cookie', {
    cookie: cookieConfig.name,
    password: cookieConfig.password,
    ttl: 2592000000,
/*  appendNext: true,
    redirectTo: '/login',
    redirectOnTry: true,
    isSecure: false,
    isHttpOnly: false,*/
    isSecure: false,
  });

  var webSocket = module.exports.webSocket = {
    server: SocketIO.server.listen(server.listener)
  };
  log.info('Websocket server started at: ' + server.info.uri);
  require('./sockets');
  webSocket.client = module.exports.webSocket.client = SocketIO.client.connect('http://localhost:' + server.info.port);

  require('./resources');
  require('./routes');
  
  if (!module.parent) {
    server.start(function () {
      log.info('Server started at: ' + server.info.uri);
      // var crono  = require('./scripts/crono');
      // var reminders = require('./resources/reminder');
      // reminders(null, function(stuff){});
      // crono.reminder.start();
    });
  }
});
