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
          eventLimit: true,
          events: [
    				{
              id: $scope.sessions[$scope.sessions.length - 1].id,
    					title: $scope.sessions[$scope.sessions.length - 1].name,
    					url: 'http://google.com/',
    					start: "2014-10-09",
              end: "2014-10-09"
    				},
            {
    					title: 'Meeting',
    					start: '2014-09-12T10:30:00',
    					end: '2014-09-12T12:30:00'
    				}
    			]
        }
      };

      $scope.eventSources = [{

      }];
});
