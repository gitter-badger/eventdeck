'use strict';

theToolController
.controller('SessionController', function ($rootScope, $scope, $http, $routeParams, $location, SessionFactory) {

  //================================INITIALIZATION================================

  var options = require('./../../../../../options.js');
  var initialDatePicker;
  var finalDatePicker;
  var myValidator;
  $scope.formData = {
  	name: "",
  	kind: "",
  	url: "",
  	place: "",
  	description: "",
  	allDay: false,
  	speakersList: [{
  		id: "",
  		name: "",
  		position: "",
  		show: false
  	}],
  	companiesList: [{
  		id: "",
  		name: "",
  		show: false
  	}],
  	initialDate: {
  		hours: undefined,
  		minutes: undefined,
  		date: new Date(),
  	},
  	finalDate: {
  		hours: undefined,
  		minutes: undefined,
  		date: new Date(),
  	}
  }

  $scope.hoursList = [];
  $scope.minutesList = [];
  $scope.sessionsKind = options.session.kind;


  var init = function() {

  	for(var i = 0; i <= 23; i++){
  		$scope.hoursList.push(i);
  	}
  	for(var i = 0; i <= 59; i+=5){
  		$scope.minutesList.push(i);
  	}

  	if ($routeParams.id !== undefined) {
  		var session = $scope.getSession($routeParams.id);

  		$scope.formData = {
  			name: session.name,
  			kind: session.kind,
  			img: session.img,
  			place: session.place,
  			description: session.description,
  			allDay: session.allDay,
  			speakersList: session.speakers,
  			companiesList: session.companies,
  			initialDate: session.initialDate,
  			finalDate: session.finalDate
  		};
  		$scope.date.initialDate = session.initialDate;
  		$scope.date.finalDate = session.finalDate;
  	}
  }


  init();

  //================================SCOPE FUNCTIONS================================

  $scope.addSpeakerRow = function ()  {
  	$scope.formData.speakersList.push({
  		id: "",
  		name: "",
  		position: "",
  		show: false
  	});
  };

  $scope.removeSpeakerRow = function (speaker) {
  	var testToRemove = function(el1, el2){
  		if(el1.id == el2.id && el1.name == el2.name && el1.position == el2.position){
  			return true;
  		}
  		return false;
  	}
  	removeElementFromList($scope.formData.speakersList, speaker, testToRemove);
  };

  $scope.addSpeaker = function(idx, name, id) {
  	$scope.formData.speakersList[idx].name = name;
  	$scope.formData.speakersList[idx].id = id;
  	$scope.formData.speakersList[idx].show = false;
  };

  $scope.showSpeakers = function(idx) {
  	$scope.formData.speakersList[idx].show = ($scope.formData.speakersList[idx].name ?  true : false);
  };

  $scope.addCompanyRow = function ()  {
  	$scope.formData.companiesList.push({
  		id: "",
  		name: "",
  		show: false
  	})
  };

  $scope.removeCompanyRow = function (company) {
  	var testToRemove = function(el1, el2){
  		if(el1.id == el2.id && el1.name == el2.name){
  			return true;
  		}
  		return false;
  	}
  	removeElementFromList($scope.formData.companiesList, company, testToRemove);
  };

  $scope.addCompany = function(idx, name, id) {
  	$scope.formData.companiesList[idx].name = name;
  	$scope.formData.companiesList[idx].id = id;
  	$scope.formData.companiesList[idx].show = false;
  }

  $scope.showCompanies = function(idx) {

  	$scope.formData.companiesList[idx].show = ($scope.formData.companiesList[idx].name ?  true : false);
  }

  $scope.submit = function() {
  	if(myValidator.validate() === true) {

  		if(!$scope.allDay){
  			$scope.formData.initialDate.date.setHours($scope.formData.initialDate.hours);
  			$scope.formData.initialDate.date.setMinutes($scope.formData.initialDate.minutes); 
  			$scope.formData.finalDate.date.setHours($scope.formData.finalDate.hours);
  			$scope.formData.finalDate.date.setMinutes($scope.formData.finalDate.minutes);            
  		}

  		var sessionData = {
  			name: $scope.formData.name,
  			kind: $scope.formData.kind,
  			img: $scope.formData.img,
  			place: $scope.formData.place,
  			description: $scope.formData.description,
  			speakers: $scope.formData.speakersList,
  			companies: $scope.formData.companiesList,
  			allDay: $scope.formData.allDay,
  			initialDate: $scope.formData.initialDate.date,
  			finalDate: $scope.formData.finalDate.date
  		}

  		SessionFactory.Session.create(sessionData, function(response) {
  			if(response.error) {
  				$scope.error = response.error;
  				console.log(response.error);
  			}
  			else {
  				$scope.message = response.message;

  				SessionFactory.Session.getAll(function (sessions) {
  					$scope.sessions = sessions;
  				});

  				console.log("Response: " + response);
  				console.log(response)
  				$location.path("/session/" + response._id);
  			}
  		});
  	}
  };

  //===================================FUNCTIONS===================================

  var removeElementFromList = function(list, el, testFunction){
  	if(confirm("Are you sure you want to remove?")){
  		var index = -1;
  		for (var i = 0; i < list.length; i++) {
  			if (testFunction(list[i], el)) {
  				index = i;
  				break;
  			}
  		}
  		if (index > -1) {
  			list.splice(index, 1);
  		}
  	}
  }


  Ink.requireModules(['Ink.Dom.Selector_1','Ink.UI.DatePicker_1'],function(Selector, DatePicker){
  	initialDatePicker = new DatePicker('#initialDate', {
  		onSetDate: function() {
  			if(initialDatePicker === undefined){
  				return;
  			}
  			$scope.formData.initialDate.date.setFullYear(initialDatePicker.getDate().getFullYear());
  			$scope.formData.initialDate.date.setMonth(initialDatePicker.getDate().getMonth());
  			$scope.formData.initialDate.date.setDate(initialDatePicker.getDate().getDate()); 
  		}  
  	});
  	finalDatePicker = new DatePicker('#finalDate', {
  		onSetDate: function() {
  			if(finalDatePicker === undefined){
  				return;
  			}
  			$scope.formData.finalDate.date.setFullYear(finalDatePicker.getDate().getFullYear());
  			$scope.formData.finalDate.date.setMonth(finalDatePicker.getDate().getMonth());
  			$scope.formData.finalDate.date.setDate(finalDatePicker.getDate().getDate());
  		}     
  	});
  });

  Ink.requireModules( ['Ink.UI.FormValidator_2', 'Ink.Dom.Selector_1'], function(FormValidator, Selector){
  	FormValidator.setRule('chooseKind', 'Select one option.', function(value){
  		return $scope.formData.kind !== "";
  	});

  	FormValidator.setRule('chooseDate', 'Select a valid date.', function(value){
  		return  $scope.formData.allDay || (!$scope.formData.allDay 
  			&& $scope.formData.initialDate.hours !== "" 
  			&& $scope.formData.initialDate.minutes !== ""
  			&& $scope.formData.finalDate.hours !== "" 
  			&& $scope.formData.finalDate.minutes !== "");
  	});

  	myValidator = new FormValidator('#myForm');
  });
});
