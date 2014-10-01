'use strict';

var inicialDatePicker, finalDatePicker;

theToolController
    .controller('CreateSessionController', function ($rootScope, $scope, $http, $routeParams, $location, SessionFactory, SpeakerFactory, CompanyFactory) {

        var options = require('./../../../../../options.js');
        $scope.sessions = options.session.kind;
        $scope.speakersList = [{
            id: "",
            name: "",
            position: ""
        }];

        $scope.test = [1,2,3,4]
        $scope.companiesList = [{
            id: "",
            name: ""
        }];

        $scope.date = {
            inicialDate : {
                day: "",
                month: "",
                year: "",
                hours: "",
                minutes: ""
            },
            finalDate: {
                day: "",
                month: "",
                year: "",
                hours: "",
                minutes: ""
            }
        }

        $scope.dayList = [];
        $scope.monthList = [];
        $scope.yearList = [];
        $scope.hoursList = [];
        $scope.minutesList = [];

        var initDate = function() {
            for(var i = 1; i <= 31; i++){
                $scope.dayList.push(i);
            }
            for(var i = 1; i <= 12; i++){
                $scope.monthList.push(i);
            }
            for(var i = 2014; i <= 2050; i++){
                $scope.yearList.push(i);
            }
            for(var i = 0; i <= 23; i++){
                $scope.hoursList.push(i);
            }
            for(var i = 0; i <= 59; i++){
                $scope.minutesList.push(i);
            }
        };

        initDate();

        $scope.addSpeaker = function ()  {
            $scope.speakersList.push({
                id: "",
                name: "",
                position: ""
            });
        };

        $scope.removeSpeaker = function (speaker) {
            var testToRemove = function(el1, el2){
                console.log("Testing Speaker");
                if(el1.id == el2.id && el1.name == el2.name && el1.position == el2.position){
                    return true;
                }
                return false;
            }
            removeElementFromList($scope.speakersList, speaker, testToRemove);
        };

        $scope.addCompany = function ()  {
            $scope.companiesList.push({
                id: "",
                name: ""
            })
        };

        $scope.removeCompany = function (company) {
            var testToRemove = function(el1, el2){
                if(el1.id == el2.id && el1.name == el2.name){
                    return true;
                }
                return false;
            }
            removeElementFromList($scope.companiesList, company, testToRemove);
        };

        $scope.teste = function (speaker) {
            console.log(speaker);
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
    });