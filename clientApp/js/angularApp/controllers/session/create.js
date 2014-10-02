'use strict';

theToolController
    .controller('CreateSessionController', function ($rootScope, $scope, $http, $routeParams, $location, SessionFactory, SpeakerFactory, CompanyFactory) {

        var options = require('./../../../../../options.js');
        var initialDatePicker;
        var finalDatePicker;
        $scope.hoursList = [];
        $scope.minutesList = [];
        $scope.sessions = options.session.kind;
        $scope.speakersList = [{
            id: "",
            name: "",
            position: ""
        }];
        
        $scope.companiesList = [{
            id: "",
            name: ""
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
        $scope.displaySpeakersList = [false];
        $scope.displayCompaniesList = [false];

        var initDate = function() {
            for(var i = 0; i <= 23; i++){
                $scope.hoursList.push(i);
            }
            for(var i = 0; i <= 59; i++){
                $scope.minutesList.push(i);
            }
        };

        initDate();

        $scope.addSpeakerRow = function ()  {
            $scope.speakersList.push({
                id: "",
                name: "",
                position: ""
            });
            $scope.displaySpeakersList.push(false);
        };

        $scope.removeSpeakerRow = function (speaker) {
            var testToRemove = function(el1, el2){
                console.log("Testing Speaker");
                if(el1.id == el2.id && el1.name == el2.name && el1.position == el2.position){
                    return true;
                }
                return false;
            }
            removeElementFromList($scope.speakersList, $scope.displaySpeakersList, speaker, testToRemove);
        };

        $scope.addSpeaker = function(idx, name, id) {
            $scope.displaySpeakersList[idx] = false;

            $scope.speakersList[idx].name = name;
            $scope.speakersList[idx].id = id;
        };

        $scope.addCompanyRow = function ()  {
            $scope.companiesList.push({
                id: "",
                name: ""
            })
            $scope.displayCompaniesList.push(false);
        };

        $scope.removeCompanyRow = function (company) {
            var testToRemove = function(el1, el2){
                if(el1.id == el2.id && el1.name == el2.name){
                    return true;
                }
                return false;
            }
            removeElementFromList($scope.companiesList, $scope.displayCompaniesList, company, testToRemove);
        };

        $scope.submit = function() {

            //TODO CHECK DATES

            var sessionData = {
                name: $scope.formData.name,
                kind: $scope.formData.kind,
                img: $scope.formData.img,
                place: $scope.formData.place,
                description: $scope.formData.description,
                speakers: $scope.speakersList,
                companies: $scope.companiesList,
                initialDate: new Date(initialDatePicker.getFullYear(), initialDatePicker.getMonth(), initialDatePicker.getDay(), $scope.date.initialDate.hours, $scope.date.initialDate.minutes),
                finalDate: new Date(finalDatePicker.getFullYear(), finalDatePicker.getMonth(), finalDatePicker.getDay(), $scope.date.finalDate.hours, $scope.date.finalDate.minutes), 
            } 

            SessionFactory.Session.create(sessionData, function(response) {
              if(response.error) {
                $scope.error = response.error;
              } else {
                $scope.message = response.message;

                SessionFactory.Session.getAll(function (sessions) {
                  $scope.sessions = sessions;
                });
                
                console.log("Inseri com sucesso");
                //$location.path("/sessions/" + response.id);
              }
            });
          };

        $scope.teste = function () {
            console.log("teste");
        };

        $scope.showSpeakers = function(idx) {
            $scope.displaySpeakersList[idx] = ($scope.speakersList[idx].name ?  true : false);
        }

        var removeElementFromList = function(list, listDisplay ,el, testFunction){
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
                    listDisplay.splice(index, 1);
                }  
            }  
        }

        Ink.requireModules(['Ink.Dom.Selector_1','Ink.UI.DatePicker_1'],function( Selector, DatePicker ){
            initialDatePicker = new DatePicker( '#initialDate' );
            finalDatePicker = new DatePicker('#finalDate');
        });
        /*
        $scope.checkInitialDay = function(){
            console.log("checkin day")
            var date = new Date();
            var day  = $scope.date.initialDate.day; 
            var month = $scope.date.initialDate.month;
            var year = $scope.date.initialDate.year;

            if(month != "" && year != "" && month <= date.getMonth() + 1){
                console.log("checkin Day1");
                if(day < date.getDate()){
                    console.log("checkin Day 2")
                    $scope.date.initialDate.day = date.getDate();
                }
            }
        }

        $scope.checkInitialMonth = function() {
            var date = new Date();
            var month = $scope.date.initialDate.month;
            var year = $scope.date.initialDate.year;

            if(year != "" && year <= date.getFullYear()){
                console.log("checkin Month")
                if(month < (date.getMonth() + 1)){
                    $scope.date.initialDate.month = date.getMonth() + 1;
                    $scope.checkInitialDay();
                    console.log( $scope.date.initialDate.month );
                }
            }
        }

        $scope.checkInitialYear = function() {
            console.log("checkin Year")
            $scope.checkInitialMonth();
            $scope.checkInitialDay();
        }

        $scope.checkFinalDate = function() { 
            var initialDay  = $scope.date.initialDate.day; 
            var initialMonth = $scope.date.initialDate.month;
            var initialYear = $scope.date.initialDate.year;

            var finalDay = $scope.date.finalDay.day; 
            var finalMonth = $scope.date.finalDate.month;
            var finalYear = $scope.date.finalDate.year;

            if(initialDay != "" && finalDay != "" && initialMonth = "" && finalMonth != "" && initialYear != "" && finalYear != "") {
                var initialDate = new Date(initialYear, initialMonth - 1, initialDay); 
                var finalDate = new Date(finalYear, finalMonth - 1, finalDay); 

                if(initialDate > finalDate){
                    if(initialYear > finalYear){

                    }
                }
            }
        }*/
    });