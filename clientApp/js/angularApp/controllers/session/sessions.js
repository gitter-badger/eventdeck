'use strict';

theToolController
.controller('SessionsController', function ($rootScope, $scope, $location, $window, $routeParams, $sce, SessionFactory){

  //================================INITIALIZATION================================
  var options = require('./../../../../../options.js');
  $scope.eventSources = [];

  /* config object */
  $scope.uiConfig = {
    calendar:{
      height: 650,
      eventLimit: true,
      header:{
        left: 'prev, next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      }
    }
  };

  //===================================FUNCTIONS===================================

  var getKindColor = function(id) {
    for(var i = 0; i < options.session.kind.length; i++) {
      if(options.session.kind[i].id == id) {
        return options.session.kind[i].color;
      } 
    }
  }

  var getSessions = function() {
    var events = [];
    if($scope.sessions){
      for(var i = 0; i < $scope.sessions.length; i++){
        events.push({
          id: $scope.sessions[i].id ,
          title: $scope.sessions[i].name,
          allDay: $scope.sessions[i].allDay,
          color: getKindColor($scope.sessions[i].kind),
          start: new Date($scope.sessions[i].initialDate),
          end: new Date($scope.sessions[i].finalDate),
          url : "#/session/" + $scope.sessions[i]._id
        })
      }
      return events
    }
  }

  //================================SCOPE FUNCTIONS================================

  $scope.eventSources.push(getSessions());

});
