'use strict';
   	
var inicialDatePicker, finalDatePicker;

theToolController
  .controller('CreateSessionController', function ($rootScope, $scope, $http, $routeParams, $location, SessionFactory, SpeakerFactory) {
	  
	var options = require('./../../../../../options.js');
	$scope.sessions = options.session.kind;
	$scope.speakers = [{
    id:"",
    name:"",
    position: ""
  }];
  $scope.companies = [{
    id : ""
  }];


  $scope.addSpeaker = function() {
    $scope.speakers.append({
      id:"",
      name:"",
      position: ""
    })
  };

  $scope.addCompany = function() {
    $scope.companies.append({
    id : ""
    })
  };


	var updateSpeakers = function(){
      SpeakerFactory.Speaker.getAll(function (speakers) {
        $scope.speakers = speakers;
      });
    }

   	updateSpeakers()
	
   	Ink.requireModules(['Ink.Dom.Selector_1','Ink.UI.DatePicker_1'],function(Selector, DatePicker){
            inicialDatePicker = new DatePicker('#inicialDatePicker');
            finalDatePicker = new DatePicker('#finalDatePicker');
    });
});
        

