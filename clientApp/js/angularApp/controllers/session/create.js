'use strict';
   	
var inicialDatePicker, finalDatePicker;

theToolController
  .controller('CreateSessionController', function ($rootScope, $scope, $http, $routeParams, $location, SessionFactory, SpeakerFactory, CompanyFactory) {
	  
	var options = require('./../../../../../options.js');
	$scope.sessions = options.session.kind;
	$scope.speakersList = [{
	    id:"",
	    name:"",
	    position: ""
  	}];

	$scope.companiesList = [{
		id: "",
    name: ""
	}];

	SpeakerFactory.Speaker.getAll(function(response) {
	   $scope.speakers = response;
	});

  $scope.addSpeaker = function() {
    $scope.speakersList.push({
      id:"",
      name:"",
      position: ""
    });
  };

  $scope.removeSpeaker = function(speaker) {
    var index = -1; 
    console.log(speaker);
    for (var i = 0; i < $scope.speakersList.length; i++) {
        if ($scope.speakersList[i].id == speaker.id && $scope.speakersList[i].name == speaker.name && $scope.speakersList[i].position == speaker.position) {
            index = i;
        }
    }
	if(index > -1){
    	$scope.speakersList.splice(index,1);
	}
  }

  $scope.addCompany = function() {
    $scope.companiesList.append({
    id : ""
    })
  };

  $scope.printSpeakersListed = function(){
  	console.log($scope.speakersList);
  }

  $scope.teste = function(speaker) {
    console.log(speaker);
  }

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
        

