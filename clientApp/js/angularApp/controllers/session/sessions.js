'use strict';

theToolController
  .controller('SessionsController', function ($rootScope, $scope, $location, $window, $routeParams, $sce, SessionFactory){

      /* config object */
      $scope.uiConfig = {
        calendar:{
          height: 450,
          editable: true,
          header:{
            left: 'prev, next today',
            center: 'title',
            right: 'month,basicWeek,basicDay'
          },
          dayClick: $scope.alertEventOnClick,
          eventDrop: $scope.alertOnDrop,
          eventResize: $scope.alertOnResize,
          eventClick: $scope.eventClick,
          eventLimit: true,
        }
      };

      $scope.events = [{
        id: $scope.sessions[$scope.sessions.length - 1].id ,
        title: $scope.sessions[$scope.sessions.length - 1].name,
        start: $scope.sessions[$scope.sessions.length - 1].initialDate,
        end: $scope.sessions[$scope.sessions.length - 1].finalDate,
        url: "#/session/" + $scope.sessions[$scope.sessions.length - 1]._id
      }]

      console.log($scope.events)
      $scope.eventSources = [$scope.events];
});
