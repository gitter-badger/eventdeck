var server = require('./../index.js');

var publicAssets = { 
  method: 'GET', 
  path: '/{path*}', 
  config: {
    auth: true,
    handler: {
      directory: { 
        path: './public/', 
        listing: true, 
        index: true 
      }
    }
  } 
}

server.route(publicAssets);