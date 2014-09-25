var Notification = require('../../db/models/notification');
var log = require('../../helpers/logger');

module.exports = list;

function list(request, reply) {

  Notification.findAll(function (err, result) {
    if (err) {
      log.error({err: err, username: request.auth.credentials.id}, '[notification] error listing notifications');
      return reply({error: 'There was an error getting all the notifications.'});
    }

    result = result.sort(function (o1, o2) {
    	return Date.parse(o2.posted) - Date.parse(o1.posted);
    });

    var i = 0;

    result = result.filter(function (o) {
    	return (o.targets.indexOf(request.auth.credentials.id) !== -1 && o.unread.indexOf(request.auth.credentials.id) !== -1) || i++ < 50;
    });

    reply(result);
  });

}
