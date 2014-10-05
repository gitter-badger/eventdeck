'use strict';

theToolController
    .controller('CreateSessionController', function ($rootScope, $scope, $http, $routeParams, $location, SessionFactory, SpeakerFactory, CompanyFactory) {

        var options = require('./../../../../../options.js');
        var initialDatePicker;
        var finalDatePicker;
        var myValidator;
        $scope.formData = {
            name: "",
            kind: "",
            url: "",
            place: "",
            description: ""
        }

        $scope.hoursList = [];
        $scope.minutesList = [];
        $scope.sessionsKind = options.session.kind;
        $scope.speakersList = [{
            id: "",
            name: "",
            position: "",
            show: false
        }];
        
        $scope.companiesList = [{
            id: "",
            name: "",
            show: false
        }];

        $scope.date = {
            initialDate : {
                hours: "",
                minutes: ""
            },
            finalDate: {
                hours: "",
                minutes: ""
            }
        }

        var initDate = function() {
            for(var i = 0; i <= 23; i++){
                $scope.hoursList.push(i);
            }
            for(var i = 0; i <= 59; i+=5){
                $scope.minutesList.push(i);
            }
        };

        initDate();

        $scope.addSpeakerRow = function ()  {
            $scope.speakersList.push({
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
            removeElementFromList($scope.speakersList, speaker, testToRemove);
        };

        $scope.addSpeaker = function(idx, name, id) {
            $scope.speakersList[idx].name = name;
            $scope.speakersList[idx].id = id;
            $scope.speakersList[idx].show = false;
        };

        $scope.showSpeakers = function(idx) {
            $scope.speakersList[idx].show = ($scope.speakersList[idx].name ?  true : false);
        };

        $scope.addCompanyRow = function ()  {
            $scope.companiesList.push({
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
            removeElementFromList($scope.companiesList, company, testToRemove);
        };

        $scope.addCompany = function(idx, name, id) {
            $scope.companiesList[idx].name = name;
            $scope.companiesList[idx].id = id;
            $scope.companiesList[idx].show = false;
        }

        $scope.showCompanies = function(idx) {

            $scope.companiesList[idx].show = ($scope.companiesList[idx].name ?  true : false);
        }

        $scope.submit = function() {

            console.log(myValidator.validate());

            if(myValidator.validate() === true) {
                var initialDate = initialDatePicker.getDate();
                var finalDate;

                initialDate.setHours($scope.date.initialDate.hours);
                initialDate.setMinutes($scope.date.initialDate.minutes);

                if(finalDatePicker === undefined) {
                    finalDate = initialDate; 
                } else {
                    finalDate = finalDatePicker.getDate();
                    finalDate.setHours($scope.date.finalDate.hours);
                    finalDate.setMinutes($scope.date.finalDate.minutes);
                }

                var sessionData = {
                    name: $scope.formData.name,
                    kind: $scope.formData.kind,
                    img: $scope.formData.img,
                    place: $scope.formData.place,
                    description: $scope.formData.description,
                    speakers: $scope.speakersList,
                    companies: $scope.companiesList,
                    initialDate: initialDate,
                    finalDate: finalDate
                } 

                console.log(sessionData);

                SessionFactory.Session.create(sessionData, function(response) {
                  if(response.error) {
                    $scope.error = response.error;
                  }
                  else {
                    $scope.message = response.message;

                    SessionFactory.Session.getAll(function (sessions) {
                      $scope.sessions = sessions;
                    });
              
                    console.log("Inseri com sucesso");
                    //$location.path("/sessions/" + response.id);
                  }
                });
            }
          };

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
            initialDatePicker = new DatePicker('#initialDate');
            finalDatePicker = new DatePicker('#finalDate');
        });

        Ink.requireModules( ['Ink.UI.FormValidator_2', 'Ink.Dom.Selector_1'], function(FormValidator, Selector){
            FormValidator.setRule('chooseKind', 'Select one option.', function(value){
                return $scope.formData.kind !== "";
            });

            FormValidator.setRule('chooseInitialDate', 'Select a valid date.', function(value){
                return initialDatePicker !== undefined && $scope.date.initialDate.hours !== "" && $scope.date.initialDate.minutes !== "";
            });

            myValidator = new FormValidator('#myForm');
        });
    });