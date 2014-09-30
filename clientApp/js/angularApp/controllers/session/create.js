'use strict';
   	
var inicialDatePicker, finalDatePicker;

theToolController
  .controller('CreateSessionController', function ($rootScope, $scope, $http, $routeParams, $location, SessionFactory, SpeakerFactory, CompanyFactory) {
	  
	var options = require('./../../../../../options.js');
	$scope.sessions = options.session.kind;
	$scope.searchSpeaker = {};
	$scope.searchCompany = {};
	$scope.speakerList = [{
	    id:"",
	    name:"",
	    position: ""
  	}];
	$scope.companyList = [{
		id : ""
	}];

	SpeakerFactory.Speaker.getAll(function(response) {
	   $scope.speakers = response;
	});

	console.log($scope.speakers);

  $scope.addSpeaker = function() {
    $scope.speakerList.append({
      id:"",
      name:"",
      position: ""
    })
  };

  $scope.addCompany = function() {
    $scope.companyList.append({
    id : ""
    })
  };

  	$scope.speakerSearchboxChanged = function(){
  		console.log($scope.searchSpeaker.name);
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
        

