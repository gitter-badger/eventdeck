(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

angular.module("theTool", [
  "ng",
  "ngRoute",
  "ngSanitize",
  "ngTouch",
  "infinite-scroll",
  "unsavedChanges",
  "luegg.directives",
  "ngAudio",
  "theTool.filters",
  "theTool.services",
  "theTool.directives",
  "theTool.controllers",
  'ui.calendar'
  ]).
config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/"                          , {templateUrl: "views/chat/view.html",             controller: "ChatController"});
  $routeProvider.when("/admin"                     , {templateUrl: "views/admin/index.html",           controller: "AdminController"});
  $routeProvider.when("/login"                     , {templateUrl: "views/auth/login.html",            controller: "LoginController"});
  $routeProvider.when("/login/:id/:code"           , {templateUrl: "views/auth/login.html",            controller: "LoginController"});
  $routeProvider.when("/companies/"                , {templateUrl: "views/company/list.html",          controller: "CompaniesController"});
  $routeProvider.when("/companies/table/"          , {templateUrl: "views/company/table.html",         controller: "CompaniesController"});
  $routeProvider.when("/companies/budget/"         , {templateUrl: "views/company/budget.html",        controller: "CompaniesController"});
  $routeProvider.when("/company/"                  , {templateUrl: "views/company/create.html",        controller: "CreateCompanyController"});
  $routeProvider.when("/company/:id"               , {templateUrl: "views/company/view.html",          controller: "CompanyController"});
  $routeProvider.when("/company/:id/edit"          , {templateUrl: "views/company/edit.html",          controller: "CompanyController"});
  $routeProvider.when("/company/:id/participations", {templateUrl: "views/company/participations.html",controller: "CompanyController"});
  $routeProvider.when("/company/:id/confirm"       , {templateUrl: "views/company/confirm.html",       controller: "CompanyEmailController"});
  $routeProvider.when("/comment/:id/edit"          , {templateUrl: "views/comment/edit.html",          controller: "CommentController"});
  $routeProvider.when("/speakers/"                 , {templateUrl: "views/speaker/list.html",          controller: "SpeakersController"});
  $routeProvider.when("/speakers/table/"           , {templateUrl: "views/speaker/table.html",         controller: "SpeakersController"});
  $routeProvider.when("/speaker/"                  , {templateUrl: "views/speaker/create.html",        controller: "CreateSpeakerController"});
  $routeProvider.when("/speaker/:id"               , {templateUrl: "views/speaker/view.html",          controller: "SpeakerController"});
  $routeProvider.when("/speaker/:id/edit"          , {templateUrl: "views/speaker/edit.html",          controller: "SpeakerController"});
  $routeProvider.when("/speaker/:id/participations", {templateUrl: "views/speaker/participations.html",controller: "SpeakerController"});
  $routeProvider.when("/speaker/:id/confirm"       , {templateUrl: "views/speaker/confirm.html",       controller: "SpeakerEmailController"});
  $routeProvider.when("/members/"                  , {templateUrl: "views/member/list.html",           controller: "MembersController"});
  $routeProvider.when("/member/"                   , {templateUrl: "views/member/create.html",         controller: "CreateMemberController"});
  $routeProvider.when("/member/:id"                , {templateUrl: "views/member/view.html",           controller: "MemberController"});
  $routeProvider.when("/member/:id/edit"           , {templateUrl: "views/member/edit.html",           controller: "MemberController"});
  $routeProvider.when("/meetings"                  , {templateUrl: "views/meeting/list.html",          controller: "MeetingsController"});
  $routeProvider.when("/meeting/:id"               , {templateUrl: "views/meeting/view.html",          controller: "MeetingController"});
  $routeProvider.when("/meeting/:id/text"          , {templateUrl: "views/meeting/text.html",          controller: "MeetingController"});
  $routeProvider.when("/meeting/:id/edit"          , {templateUrl: "views/meeting/edit.html",          controller: "MeetingController"});
  $routeProvider.when("/chats"                     , {templateUrl: "views/chat/list.html",             controller: "ChatsController"});
  $routeProvider.when("/chat/:id"                  , {templateUrl: "views/chat/view.html",             controller: "ChatController"});
  $routeProvider.when("/topics"                    , {templateUrl: "views/topic/list.html",            controller: "TopicsController"});
  $routeProvider.when("/topic/:id"                 , {templateUrl: "views/topic/view.html",            controller: "TopicController"});
  $routeProvider.when("/communications/:kind"      , {templateUrl: "views/communication/list.html",    controller: "CommunicationsController"});
  $routeProvider.when("/session/"                  , {templateUrl: "views/session/session.html",       controller: "SessionController"});
  $routeProvider.when("/session/:id/edit"          , {templateUrl: "views/session/session.html",       controller: "SessionController"});
  $routeProvider.when("/sessions/"                 , {templateUrl: "views/session/sessions.html",      controller: "SessionsController"});
  $routeProvider.when("/session/:id"               , {templateUrl: "views/session/view.html",          controller: "ViewSessionController"});
  $routeProvider.otherwise({redirectTo: "/"});
}]);

},{}],2:[function(require,module,exports){
"use strict";

theToolController.controller("AdminController", function ($rootScope, $scope, EventFactory, ItemFactory) {

  $rootScope.update.timeout(runController);

  function runController(){

    EventFactory.Event.getAll(function (response) {
      $scope.events = response;
    });

    ItemFactory.Item.getAll(function (response) {
      $scope.items = response;
    });

    $scope.addEvent = function(newEvent) {
      EventFactory.Event.create(newEvent, function(response) {
        if(response.error) {
          $scope.error = response.error;
        }

        EventFactory.Event.getAll(function (response) {
          $scope.events = response;
        });
      });
    };

    $scope.addItem = function(newItem) {
      ItemFactory.Item.create(newItem, function(response) {
        if(response.error) {
          $scope.error = response.error;
        }

        ItemFactory.Item.getAll(function (response) {
          $scope.items = response;
        });
      });
    };

    $scope.updateEvent = function (event) {
      EventFactory.Event.update({id: event.id}, event, function (response) {
        if(response.error) {
          //console.log(response.error);
          return $scope.error = response.error;
        }
        event.editing = false;
      });
    };

    $scope.updateItem = function (item) {
      ItemFactory.Item.update({id: item.id}, item, function (response) {
        if(response.error) {
          $scope.error = response.error;
        }
        item.editing = false;
      });
    };

    $scope.deleteEvent = function (event) {
      EventFactory.Event.delete({id: event.id}, function (response) {
        if(response.error) {
          $scope.error = response.error;
        }

        EventFactory.Event.getAll(function (response) {
          $scope.events = response;
        });
      });
    };

    $scope.deleteItem = function (item) {
      ItemFactory.Item.delete({id: item.id}, function (response) {
        if(response.error) {
          $scope.error = response.error;
        }

        ItemFactory.Item.getAll(function (response) {
          $scope.items = response;
        });
      });
    };

  }
});

},{}],3:[function(require,module,exports){
require("./login");
require('./interceptor');

},{"./interceptor":4,"./login":5}],4:[function(require,module,exports){
theToolController.config(function ($httpProvider) {
  $httpProvider.interceptors.push(['$injector', function ($injector) {
    return $injector.get('AuthInterceptor');
  }]);
});

theToolController.factory('AuthInterceptor', function ($rootScope, $location, $window) {
  return {
    responseError: function (response) {
      if (response.status === 401) {
        $rootScope.update.running = false;
        if($location.path().indexOf('/login') == -1) {
          $rootScope.nextPath = '#' + $location.path();
          $location.path('/login');
        }
      }
    }
  };
});

},{}],5:[function(require,module,exports){
"use strict";

var facebookConfig = require('./../../../../../config').facebook;

theToolController.controller("LoginController", function ($rootScope, $scope, $routeParams, $location, $http, $window) {

  //================================INITIALIZATION================================
  $.ajaxSetup({cache: true});
  $.getScript("//connect.facebook.net/pt_PT/all.js", function () {
    FB.init({appId: facebookConfig.appId});
  });

  $scope.loading = false;
  $scope.showIdInput = true;
  $scope.showCodeInput = false;

  if($scope.me.id) {
    //$location.path('/');
    $window.location.assign('/');
  }

  var lock = false;

  //===================================FUNCTIONS===================================

  $scope.facebookLogin = function () {
    $scope.banana = true;

  	if (lock) {
      return;
    }

    lock = true;

    FB.getLoginStatus(function (response) {
      if (response.status === "connected") {
        connected(response);
      }
      else {
        FB.login(function () {}, {display: "popup"});
        FB.Event.subscribe("auth.statusChange", function (response) {
          if (response.status === "connected") {
            connected(response);
          }
        });

        lock = false;
      }
    });

    function connected(response) {
      $scope.connected = true;
      $scope.loading = true;
      $scope.loginInfo = "Logging in...";

      $http.get(url_prefix + '/api/login/facebook?id='+response.authResponse.userID+'&token='+response.authResponse.accessToken).
        success(function(data, status, headers, config) {
          //$location.path('/');
          if(typeof $rootScope.nextPath == undefined){
            $window.location.assign('#');
          }
          else{
            $window.location.assign($rootScope.nextPath);
          }
          $rootScope.update.all();
        }).
        error(function(data, status, headers, config) {
          $scope.loading = false;
          //console.log("ERROR", data);
        });
    }
  };

  $scope.sendEmail = function (memberId) {
    $scope.loading = true;
    $scope.loginInfo = "Sending email...";
    $scope.showIdInput = false;
    //console.log("Sending email...");

    $http.get(url_prefix + '/api/login/' + memberId).
      success(function(data, status, headers, config) {
        if(data.error) {
          $scope.loading = false;
          setInfo("There was an error...");
          $scope.showIdInput = true;
          return;
        }
        $scope.loading = false;
        setInfo("Email sent!");
        $scope.showCodeInput = true;
        //console.log("Email sent!")
      }).
      error(function(data, status, headers, config) {
        $scope.loading = false;
        setInfo("There was an error...");
        $scope.showIdInput = true;
        //console.log("ERROR", data);
      });
  }

  $scope.submitCode = function (memberId, memberCode) {
    $scope.loading = true;
    $scope.loginInfo = "Verifying code...";
    $scope.showCodeInput = false;

    $http.get(url_prefix + '/api/login/' + memberId + '/' + memberCode).
      success(function(data, status, headers, config) {
        if(data.error) {
          $scope.loading = false;
          setInfo("There was an error...");
          $scope.showIdInput = true;
          return;
        }
        $scope.loading = false;
        $scope.loginInfo = "Success!";
        $window.location.assign('/');
        //$location.path('/');
      }).
      error(function(data, status, headers, config) {
        $scope.loading = false;
        setInfo("There was an error...");
        $scope.showIdInput = true;
      });
  }

  function setInfo(message) {
    $scope.loginInfo = message;
    setTimeout(function(){$scope.loginInfo=""}, 2000);
  }

  if ($routeParams.id && $routeParams.code) {
    $scope.submitCode($routeParams.id, $routeParams.code)
  }

});

},{"./../../../../../config":103}],6:[function(require,module,exports){
'use strict';

theToolController.controller('ChatController', function ($rootScope, $scope, $http, $routeParams, $sce, ngAudio, SocketFactory, MessageFactory, ChatFactory, MemberFactory) {

  $rootScope.update.timeout(runController);

  function runController(){

    $scope.error = {};

    $scope.updating = false;
    $scope.loading  = true;
    $scope.auth     = false;
    $scope.conected = false;
    $scope.messages = [];
    $scope.online   = [];

    //console.log("Connecting");

    SocketFactory.connect('/chat');

    SocketFactory.on('connected', function () {
      $scope.conected = true;
      if(!$scope.auth){
        SocketFactory.emit('auth', {id: ($routeParams.id || 'geral'), user: $scope.me.id}, function () {
          //console.log('Auth success');
          $scope.auth = true;
        });
      }
    });

    SocketFactory.on('validation', function (response){
      if(!response.err){
        $scope.chat     = response.chatData;
        $scope.messages = response.messages;
        $scope.room     = response.room;

        for(var i = 0; i < $scope.chat.members.length; i++){
          $scope.online.push({member: $scope.chat.members[i], on: false});
          if(response.online.indexOf($scope.chat.members[i]) != -1){
            $scope.online[i].on = true;
          }
          $scope.online[i].name = $scope.getMember($scope.online[i].member).name;
        }
        $scope.history = history;
      }
      else{
        //console.log(response.message);
      }
      $scope.loading  = false;
    });

    SocketFactory.on('user-connected', function (response) {
      //console.log("User connected: " + response.id);
      for(var i = 0; i < $scope.online.length; i++){
        if($scope.online[i].member === response.id){
          $scope.online[i].on = true;
          break;
        }
      }
    });

    SocketFactory.on('user-disconnected', function (response) {
      //console.log("User connected: " + response.id);
      for(var i = 0; i < $scope.online.length; i++){
        if($scope.online[i].member === response.id){
          $scope.online[i].on = false;
          break;
        }
      }
    });

    SocketFactory.on('message', function (response) {
      var message = response.message;
      $scope.messages.push(message);
      if(message.member != $scope.me.id) {
        ngAudio.play("audio/message.mp3");
      }
    });

    SocketFactory.on('history-send', function (response) {
      $scope.messages = $scope.messages.concat(response.messages);
      $scope.updating = false;
      $scope.infiniteScrollDisabled = false;
    });

    $scope.$on('$locationChangeStart', function(){
      SocketFactory.disconnect();
      delete SocketFactory.socket;
    });

    $scope.submit = function() {
      if ($scope.text == ""){
        return;
      }

      var messageData = {
        text   : $scope.text,
        chatId : ($routeParams.id || 'geral'),
        member : $scope.me.id,
      }

      SocketFactory.emit('send', {room: $scope.room, message: messageData }, function() {
        //console.log('Message sent');
        $scope.text = "";
      });
    };

    function history () {
      //console.log('Start history request');
      if(!$scope.updating){
        $scope.infiniteScrollDisabled = true;
        $scope.updating = true;
        SocketFactory.emit('history-get', {room: $scope.room, date: $scope.messages[$scope.messages.length-1].date }, function() {
          //console.log('Sent history request');
        });
      }
    }
  }
});

},{}],7:[function(require,module,exports){
require('./list');
require('./chat');
},{"./chat":6,"./list":8}],8:[function(require,module,exports){
'use strict';

theToolController.controller('ChatsController', function ($rootScope, $scope, ChatFactory) {

  $rootScope.update.timeout(runController);

  function runController(){

    $scope.loading = true;

    ChatFactory.Chat.getAll(function(chats) {
      $scope.chats = chats;
      $scope.loading = false;
    });
  }

});

},{}],9:[function(require,module,exports){
"use strict";

theToolController.controller("CommentAreaController", function ($rootScope, $scope, $http, $routeParams, MemberFactory, CommentFactory) {

  $rootScope.update.timeout(runController);

  function runController(){

    $scope.loading = true;

    $scope.commentData = {
      markdown: ""
    };

    loadComments();

    function loadComments() {
      if ($scope.thread.split("-")[1] === "") {
        setTimeout(loadComments, 500);
        return;
      }

      var threadId;
      var threadType;

      if($scope.subthread && $scope.subthread != '') {
        threadType = $scope.subthread.split('-')[0];
        threadId = $scope.subthread.substring($scope.subthread.indexOf("-") + 1);
      } else {
        threadType = $scope.thread.split('-')[0];
        threadId = $scope.thread.substring($scope.thread.indexOf("-") + 1);
      }

      switch(threadType) {
        case "company": 
          CommentFactory.Company.getAll({id: threadId}, gotComments);
          break;
        case "speaker": 
          CommentFactory.Speaker.getAll({id: threadId}, gotComments);
          break;
        case "topic": 
          CommentFactory.Topic.getAll({id: threadId}, gotComments);
          break;
        case "communication": 
          CommentFactory.Communication.getAll({id: threadId}, gotComments);
          break;
      }

      function gotComments(comments) {
        $scope.comments = comments;

        $scope.loading = false;
      }
    }

    $scope.postComment = function () {
      if ($scope.commentData.markdown === ""){
        $scope.emptyComment = true;
        return;
      }

      var date = Date.now();
      CommentFactory.Comment.create({
        thread: $scope.thread,
        subthread: $scope.subthread,
        member: $scope.me.id,
        markdown: $scope.commentData.markdown,
        html: $scope.convertMarkdownToHtml($scope.commentData.markdown),
        posted: date,
        updated: date
      }, function (response) {
        $scope.commentData.markdown = "";
        $scope.commentForm.$setPristine();
        loadComments();
      });
    };

    $scope.saveComment = function (comment) {
      if (comment.buffer === "") {
        return;
      }

      comment.markdown = comment.buffer;
      comment.html = $scope.convertMarkdownToHtml(comment.markdown);
      comment.updated = Date.now();

      CommentFactory.Comment.update({id: comment._id}, comment, function (response) {
        comment.buffer = "";
        comment.editing = false;
      });
    }

    $scope.quoteComment = function (comment) {
      $scope.commentData.markdown = "> **" + $scope.getMember(comment.member).name + " said:**\n> " + comment.markdown.split("\n").join("\n> ") + "\n\n";
    };

    $scope.deleteComment = function (comment) {
      if (confirm("Are you sure you want to delete this comment?")) {
        CommentFactory.Comment.delete({id: comment._id}, function () {
          loadComments();
        });
      }
    };

    $scope.getMember = function (memberId) {
      return $scope.members.filter(function(o) {
        return o.id == memberId;
      })[0];
    };

    $scope.convertTextToHtml = function(text) {
      var urlExp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
      var mailExp = /[\w\.\-]+\@([\w\-]+\.)+[\w]{2,4}(?![^<]*>)/ig;

      return text.replace(/\n/g, '<br>').replace(urlExp,"<a href='$1'>$1</a>").replace(mailExp,"<a href='#/company/"+$routeParams.id+"/confirm?email=$&'>$&</a>");
    };

    $scope.convertNewLinesToHtml = function(text) {
      return '<div data-markdown>'+text.replace(/\n/g, '<br>')+'</div>';
    };

    $scope.convertMarkdownToHtml = function(text) {
      return '<div data-markdown>' + text + '</div>';
    };

    $scope.checkPermission = function (comment) {
      if(!$scope.me.roles) { return false; }

      var roles = $scope.me.roles.filter(function(o) {
        return o.id == 'development-team' || o.id == 'coordination';
      });

      if(roles.length == 0 && comment.member != $scope.me.id) {
        return false;
      }

      return true;
    }

    $scope.timeSince =function (date) {
      date = new Date(date);
      var seconds = Math.floor((Date.now() - date) / 1000);

      var suffix = 'ago';
      if(seconds < 0){
        seconds = Math.abs(seconds);
        suffix = 'to go';
      }

      var interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
          return interval + " years " + suffix;
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
          return interval + " months " + suffix;
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
          return interval + " days " + suffix;
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
          return interval + " hours " + suffix;
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
          return interval + " minutes " + suffix;
      }
      return Math.floor(seconds) + " seconds " + suffix;
    };

    $scope.formatDate = function (time) {
      return new Date(time).toUTCString();
    };
  }
});

},{}],10:[function(require,module,exports){
"use strict";

theToolController.controller("FirstCommentController", function ($rootScope, $scope, $http, $routeParams, MemberFactory, CommentFactory) {

  $rootScope.update.timeout(runController);

  function runController(){

    $scope.loading = true;

    $scope.commentData = {
      markdown: ""
    };

    MemberFactory.Member.get({id: "me"}, function (me) {
      $scope.me = me;
    });

    MemberFactory.Member.getAll(function (members) {
      $scope.members = members;
    });

    loadComments();

    function loadComments() {
      if ($scope.thread.split("-")[1] === "") {
        setTimeout(loadComments, 500);
        return;
      }

      var pageId = $scope.thread.substring($scope.thread.indexOf("-") + 1);

      if ($scope.thread.indexOf("company-") != -1) {
        CommentFactory.Company.getAll({id: pageId}, gotComments);
      }
      else if ($scope.thread.indexOf("speaker-") != -1) {
        CommentFactory.Speaker.getAll({id: pageId}, gotComments);
      }
      else if ($scope.thread.indexOf("topic-") != -1) {
        CommentFactory.Topic.getAll({id: pageId}, gotComments);
      }

      function gotComments(comments) {
        $scope.comments = [];
        var firstComment = comments.sort(function(a,b){
          return new Date(a.posted) - new Date(b.posted);
        })[0];

        $scope.loading = false;
      }
    }

    $scope.postComment = function () {
      if ($scope.commentData.markdown === ""){
        $scope.emptyComment = true;
        return;
      }

      var date = Date.now();
      CommentFactory.Comment.create({
        thread: $scope.thread,
        member: $scope.me.id,
        markdown: $scope.commentData.markdown,
        html: $scope.convertMarkdownToHtml($scope.commentData.markdown),
        posted: date,
        updated: date
      }, function (response) {
        $scope.commentData.markdown = "";
        loadComments();
      });
    }

    $scope.saveComment = function (comment) {
      if (comment.buffer === "") {
        return;
      }

      comment.markdown = comment.buffer;
      comment.html = $scope.convertMarkdownToHtml(comment.markdown);
      comment.updated = Date.now();

      CommentFactory.Comment.update({id: comment._id}, comment, function (response) {
        comment.editing = false;
      });
    }

    $scope.quoteComment = function (comment) {
      $scope.commentData.markdown = "> **" + $scope.getMember(comment.member).name + " said:**\n> " + comment.markdown.split("\n").join("\n> ") + "\n\n";
    };

    $scope.deleteComment = function (comment) {
      if (confirm("Are you sure you want to delete this comment?")) {
        CommentFactory.Comment.delete({id: comment._id}, function () {
          loadComments();
        });
      }
    };

    $scope.getMember = function (memberId) {
      return $scope.members.filter(function(o) {
        return o.id == memberId;
      })[0];
    };

    $scope.convertTextToHtml = function(text) {
      var urlExp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
      var mailExp = /[\w\.\-]+\@([\w\-]+\.)+[\w]{2,4}(?![^<]*>)/ig;

      return text.replace(/\n/g, '<br>').replace(urlExp,"<a href='$1'>$1</a>").replace(mailExp,"<a href='#/company/"+$routeParams.id+"/confirm?email=$&'>$&</a>");
    };

    $scope.convertNewLinesToHtml = function(text) {
      return '<div data-markdown>'+text.replace(/\n/g, '<br>')+'</div>';
    };

    $scope.convertMarkdownToHtml = function(text) {
      return '<div data-markdown>' + text + '</div>';
    };

    $scope.checkPermission = function (comment) {
      if(!$scope.me.roles) { return false; }

      var roles = $scope.me.roles.filter(function(o) {
        return o.id == 'development-team' || o.id == 'coordination';
      });

      if(roles.length == 0 && comment.member != $scope.me.id) {
        return false;
      }

      return true;
    }

    $scope.timeSince =function (date) {
      date = new Date(date);
      var seconds = Math.floor((Date.now() - date) / 1000);

      var suffix = 'ago';
      if(seconds < 0){
        seconds = Math.abs(seconds);
        suffix = 'to go';
      }

      var interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
          return interval + " years " + suffix;
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
          return interval + " months " + suffix;
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
          return interval + " days " + suffix;
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
          return interval + " hours " + suffix;
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
          return interval + " minutes " + suffix;
      }
      return Math.floor(seconds) + " seconds " + suffix;
    };

    $scope.formatDate = function (time) {
      return new Date(time).toUTCString();
    };
  }
});

},{}],11:[function(require,module,exports){
require('./area.js');
require('./first.js');

},{"./area.js":9,"./first.js":10}],12:[function(require,module,exports){
"use strict";

theToolController.controller("CommunicationAreaController", function ($rootScope, $scope, $http, $routeParams, CommunicationFactory) {

  $rootScope.update.timeout(runController);

  function runController(){

    $scope.loading = true;

    $scope.communicationData = {
      markdown: ""
    };

    $scope.me = JSON.parse($scope.meJson);
    $scope.members = JSON.parse($scope.membersJson);
    $scope.roles = JSON.parse($scope.rolesJson);

    loadCommunications();

    function loadCommunications() {
      $scope.loading = true;

      if ($scope.thread.split("-")[1] === "") {
        setTimeout(loadCommunications, 500);
        return;
      }

      var pageId = $scope.thread.substring($scope.thread.indexOf("-") + 1);

      if ($scope.thread.indexOf("company-") != -1) {
        CommunicationFactory.Company.getAll( {id: pageId}, gotCommunications);
        $scope.kinds=['Email To', 'Email From', 'Meeting', 'Phone Call'];
      }
      else if ($scope.thread.indexOf("speaker-") != -1) {
        CommunicationFactory.Speaker.getAll( {id: pageId}, gotCommunications);
      }

      function gotCommunications(communications) {
        $scope.communications = communications;

        $scope.loading = false;

        if ($scope.thread.indexOf("speaker-") != -1) {
          if(communications.filter(function(o) {
            return o.kind.indexOf('Paragraph') != -1;
          }).length != 0) {
            $scope.kinds=['Email To', 'Email From', 'Meeting', 'Phone Call'];
          } else {
            $scope.kinds=['Inital Email Paragraph','Email To', 'Email From', 'Meeting', 'Phone Call'];
          }
        }
      }
    }

    $scope.postCommunication = function () {
      if (!$scope.communicationData.kind || $scope.communicationData.kind== ""){
        $scope.emptyCommunication = true;
        return;
      }
      if (!$scope.communicationData.text || $scope.communicationData.text== ""){
        $scope.emptyCommunication = true;
        return;
      }

      var date = Date.now();

      //console.log($scope.event);

      CommunicationFactory.Communication.create({
        thread: $scope.thread,
        member: $scope.me.id,
        kind: $scope.communicationData.kind,
        text: $scope.communicationData.text,
        event: $scope.event.id,
        posted: date,
        updated: date
      }, function (response) {
        $scope.communicationData.text = "";
        $scope.communicationData.kind = "";
        $scope.communicationForm.$setPristine();
        loadCommunications();
      });
    }

    $scope.saveCommunication = function (communication) {
      if (communication.buffer === "") {
        return;
      }

      communication.text = communication.buffer;
      communication.updated = Date.now();

      CommunicationFactory.Communication.update({id: communication._id}, communication, function (response) {
        communication.editing = false;
      });
    }

    $scope.deleteCommunication = function (communication) {
      CommunicationFactory.Communication.delete({id: communication._id}, function () {
        loadCommunications();
      });
    };

    $scope.approveCommunication = function (communication) {
      CommunicationFactory.Communication.approve({id: communication._id}, null, function (response) {
        loadCommunications();
      });
    };

    $scope.getMember = function (memberId) {
      return $scope.members.filter(function(o) {
        return o.id == memberId;
      })[0];
    };

    $scope.checkPermission = function (communication) {
      var roles = $scope.me.roles.filter(function(o) {
        return o.id == 'development-team' || o.id == 'coordination';
      });

      if(roles.length == 0 && communication.member != $scope.me.id) {
        return false;
      }

      return true;
    }

    $scope.timeSince =function (date) {
      date = new Date(date);
      var seconds = Math.floor((Date.now() - date) / 1000);

      var suffix = 'ago';
      if(seconds < 0){
        seconds = Math.abs(seconds);
        suffix = 'to go';
      }

      var interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
          return interval + " years " + suffix;
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
          return interval + " months " + suffix;
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
          return interval + " days " + suffix;
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
          return interval + " hours " + suffix;
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
          return interval + " minutes " + suffix;
      }
      return Math.floor(seconds) + " seconds " + suffix;
    };

    $scope.convertURLs = function(text) {
      var urlExp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

      return text.replace(/\n/g, '<br>').replace(urlExp,"<a href='$1'>$1</a>");
    }
  }

});

},{}],13:[function(require,module,exports){
"use strict";

theToolController.controller("CommunicationEmbedController", function ($rootScope, $scope, CommunicationFactory) {

  $rootScope.update.timeout(runController);

  function runController(){

    //================================INITIALIZATION================================

    $scope.success     = "";
    $scope.error       = "";

    $scope.communication.editing = false;
    $scope.communication.deleted = false;


    $scope.saveCommunication = function (communication) {
      if (communication.buffer === "") {
        return;
      }

      communication.text = communication.buffer;
      communication.updated = Date.now();

      CommunicationFactory.Communication.update({id: communication._id}, communication, function (response) {
        communication.editing = false;
      });
    }

    $scope.deleteCommunication = function (communication) {
      CommunicationFactory.Communication.delete({id: communication._id}, function () {
        $scope.communication.deleted = true;
      });
    };

    $scope.setCommunicationStatus = function (communication, status) {
      CommunicationFactory.Communication.update({id: communication._id}, {status: status}, function (response) {
        $scope.communication.status = status;
      });
    };

    $scope.getMember = function (memberId) {
      return $scope.members.filter(function(o) {
        return o.id == memberId;
      })[0];
    };

    $scope.checkPermission = function (communication) {
      var roles = $scope.me.roles.filter(function(o) {
        return o.id == 'development-team' || o.id == 'coordination';
      });

      if(roles.length == 0 && communication.member != $scope.me.id) {
        return false;
      }

      return true;
    }

    $scope.timeSince =function (date) {
      date = new Date(date);
      var seconds = Math.floor((Date.now() - date) / 1000);

      var suffix = 'ago';
      if(seconds < 0){
        seconds = Math.abs(seconds);
        suffix = 'to go';
      }

      var interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
          return interval + " years " + suffix;
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
          return interval + " months " + suffix;
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
          return interval + " days " + suffix;
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
          return interval + " hours " + suffix;
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
          return interval + " minutes " + suffix;
      }
      return Math.floor(seconds) + " seconds " + suffix;
    };

    $scope.formatDate = function (time) {
      return new Date(time).toUTCString();
    };

    $scope.convertURLs = function(text) {
      var urlExp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

      return text.replace(/\n/g, '<br>').replace(urlExp,"<a href='$1'>$1</a>");
    }
  }
});

},{}],14:[function(require,module,exports){
require('./area.js');
require('./list.js');
require('./embed.js');

},{"./area.js":12,"./embed.js":13,"./list.js":15}],15:[function(require,module,exports){
'use strict';

theToolController
  .controller('CommunicationsController', function ($routeParams, $rootScope, $scope, $http, CommunicationFactory) {
    $rootScope.update.timeout(runController);

    function runController(){
      
      $scope.loading = true;

      CommunicationFactory.Communication.getAll(function(response) {
        $scope.loading = false;
        $scope.communications = response;
      });

      $scope.showOpen = true;

      $scope.shownCommunications = function (showOpen) {
        return $scope.communications.filter(function(o) {
          return (showOpen ? !(o.status=='approved') : o.status=='approved') && $routeParams.kind == o.thread.split('-')[0];
        });
      };
    }
  });


},{}],16:[function(require,module,exports){
'use strict';

theToolController
  .controller('CompanyController', function ($rootScope, $scope, $http, $location, $routeParams, $sce, CompanyFactory, MemberFactory, NotificationFactory) {

    $rootScope.update.timeout(runController);

    function runController(){

      $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src+'#page-body');
      }

      $scope.convertEmails = function(text) {
        var mailExp = /[\w\.\-]+\@([\w\-]+\.)+[\w]{2,4}(?![^<]*>)/ig;
        var twitterExp = /(^|[^@\w])@(\w{1,15})\b/g;
        return text.replace(mailExp,"<a href='#/company/"+$routeParams.id+"/confirm?email=$&'>$&</a>").replace(twitterExp,"$1<a href='http://twitter.com/$2' target='_blank'>$2</a>")
      }

      $scope.submit = function() {
        var companyData = this.formData;

        CompanyFactory.Company.update({ id:companyData.id }, companyData, function(response) {
          if(response.error) {
            $scope.error = response.error;
          } else {
            $scope.message = response.success;
            $location.path('company/'+companyData.id);
          }
        });
      };

      $scope.deleteCompany = function(company) {
        CompanyFactory.Company.delete({ id:company.id }, function(response) {
          if(response.error) {
            $scope.error = response.error;
          } else {
            $scope.message = response.success;
          }
          $location.path('companies/');
        });
      };

      $scope.checkPermission = function () {
        var roles = $scope.me.roles.filter(function(o) {
          return o.id == 'development-team' || o.id == 'coordination';
        });

        if(roles.length === 0) {
          return false;
        }

        return true;
      };

      $scope.statuses = ['Suggestion','Contacted','In Conversations','In Negotiations','Closed Deal','Rejected','Give Up'];
      $scope.logoSizes = [null, 'S','M','L'];
      $scope.standDays = [null, 1,2,3,4,5];
      $scope.postsNumbers = [null, 1,2,3,4,5];

      $scope.company = $scope.formData = $scope.getCompany($routeParams.id);

      CompanyFactory.Company.get({id: $routeParams.id}, function(response) {
        $scope.company = $scope.formData = response;

        NotificationFactory.Company.getAll({id: $routeParams.id}, function(getData) {
          $scope.companyNotifications = getData;

          $scope.loading = false;
        });
      });
    }
  });

},{}],17:[function(require,module,exports){
'use strict';

theToolController
  .controller('CompanyEmailController', function ($rootScope, $scope, $http, $routeParams, $sce, $location, EmailFactory) {
    $rootScope.update.timeout(runController);

    function runController(){

      $scope.email = $location.search().email;
      $scope.companyId = $routeParams.id;
      $scope.loading = false;
      $scope.error = null;
      $scope.message = null;

      $scope.submit = function() {
        $scope.loading = true;
        $scope.error = null;
        $scope.message = null;

        //console.log("send email to ", $scope.email, " from ", $scope.companyId);

        EmailFactory.Company.send({ id: $scope.companyId }, { email: $scope.email }, function(response) {
          $scope.loading = false;
          if(response.error) {
            $scope.error = response.error;
          } else {
            $scope.message = response.message;
          }
        });
      };
    }
  });

},{}],18:[function(require,module,exports){
'use strict';
 
theToolController
  .controller('CreateCompanyController', function ($rootScope, $scope, $http, $routeParams, $location, CompanyFactory) {
    $rootScope.update.timeout(runController);

    function runController(){
      
      $scope.submit = function() {
        var companyData = this.formData;

        CompanyFactory.Company.create(companyData, function(response) {
          if(response.error) {
            $scope.error = response.error;
          } else {
            $scope.message = response.message;
            
            CompanyFactory.Company.getAll(function (companies) {
              $scope.companies = companies;
            });

            $location.path("/company/" + response.id);
          }
        });
      };

      $scope.statuses = ['Suggestion','Contacted','In Conversations','In Negotiations','Closed Deal','Rejected','Give Up'];
    }
  });
},{}],19:[function(require,module,exports){
'use strict';

theToolController.controller('CompanyEmbedController', function ($rootScope, $scope) {

  $rootScope.update.timeout(runController);

  function runController(){

    if($scope.comments) {
      $scope.company.comments = $scope.comments.filter(function(e) {
        return e.thread == 'company-'+$scope.company.id;
      });
    }

    if($scope.event) {
      $scope.participation = $scope.company.participations.filter(function(o) {
        return o.event == $scope.event.id;
      })[0];
    }

    $scope.getMember = function (memberId) {
      var member = $scope.members.filter(function(o) {
        return o.id == memberId;
      });

      if(member.length>0) {
        return member[0];
      } else {
        return {
          name: 'No one',
          facebook: '100000456335972'
        };
      }
    };

    $scope.getUnreadNotifications = function (thread) {
      var notifications = $scope.notifications.filter(function(o) {
        return o.thread == thread;
      });
      return notifications;
    };

    $scope.company.unread = $scope.getUnreadNotifications('company-' + $scope.company.id).length > 0;

    $scope.timeSince =function (date) {
      date = new Date(date);
      var seconds = Math.floor((Date.now() - date) / 1000);

      var suffix = 'ago';
      if(seconds < 0){
        seconds = Math.abs(seconds);
        suffix = 'to go';
      }

      var interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
          return interval + ' years ' + suffix;
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
          return interval + ' months ' + suffix;
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
          return interval + ' days ' + suffix;
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
          return interval + ' hours ' + suffix;
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
          return interval + ' minutes ' + suffix;
      }
      return Math.floor(seconds) + ' seconds ' + suffix;
    };
  }
});

},{}],20:[function(require,module,exports){
require('./company.js');
require('./list.js');
require('./create.js');
require('./confirm.js');
require('./embed.js');
},{"./company.js":16,"./confirm.js":17,"./create.js":18,"./embed.js":19,"./list.js":21}],21:[function(require,module,exports){
'use strict';

theToolController
  .controller('CompaniesController', function ($rootScope, $scope, $http, $sce, CompanyFactory) {

    $rootScope.update.timeout(runController);

    function runController(){
      $scope.saveStatus = function(company) {
        var companyData = company;

        CompanyFactory.Company.update({ id:company.id }, companyData, function(response) {
          if(response.error) {
            $scope.error = response.error;
          } else {
            $scope.message = response.message;
          }
        });
      };

      $scope.getClassFromPaymentStatus = function(participation) {
        if(!participation) { return 'grey'; }
        if(!participation.payment) { return 'grey'; }
        if(!participation.payment.status) { return 'grey'; }
        var status = participation.payment.status.toLowerCase();

        if(status.indexOf('pago') != -1 || status.indexOf('emitido') != -1 || status.indexOf('recibo enviado') != -1) { return 'lime'; }
        else if(status.indexOf('enviado') != -1) { return 'orange'; }
        else { return 'grey'; }
      };

      $scope.paymentStatuses = ['Emitido', 'Recibo Enviado', 'Pago', 'Enviado'];

      $scope.limit = 20;

      $scope.statuses = ['Suggestion','Contacted','In Conversations','In Negotiations','Closed Deal','Rejected','Give Up'];

      $scope.companyPredicate = 'updated';
      $scope.reverse = 'true';
      $scope.unreadFirst = true;

      CompanyFactory.Company.getAll(function(response) {
        $scope.predicate = 'updated';
        $scope.reverse = true;
        $scope.companies = response;
      });

      $scope.scroll = function() {
        if ($scope.limit <= $scope.companies.length)
          $scope.limit += 8;
      };

      $scope.checkPermission = function (member) {
        var roles = $scope.me.roles.filter(function(o) {
          return o.id == 'development-team' || o.id == 'coordination';
        });

        if(roles.length === 0 && member.id != $scope.me.id) {
          return false;
        }

        return true;
      };

      $scope.addCompany = function(member, newCompany) {
        //console.log(newCompany);
        var companyData = newCompany;

        if(newCompany.id) {
          var participation = $scope.getParticipation(companyData, $scope.currentEvent.id);
          if(participation) {
            participation.member = member.id;
          } else {
            companyData.participations.push({
              event: $scope.currentEvent.id,
              status: 'Selected',
              member: member.id
            });
          }
          CompanyFactory.Company.update({ id: companyData.id }, { participations: companyData.participations }, function(response) {
            if(response.error) {
              //console.log(response);
              $scope.error = response.error;
            } else {
              $scope.message = response.success;

              CompanyFactory.Company.getAll(function (companies) {
                $scope.companies = companies;
              });
            }
          });
        } else {
          companyData.participations = [{
            event: $scope.currentEvent.id,
            status: 'Selected',
            member: member.id
          }];

          CompanyFactory.Company.create(companyData, function(response) {
            if(response.error) {
              $scope.error = response.error;
            } else {
              $scope.message = response.message;

              CompanyFactory.Company.getAll(function (companies) {
                $scope.companies = companies;
              });
            }
          });
        }
      };
    }


});


},{}],22:[function(require,module,exports){
theToolController = angular.module('theTool.controllers', []);

require('./auth');
require('./main');
require('./company');
require('./speaker');
require('./member');
require('./comment');
require('./meeting');
require('./chat');
require('./topic');
require('./communication');
require('./tag');
require('./subscription');
require('./admin');
require('./session');
},{"./admin":2,"./auth":3,"./chat":7,"./comment":11,"./communication":14,"./company":20,"./main":24,"./meeting":27,"./member":32,"./session":35,"./speaker":42,"./subscription":46,"./tag":47,"./topic":50}],23:[function(require,module,exports){
"use strict";

theToolController.controller("home", function ($rootScope, $scope, NotificationFactory) {

  $rootScope.update.timeout(runController);

  function runController(){

    $scope.loading = true;
    $scope.notifications = [];
    $scope.limit = 10;

    NotificationFactory.Notification.getAll(function (response) {
      $scope.notifications = response;
      $scope.loading = false;
    });

    $scope.scroll = function () {
      if ($scope.limit < $scope.notifications.length) {
        $scope.limit += 10;
      }
    };
  }

});

},{}],24:[function(require,module,exports){
require('./main.js');
require('./home.js');

},{"./home.js":23,"./main.js":25}],25:[function(require,module,exports){
'use strict';

theToolController.controller('MainController', function ($scope, $http, $routeParams, $sce, $location, $window, $rootScope, NotificationFactory, MemberFactory, CompanyFactory, SpeakerFactory, TopicFactory, RoleFactory, TagFactory, CommentFactory, ChatFactory, EventFactory, SessionFactory, ItemFactory) {

  //================================INITIALIZATION================================

  $scope.ready = false;

  $scope.display = false;

  $scope.search = {};
  $scope.searchTopics = {};
  $scope.searchCompanies = {};
  $scope.searchSpeakers = {};
  $scope.searchMembers = {};
  $scope.activeEvent = {};

  $scope.me = {};
  $scope.members = [];
  $scope.companies = [];
  $scope.speakers = [];
  $scope.topics = [];
  $scope.targetNotifications = [];
  $scope.unreadNotifications = [];

  $scope.targetInfo = {
    number: 0,
    text: " Loading..."
  };

  var factoriesReady = 0;

  $scope.setCurrentEvent = function(event) {
    $scope.currentEvent = {};
    setTimeout(function(){$scope.currentEvent = event;},10);
  }

  $rootScope.update = {

    running: false,

    timeout: function(cb){
      if(!$scope.ready){
        $scope.loading = true;
        if(!$rootScope.update.running){
          $rootScope.update.all();
        }
        setTimeout(function() { $rootScope.update.timeout(cb) }, 1500);
      }
      else{
        cb();
        return;
      }
    },

    me: function(){
      MemberFactory.Me.get(function (me) {
        $scope.me = me;
        callback();
      });
    },

    members: function(){
      MemberFactory.Member.getAll(function (members) {
        $scope.members = members;
        callback();
      });
    },

    companies: function(){
      CompanyFactory.Company.getAll(function (companies) {
        $scope.companies = companies;
        callback();
      });
    },

    speakers: function(){
      SpeakerFactory.Speaker.getAll(function (speakers) {
        $scope.speakers = speakers;
        callback();
      });
    },

    topics: function(){
      TopicFactory.Topic.getAll(function (topics) {
        $scope.topics = topics;
        callback();
      });
    },

    roles: function(){
      RoleFactory.Role.getAll(function (roles) {
        $scope.roles = roles;
        callback();
      });
    },

    tags: function(){
      TagFactory.Tag.getAll(function (tags) {
        $scope.topicTags = tags;
        callback();
      });
    },

    comments: function(){
      CommentFactory.Comment.getAll(function (comments) {
        $scope.comments = comments;
        callback();
      });
    },

    chats: function() {
      ChatFactory.Chat.getAll(function(chats) {
        $scope.chats = chats;
        callback();
      });
    },

    events: function() {
      EventFactory.Event.getAll(function(events) {
        $scope.events = events;
        $scope.currentEvent = events[0];
        callback();
      });
    },

    sessions: function() {
      SessionFactory.Session.getAll(function(sessions) {
        $scope.sessions = sessions;
        callback();
      });
    },

    items: function() {
      ItemFactory.Item.getAll(function(items) {
        $scope.items = items;
        callback();
      });
    },

    all: function(){
      this.running = true;
      factoriesReady = 0;
      //console.log("Updating!");
      this.me();
      this.members();
      this.companies();
      this.speakers();
      this.topics();
      this.roles();
      this.tags();
      this.comments();
      this.chats();
      this.events();
      this.sessions();
      this.items();
    }

  }

  $rootScope.update.all();


  //===================================FUNCTIONS===================================

  function callback() {
    if (++factoriesReady == 12) {
      $rootScope.update.running = false;
      $scope.ready = true;

      $scope.update();

      setInterval($scope.update, 10000);

      $rootScope.$on("$locationChangeStart", function (event, next, current) {
        setTimeout($scope.update, 500);
        $scope.search.name = '';
      });
    }
  }


  //================================SCOPE FUNCTIONS================================

  $scope.update = function() {
    NotificationFactory.Notification.getAll(function (response) {
      $scope.targetNotifications = [];
      $scope.unreadNotifications = [];
      $scope.targetInfo.number = 0;

      for (var i = 0; i < response.length; i++) {
        if (response[i].targets.indexOf($scope.me.id) != -1) {
          if (response[i].unread.indexOf($scope.me.id) != -1) {
            $scope.targetInfo.number++;
          }
          $scope.targetNotifications.unshift(response[i]);
        }
        if (response[i].unread.indexOf($scope.me.id) != -1) {
          $scope.unreadNotifications.unshift(response[i]);
        }
      }

      if ($scope.targetInfo.number == 0) {
        $scope.targetInfo.text = " No Notifications";
      }
      else {
        $scope.targetInfo.text = " " + $scope.targetInfo.number + " Notification" + ($scope.targetInfo.number > 1 ? "s" : "");
      }
    });
  }

  $scope.timeSince =function (date) {
    date = new Date(date);
    var seconds = Math.floor((Date.now() - date) / 1000);

    var suffix = 'ago';
    if(seconds < 0){
      seconds = Math.abs(seconds);
      suffix = 'to go';
    }

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years " + suffix;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months " + suffix;
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days " + suffix;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours " + suffix;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes " + suffix;
    }
    return Math.floor(seconds) + " seconds " + suffix;
  };

  $scope.formatDate = function (time) {
    return new Date(time).toUTCString();
  };

  $scope.getMember = function (memberId) {
    var member = $scope.members.filter(function(o) {
      return o.id == memberId;
    });

    if(member.length>0) {
      return member[0];
    } else {
      return {
        name: "No one",
        facebook: "100000456335972"
      }
    }
  };

  $scope.getSpeaker = function (speakerId) {
    return $scope.speakers.filter(function(o) {
      return o.id == speakerId;
    })[0];
  };

  $scope.getCompany = function (companyId) {
    return $scope.companies.filter(function(o) {
      return o.id == companyId;
    })[0];
  };

  $scope.getTopic = function (topicId) {
    return $scope.topics.filter(function(o) {
      return o._id == topicId;
    })[0];
  };

  $scope.getNotifications = function (thread) {
    return $scope.notifications.filter(function(o) {
      return o.thread == thread;
    })[0];
  };

  $scope.getUnreadNotifications = function (thread) {
    return $scope.unreadNotifications.filter(function(o) {
      return o.thread == thread;
    })[0];
  };

  $scope.getEvent = function (eventId) {
    return $scope.events.filter(function(o) {
      return o.id == eventId;
    })[0];
  };

  $scope.getSession = function (sessionId) {
    return $scope.sessions.filter(function(o) {
      return o._id == sessionId;
    })[0];
  };

  $scope.getItem = function (itemId) {
    return $scope.items.filter(function(o) {
      return o.id == itemId;
    })[0];
  };

  $scope.getParticipation = function (thing, eventId) {
    return thing.participations.filter(function(o) {
      return o.event == eventId;
    })[0];
  };

  $scope.show = function() {
    $scope.display = ($scope.search.name ? true : false);
  };

  $scope.hide = function() {
    $scope.display = false;
  };

  $scope.convertURLs = function(text) {
    var urlExp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

    return text.replace(/\n/g, '<br>').replace(urlExp,"<a href='$1'>$1</a>");
  }

  $scope.convertNewLinesToHtml = function(text) {
    return '<div data-markdown>'+text.replace(/\n/g, '<br>')+'</div>';
  }

  $scope.convertMarkdownToHtml = function(text) {
    return '<div data-markdown>' + text + '</div>';
  }

  $scope.logout = function () {
    $http.get(url_prefix + '/api/logout').
      success(function(data, status, headers, config) {
        $window.location.assign('/');
      }).
      error(function(data, status, headers, config) {
        //console.log("ERROR", data);
        $window.location.assign('/');
      });
  }


});

},{}],26:[function(require,module,exports){
"use strict";

theToolController.controller("MeetingEmbedController", function ($rootScope, $scope, MeetingFactory) {

  $rootScope.update.timeout(runController);

  function runController(){

    //================================INITIALIZATION================================

    $scope.loading = true;

    MeetingFactory.get({id: $scope.meetingId}, function (meeting) {
      $scope.meeting = meeting;

      $scope.loading = false;
    });


    //===================================FUNCTIONS===================================

    $scope.getMember = function (memberId) {
      return $scope.members.filter(function (o) {
        return o.id === memberId;
      })[0];
    };
  }

});

},{}],27:[function(require,module,exports){
require("./embed");
require("./list");
require("./meeting");

},{"./embed":26,"./list":28,"./meeting":29}],28:[function(require,module,exports){
'use strict';

theToolController.controller('MeetingsController', function ($rootScope, $scope, $location, MeetingFactory) {

  $rootScope.update.timeout(runController);

  function runController(){

    //================================INITIALIZATION================================

    $scope.loading = true;

    init();

    function init() {
      setTimeout(function() {
        if ($scope.loading) {
          init();
        }
      }, 1000);

      MeetingFactory.getAll(function (meetings) {
        $scope.meetings = meetings;

        for (var i = 0, j = $scope.meetings.length; i < j; i++) {
          $scope.meetings[i].facebook = $scope.members.filter(function(o) {
            return $scope.meetings[i].author == o.id;
          })[0].facebook;
        }

        $scope.loading = false;
      });
    }


    //===================================FUNCTIONS===================================

    $scope.time = function(date) {
      return $scope.timeSince(new Date(date));
    };

    $scope.createMeeting = function() {
      var date = new Date();

      MeetingFactory.create({
        author: $scope.me.id,
        title: date.toLocaleDateString("pt-PT") + " - Meeting",
        date: date
      }, function(response) {
        if (response.success) {
          $location.path("/meeting/" + response.id + "/edit");
        }
      });
    };
  }
});

},{}],29:[function(require,module,exports){
"use strict";

theToolController.controller("MeetingController", function ($rootScope, $scope, $routeParams, $location, $timeout, MeetingFactory, TopicFactory, TagFactory) {

  $rootScope.update.timeout(runController);

  function runController(){

    //================================INITIALIZATION================================

    $scope.loading = true;

    $scope.kinds = ["Info", "To do", "Decision", "Idea"];

    MeetingFactory.get({id: $routeParams.id}, function (meeting) {
      $scope.meeting = meeting;

      String.prototype.endsWith = function (suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
      };

      if ($location.path().endsWith("/text")) {
        var text = meeting.title + "\n\n" + (meeting.description ? meeting.description + "\n\n" : "");

        if (meeting.attendants.length > 0) {
          text += "Attendants:\n";

          meeting.attendants.sort();

          for (var i = 0; i < meeting.attendants.length; i++) {
            text += $scope.getMember(meeting.attendants[i]).name + (i+1 < meeting.attendants.length ? ", " : "");
          }
          text += "\n\n";
        }

        TagFactory.Tag.getAll(function (result) {
          var tags = [];

          for (var i = 0; i < result.length; i++) {
            tags.push(result[i]);
          }

          tags.sort(function (o1, o2) {
            return o1.name.localeCompare(o2.name);
          });

          for (var i = 0; i < tags.length; i++) {
            var topics = meeting.topics.filter(function (o) {
              return o.tags.indexOf(tags[i].id) != -1;
            });

            if (topics.length === 0) {
              continue;
            }

            text += tags[i].name + ":\n";

            topics.sort(function (o1, o2) {
              return o1.posted.toString().localeCompare(o2.posted.toString());
            });

            for (var j = 0; j < topics.length; j++) {
              text += "    - " + topics[j].text.replace(/\n/g, "\n      ") + "\n";
            }

            text += "\n";
          }

          $scope.numberOfLines = (function () {
            var n = 0;
            for (var i = 0; i < text.length; i++) {
              if (text[i] === "\n") {
                n++;
              }
            }
            return n + 2;
          }());

          $scope.text = text;

          $scope.loading = false;
        });
      }
      else {
        $scope.loading = false;
      }
    });


    //===================================FUNCTIONS===================================

    $scope.toggleAttendant = function (member) {
      var index = $scope.meeting.attendants.indexOf(member);

      if (index === -1) {
        $scope.meeting.attendants.push(member);
      }
      else {
        $scope.meeting.attendants.splice(index, 1);
      }
    };

    $scope.toggleAttendants = function () {
      for (var i = 0, j = $scope.members.length; i < j; i++) {
        $scope.toggleAttendant($scope.members[i].id);
      }
    };

    $scope.getAttendants = function () {
      return $scope.meeting.attendants.map(function (o) {
        return $scope.getMember(o);
      });
    };

    $scope.createTopic = function (kind) {
      var topic = {
        editing: true,
        author: $scope.me.id,
        text: "",
        targets: [],
        kind: kind,
        closed: false,
        result: "",
        poll: {
          kind: "text",
          options: []
        },
        duedate: null,
        meetings: [$scope.meeting._id],
        root: null,
        tags: [],
        posted: new Date()
      };

      TopicFactory.Topic.create(topic, function (response) {
        if (response.success) {
          topic._id = response.id;
          $scope.meeting.topics.push(topic);
        }
      });
    };

    $scope.addTopic = function (topicId) {
      $scope.display = false;

      var topic = $scope.topics.filter(function (o) {
        return o._id === topicId;
      })[0];

      $scope.meeting.topics.push(topic);

      topic.meetings.push($scope.meeting._id);
      TopicFactory.Topic.update({id: topic._id}, topic);
    };

    $scope.removeTopic = function (topic) {
      $scope.meeting.topics.splice($scope.meeting.topics.indexOf(topic), 1);

      topic.meetings.splice(topic.meetings.indexOf($scope.meeting._id), 1);
      TopicFactory.Topic.update({id: topic._id}, topic);
    };

    $scope.saveMeeting = function () {
      $scope.success = "";
      $scope.error   = "";

      if (!$scope.meeting.title){
        $scope.error = "Please enter a title.";
        return;
      }

      MeetingFactory.update({id: $scope.meeting._id}, $scope.meeting, function (response) {
        if (response.success) {
          $scope.success = "Meeting saved.";

          if ($scope.timeout) {
            $timeout.cancel($scope.timeout);
          }

          $scope.timeout = $timeout(function () {
            $scope.success = "";
          }, 3000);
        }
        else {
          $scope.error = "There was an error. Please contact the Dev Team and give them the details about the error.";
        }
      });
    };

    $scope.deleteMeeting = function () {
      if (confirm("Are you sure you want to delete this meeting?")) {
        MeetingFactory.delete({id: $scope.meeting._id}, function (response) {
          if(response.error) {
            $scope.error = "There was an error. Please contact the Dev Team and give them the details about the error.";
          }
          else {
            $location.path("/meetings/");
          }
        });
      }
    };

    $scope.show = function () {
      $scope.display = ($scope.searchTopic ? true : false);
    };

    $scope.alreadyInMeetingFilter = function (topic) {
      for (var i = 0; i < $scope.meeting.topics.length; i++) {
        if ($scope.meeting.topics[i]._id === topic._id) {
          return false;
        }
      }
      return true;
    };
  }
});

},{}],30:[function(require,module,exports){
"use strict";

theToolController.controller("CreateMemberController", function ($rootScope, $scope, $http, $location, $routeParams, MemberFactory) {

 $rootScope.update.timeout(runController);

  function runController(){

    $scope.formData = {};
    $scope.formData.roles = [];
    $scope.formData.phones = [];

    $scope.submit = function() {
      var memberData = this.formData;

      MemberFactory.Member.create(memberData, function(response) {
        if(response.error) {
          $scope.error = response.error;
        } else {
          $scope.message = response.message;
          $location.path("/member/" + response.id);
        }
      });
    };
  }

});

},{}],31:[function(require,module,exports){
"use strict";

theToolController.controller("MemberEmbedController", function ($rootScope, $scope) {

  $rootScope.update.timeout(runController);

  function runController(){

  }

});

},{}],32:[function(require,module,exports){
require('./member.js');
require('./list.js');
require('./create.js');
require('./embed.js');
},{"./create.js":30,"./embed.js":31,"./list.js":33,"./member.js":34}],33:[function(require,module,exports){
"use strict";

theToolController.controller("MembersController", function ($rootScope, $scope, MemberFactory) {
  
  $rootScope.update.timeout(runController);

  function runController(){
    MemberFactory.Member.getAll(function (response) {
      $scope.memberPredicate = "name";
      $scope.reverse = false;
      $scope.members = response;
    });
  }
});

},{}],34:[function(require,module,exports){
"use strict";

theToolController.controller("MemberController", function ($rootScope, $scope, $http, $routeParams, $sce, $location, MemberFactory) {

  $rootScope.update.timeout(runController);

  function runController(){

    $scope.loading = true;

    if ($routeParams.id === "me") {
      $location.path("/member/" + $scope.me.id);
      return;
    }

    $scope.member = $scope.formData = $scope.getMember($routeParams.id);

    MemberFactory.Member.get({id:$routeParams.id}, function(result) { 
      if(!result.error) {
        $scope.member = $scope.formData = result;
        getMemberStuff();
      } 
    });

    getMemberStuff();

    function getMemberStuff() {
      if($scope.companies && $scope.speakers && $scope.comments && $scope.companies.length > 0 && $scope.speakers.length > 0 && $scope.comments.length > 0) {
        $scope.loading = false;
      } else {
        return setTimeout(getMemberStuff, 1000);
      }

      $scope.memberStuff = {};

      $scope.memberStuff.companies = $scope.companies.filter(function(e) {
        return e.member == $scope.member.id;
      })

      $scope.memberStuff.speakers = $scope.speakers.filter(function(e) {
        return e.member == $scope.member.id;
      })

      $scope.memberStuff.comments = $scope.comments.filter(function(e) {
        return e.member == $scope.member.id;
      })
    }


    $scope.submit = function() {
      var memberData = this.formData;

      MemberFactory.Member.update({ id:memberData.id }, memberData, function(response) {
        if(response.error) {
          $scope.error = response.error;
        } else {
          $scope.message = response.success;
        }
      });
    };
  }
});

},{}],35:[function(require,module,exports){
require('./session.js');
require('./sessions.js');
require('./view.js');

},{"./session.js":36,"./sessions.js":37,"./view.js":38}],36:[function(require,module,exports){
'use strict';

theToolController
.controller('SessionController', function ($rootScope, $scope, $http, $routeParams, $location, SessionFactory) {

    var options = require('./../../../../../options.js');
    var initialDatePicker;
    var finalDatePicker;
    var myValidator;
    $scope.allDay = false;
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

    var init = function() {
        initDate();

        if ($routeParams.id !== undefined) {
            var session = $scope.getSession($routeParams.id);

            $scope.formData = {
                name: session.name,
                kind: session.kind,
                url: session.url,
                place: session.place,
                description: session.description
            };

            $scope.speakersList = session.speakers;
            $scope.companiesList =  session.companies;
            $scope.date.initialDate = session.initialDate;
            $scope.date.finalDate = session.finalDate;
        }
    }

    init()


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
        console.log("Entrei");
        console.log(myValidator.validate());
        if(myValidator.validate() === true) {
            var initialDate = initialDatePicker.getDate();
            var finalDate = finalDatePicker.getDate();

            if(!$scope.allDay){
                initialDate.setHours($scope.date.initialDate.hours);
                initialDate.setMinutes($scope.date.initialDate.minutes); 
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
                allDay: $scope.allDay,
                initialDate: initialDate,
                finalDate: finalDate
            }
            console.log(sessionData);

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

                console.log(message);

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

        FormValidator.setRule('chooseDate', 'Select a valid date.', function(value){
            return  $scope.allDay || (!$scope.allDay 
                && $scope.date.initialDate.hours !== "" 
                && $scope.date.initialDate.minutes !== ""
                && $scope.date.finalDate.hours !== "" 
                && $scope.date.finalDate.minutes !== "");
        });

        myValidator = new FormValidator('#myForm');
    });
});

},{"./../../../../../options.js":105}],37:[function(require,module,exports){
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

},{"./../../../../../options.js":105}],38:[function(require,module,exports){
'use strict';

theToolController
.controller('ViewSessionController', function ($rootScope, $scope, $http, $routeParams, $location) {

	$scope.session = $scope.getSession($routeParams.id);

});
},{}],39:[function(require,module,exports){
'use strict';

theToolController
  .controller('SpeakerEmailController', function ($rootScope, $scope, $http, $routeParams, $sce, $location, EmailFactory) {

    $rootScope.update.timeout(runController);

    function runController(){

      $scope.email = $location.search().email;
      $scope.speakerId = $routeParams.id;
      $scope.loading = false;
      $scope.error = null;
      $scope.message = null;

      $scope.submit = function() {
        $scope.loading = true;
        $scope.error = null;
        $scope.message = null;

        //console.log("send email to ", $scope.email, " from ", $scope.speakerId);

        EmailFactory.Speaker.send({ id: $scope.speakerId }, { email: $scope.email }, function(response) {
          $scope.loading = false;
          if(response.error) {
            $scope.error = response.error;
          } else {
            $scope.message = response.message;
          }
        });
      };
    }
  });

},{}],40:[function(require,module,exports){
'use strict';
 
theToolController
  .controller('CreateSpeakerController', function ($rootScope, $scope, $http, $routeParams, $location, SpeakerFactory) {
    
    $rootScope.update.timeout(runController);

    function runController(){

      $scope.submit = function() {
        var speakerData = this.formData;

        speakerData.status = 'Suggestion';

        SpeakerFactory.Speaker.create(speakerData, function(response) {
          if(response.error) {
            $scope.error = response.error;
          } else {
            $scope.message = response.message;

            SpeakerFactory.Speaker.getAll(function (speakers) {
              $scope.speakers = speakers;
            });
            
            $location.path("/speaker/" + response.id);
          }
        });
      };
    }
  });
},{}],41:[function(require,module,exports){
'use strict';

theToolController.controller('SpeakerEmbedController', function ($rootScope, $scope) {

  $rootScope.update.timeout(runController);

  function runController(){

    if($scope.comments) {
      $scope.speaker.comments = $scope.comments.filter(function(e) {
        return e.thread == 'speaker-'+$scope.speaker.id;
      });
    }

    if($scope.event) {
      $scope.participation = $scope.speaker.participations.filter(function(o) {
        return o.event == $scope.event.id;
      })[0];
    }

    $scope.getUnreadNotifications = function (thread) {
      var notifications = $scope.notifications.filter(function(o) {
        return o.thread == thread;
      });
      return notifications;
    };

    $scope.speaker.unread = $scope.getUnreadNotifications('speaker-' + $scope.speaker.id).length > 0;

    $scope.getMember = function (memberId) {
      var member = $scope.members.filter(function(o) {
        return o.id == memberId;
      });

      if(member.length>0) {
        return member[0];
      } else {
        return {
          name: 'No one',
          facebook: '100000456335972'
        };
      }
    };

    $scope.timeSince =function (date) {
      date = new Date(date);
      var seconds = Math.floor((Date.now() - date) / 1000);

      var suffix = 'ago';
      if(seconds < 0){
        seconds = Math.abs(seconds);
        suffix = 'to go';
      }

      var interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
          return interval + ' years ' + suffix;
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
          return interval + ' months ' + suffix;
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
          return interval + ' days ' + suffix;
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
          return interval + ' hours ' + suffix;
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
          return interval + ' minutes ' + suffix;
      }
      return Math.floor(seconds) + ' seconds ' + suffix;
    };
  }

});

},{}],42:[function(require,module,exports){
require('./speaker.js');
require('./list.js');
require('./create.js');
require('./confirm.js');
require('./embed.js');

},{"./confirm.js":39,"./create.js":40,"./embed.js":41,"./list.js":43,"./speaker.js":44}],43:[function(require,module,exports){
'use strict';

theToolController
  .controller('SpeakersController', function ($rootScope, $scope, $http, $sce, SpeakerFactory) {

    $rootScope.update.timeout(runController);

    function runController(){

      $scope.limit = 20;

      $scope.statuses = ['Suggestion','Selected','Approved','Contacted','In Conversations','Accepted','Rejected','Give Up'];

      $scope.speakerPredicate = 'updated';
      $scope.reverse = 'true';
      $scope.filteredSpeakers = [];
      $scope.searchSpeakers = {unassigned: true, unassignedOnly: false};
      $scope.unreadFirst = true;



      SpeakerFactory.Speaker.getAll(function(response) {
        $scope.speakers = response;
        //$scope.filteredSpeakers = $scope.speakers;
      });

      $scope.scroll = function() {
        if ($scope.limit <= $scope.speakers.length)
          $scope.limit += 8;
      };

      $scope.checkPermission = function (member) {
        var roles = $scope.me.roles.filter(function(o) {
          return o.id == 'development-team' || o.id == 'coordination';
        });

        if(roles.length === 0 && member.id != $scope.me.id) {
          return false;
        }

        return true;
      };

      $scope.addSpeaker = function(member, newSpeaker) {
        //console.log(newSpeaker);
        var speakerData = newSpeaker;

        if(newSpeaker.id) {
          var participation = $scope.getParticipation(speakerData, $scope.currentEvent.id);
          if(participation) {
            participation.member = member.id;
          } else {
            speakerData.participations.push({
              event: $scope.currentEvent.id,
              status: 'Selected',
              member: member.id
            });
          }
          SpeakerFactory.Speaker.update({ id: speakerData.id }, { participations: speakerData.participations }, function(response) {
            if(response.error) {
              //console.log(response);
              $scope.error = response.error;
            } else {
              $scope.message = response.success;

              SpeakerFactory.Speaker.getAll(function (speakers) {
                $scope.speakers = speakers;
              });
            }
          });
        } else {
          speakerData.participations = [{
            event: $scope.currentEvent.id,
            status: 'Selected',
            member: member.id
          }];

          SpeakerFactory.Speaker.create(speakerData, function(response) {
            if(response.error) {
              $scope.error = response.error;
            } else {
              $scope.message = response.message;

              SpeakerFactory.Speaker.getAll(function (speakers) {
                $scope.speakers = speakers;
              });
            }
          });
        }
      };

      // $scope.$watch(['currentEvent', 'searchStatus'], function(newValues, oldValues, scope){
      //   //console.log('filtering speakers by',$scope.searchStatus,$scope.currentEvent);
      //   if($scope.speakers){
      //     $scope.filteredSpeakers = $scope.speakers.filter(function(o) {
      //       return o.participations.filter(function(p) {
      //         if($scope.searchStatus && $scope.searchStatus !== '') {
      //           return p.event === $scope.currentEvent.id && p.status === $scope.searchStatus;
      //         } else {
      //           return p.event === $scope.currentEvent.id;
      //         }
      //       });
      //     });
      //   }
      // });
    }
  });


},{}],44:[function(require,module,exports){
'use strict';

theToolController
  .controller('SpeakerController', function ($rootScope, $scope, $location, $window, $routeParams, $sce, SpeakerFactory, MemberFactory, NotificationFactory) {
    
    $rootScope.update.timeout(runController);

    function runController(){

      $scope.communicationEvent = $scope.currentEvent;

      $scope.setCommunicationEvent = function(event) {
        $scope.communicationEvent = event;
      }

      $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src+'#page-body');
      };

      $scope.convertEmails = function(text) {
        var mailExp = /[\w\.\-]+\@([\w\-]+\.)+[\w]{2,4}(?![^<]*>)/ig;
        var twitterExp = /(^|[^@\w])@(\w{1,15})\b/g;
        return text.replace(mailExp,'<a href="mailto:$&">$&</a>').replace(twitterExp,'$1<a href="http://twitter.com/$2" target="_blank">@$2</a>');
      };

      $scope.submit = function() {
        var speakerData = this.formData;

        SpeakerFactory.Speaker.update({ id:speakerData.id }, speakerData, function(response) {
          if(response.error) {
            $scope.error = response.error;
          } else {
            $scope.message = response.success;
            $location.path('speaker/'+speakerData.id);
          }
        });
      };

      $scope.deleteSpeaker = function(speaker) {
        SpeakerFactory.Speaker.delete({ id:speaker.id }, function(response) {
          if(response.error) {
            $scope.error = response.error;
          } else {
            $scope.message = response.success;
          }
          $location.path('speakers/');
        });
      };

      $scope.checkPermission = function () {
        var roles = $scope.me.roles.filter(function(o) {
          return o.id == 'development-team' || o.id == 'coordination';
        });

        if(roles.length === 0) {
          return false;
        }

        return true;
      };

      $scope.statuses = ['Suggestion','Selected','Approved','Contacted','In Conversations','Accepted','Rejected','Give Up'];

      $scope.speaker = $scope.formData = $scope.getSpeaker($routeParams.id);

      SpeakerFactory.Speaker.get({id: $routeParams.id}, function(response) {
        $scope.speaker = $scope.formData = response;

        NotificationFactory.Speaker.getAll({id: $routeParams.id}, function(getData) {
          $scope.speakerNotifications = getData;

          $scope.loading = false;
        });
      });

      var win = $window;
      $scope.$watch('speakerForm.$dirty', function(value) {
        if(value) {
          win.onbeforeunload = function(){
            return 'You have unsaved changes';
          };
        }
      });
    }

  });

},{}],45:[function(require,module,exports){
"use strict";

theToolController.controller("SubscriptionController", function ($rootScope, $scope, SubscriptionFactory) {

  $rootScope.update.timeout(runController);

  function runController(){

    $scope.loading = true;

    var threadId = $scope.thread.substring($scope.thread.indexOf("-") + 1);
    var threadKind = $scope.thread.split('-')[0];

    var Factory;

    switch(threadKind) {
      case 'company':
        Factory = SubscriptionFactory.Company;
      break;
      case 'speaker':
        Factory = SubscriptionFactory.Speaker;
      break;
      case 'topic':
        Factory = SubscriptionFactory.Topic;
      break;
    }

    //console.log('THREAD', $scope.thread, threadKind, threadId);
    //console.log('FACTORYYY', SubscriptionFactory.Company, SubscriptionFactory.Speaker, SubscriptionFactory.Topic, Factory);

    $scope.isSubscribed = false;

    $scope.getStatus = function () {
      Factory.get({id: threadId}, function(response) {
        //console.log('STATUS',response.success)
        if(response.success == 'subscribed') {
          $scope.isSubscribed = true;
        } else {
          $scope.isSubscribed = false;
        }
      })
    };

    $scope.subscribe = function () {
      //console.log('ADDD', threadKind, threadId);
      Factory.add({id: threadId}, {}, function(response) {
        $scope.getStatus();
      })
    };

    $scope.unsubscribe = function () {
      //console.log('DELETE', threadKind, threadId);
      Factory.remove({id: threadId}, function(response) {
        $scope.getStatus();
      })
    };

    $scope.getStatus();
  }
});

},{}],46:[function(require,module,exports){
require('./embed');
},{"./embed":45}],47:[function(require,module,exports){
require('./manager');
},{"./manager":48}],48:[function(require,module,exports){
"use strict";

theToolController.controller("TagManagerController", function ($rootScope, $scope, TagFactory) {

  $rootScope.update.timeout(runController);

  function runController(){

    $scope.loading = true;

    $scope.tag = {};

    $scope.lightColors = ["#f7c6c7", "#fad8c7", "#fef2c0", "#bfe5bf", "#bfdadc", "#c7def8", "#bfd4f2", "#d4c5f9"];
    $scope.colors = ["#e11d21", "#eb6420", "#fbca04", "#009800", "#006b75", "#207de5", "#0052cc", "#5319e7"];

    $scope.changeColor = function (color) {
      $scope.tag.color = color;
    };

    $scope.createTag = function (tag) {
      TagFactory.Tag.create(tag, function (response) {
        if (response.success) {
          $scope.tags.push(response.tag);
          $scope.tag = {};
        }
      });
    };

    $scope.saveTag = function (tag) {
      TagFactory.Tag.update({id: tag.id}, tag, function (response) {
        if (response.success) {
          tag.editing = false;
        }
      });
    };

    $scope.deleteTag = function (tag) {
      TagFactory.Tag.delete({id: tag.id}, function (response) {
        if (response.success) {
          $scope.tags.splice($scope.tags.indexOf(tag), 1);
        }
      });
    };
  }
});

},{}],49:[function(require,module,exports){
"use strict";

theToolController.controller("TopicEmbedController", function ($rootScope, $scope, $location, TopicFactory, NotificationFactory) {

  $rootScope.update.timeout(runController);

  function runController(){

    //================================INITIALIZATION================================

    $scope.loading = true;

    $scope.error       = "";
    $scope.showTargets = false;

    $scope.pollKinds = ["text", "images"];

    if ($scope.comments) {
      $scope.topic.comments = $scope.comments.filter(function (e) {
        return e.thread == "topic-" + $scope.topic._id;
      });
    }

    show($scope.topic);


    //=================================AUXFUNCTIONS==================================

    function show(topic) {
      topic.show = {
        text     : true,
        targets  : true,
        poll     : false,
        duedate  : false,
        meeting  : true,
        closed   : false
      };

      if (topic.kind === "To do") {
        topic.show.duedate = true;
        topic.show.closed  = true;
      }
      else if (topic.kind === "Decision") {
        topic.show.duedate = true;
        topic.show.closed  = true;
        topic.show.poll = true;
      }

      $scope.loading = false;
    }

    $scope.checkPermission = function (topic) {
      if (!$scope.me.roles) { return false; }

      var roles = $scope.me.roles.filter(function (o) {
        return o.id == 'development-team' || o.id == 'coordination';
      });

      if (roles.length == 0 && topic.author != $scope.me.id) {
        return false;
      }

      return true;
    }


    //===================================FUNCTIONS===================================

    $scope.deleteTopic = function (topic) {
      if (confirm("Are you sure you want to delete this topic?")) {
        TopicFactory.Topic.delete({id: topic._id}, function () {
          topic.deleted = true;
          $location.path('/topics');
        });
      }
    };

    $scope.toggleTag = function (tag) {
      var index = $scope.topic.tags.indexOf(tag);

      if (index == -1) {
        $scope.topic.tags.push(tag);
      }
      else {
        $scope.topic.tags.splice(index, 1);
      }
    };

    $scope.getTagIcon = function (tag) {
      return ($scope.topic.tags.indexOf(tag.id) !== -1 ? "check" : "times");;
    };

    $scope.toggleTarget = function (target) {
      var index = $scope.topic.targets.indexOf(target);

      if (index == -1) {
        $scope.topic.targets.push(target);
      }
      else {
        $scope.topic.targets.splice(index, 1);
      }
    };

    $scope.toggleAllTargets = function () {
      for (var i = 0, j = $scope.members.length; i < j; i++) {
        $scope.toggleTarget($scope.members[i].id);
      }
    };

    $scope.toggleRoleTargets = function (roleId) {
      for (var i = 0, j = $scope.members.length; i < j; i++) {
        for(var o = 0; o < $scope.members[i].roles.length; o++) {
          if ($scope.members[i].roles[o].id == roleId) {
            $scope.toggleTarget($scope.members[i].id);
          }
        }
      }
    };

    $scope.toggleTargets = function () {
      $scope.showTargets = !$scope.showTargets;
    };

    $scope.getTargetColor = function (memberId) {
      return ($scope.topic.targets.indexOf(memberId) !== -1 ? "blue" : "");
    };

    $scope.focusOption = function (option) {
      for (var i = 0, j = $scope.topic.poll.options.length; i < j; i++) {
        $scope.topic.poll.options[i].editing = false;
      }

      option.editing = true;
    };

    $scope.addOption = function () {
      var option = {
        optionType: "Info",
        targets: []
      };

      $scope.topic.poll.options.push(option);

      $scope.focusOption(option);
    };

    $scope.removeOption = function (option) {
      $scope.topic.poll.options.splice($scope.topic.poll.options.indexOf(option), 1);
    };

    $scope.selectOption = function (topic, option) {
      var updatedTopic = topic;

      if (option.votes.indexOf($scope.me.id) !== -1) {
        updatedTopic.poll.options[updatedTopic.poll.options.indexOf(option)].votes.splice(updatedTopic.poll.options[updatedTopic.poll.options.indexOf(option)].votes.indexOf($scope.me.id), 1);
      }
      else {
        updatedTopic.poll.options[updatedTopic.poll.options.indexOf(option)].votes.push($scope.me.id);
      }

      updatedTopic._voting = true;

      TopicFactory.Topic.update({id: updatedTopic._id}, updatedTopic, function (response) {
        if (response.error) {
          //console.log("There was an error. Please contact the Dev Team and give them the details about the error.");
        }
        else if (response.success) {
          ////console.log(response.success);
        }
      });
    };

    $scope.save = function (topic) {
      $scope.error = "";

      //console.log(topic);

      TopicFactory.Topic.update({id: topic._id}, topic, function (response) {
        if (response.success) {
          topic.editing = !topic.editing;
        }
        else {
          $scope.error = "There was an error. Please contact the Dev Team and give them the details about the error.";
        }
      });
    };

    $scope.read = function (topic) {
      if (!$scope.notifications) {
        return;
      }

      $scope.notifications.filter(function (o) {
        return o.thread === "topic-" + topic._id;
      }).forEach(function (notification) {
        var index = notification.unread.indexOf($scope.me.id);
        if (index !== -1) {
          notification.unread.splice(index, 1);
          NotificationFactory.Notification.update({id: notification._id}, notification);
        }
      });
    };

    $scope.getMember = function (memberId) {
      var member = $scope.members.filter(function (o) {
        return o.id == memberId;
      });

      if (member && member.length > 0) {
        return member[0];
      }
      else {
        return {
          name: "No one",
          facebook: "100000456335972"
        };
      }
    };

    $scope.getUnreadNotifications = function (thread) {
      //console.log(notifications);
      var notifications = $scope.notifications.filter(function(o) {
        return o.thread == thread;
      });

      return notifications;
    };

     $scope.topic.unread = $scope.getUnreadNotifications('topic-'+ $scope.topic._id).length > 0;

    $scope.timeSince =function (date) {
      date = new Date(date);
      var seconds = Math.floor((Date.now() - date) / 1000);

      var suffix = "ago";
      if (seconds < 0){
        seconds = Math.abs(seconds);
        suffix = "to go";
      }

      var interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
          return interval + " years " + suffix;
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
          return interval + " months " + suffix;
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
          return interval + " days " + suffix;
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
          return interval + " hours " + suffix;
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
          return interval + " minutes " + suffix;
      }
      return Math.floor(seconds) + " seconds " + suffix;
    };

    $scope.formatDate = function (time) {
      return new Date(time).toUTCString();
    };
  }
});

},{}],50:[function(require,module,exports){
require('./list');
require('./topic');
require('./embed');

},{"./embed":49,"./list":51,"./topic":52}],51:[function(require,module,exports){
"use strict";

theToolController.controller("TopicsController", function ($rootScope, $scope, $location, $routeParams, TopicFactory) {

  $rootScope.update.timeout(runController);

  function runController(){

    //================================INITIALIZATION================================

    $scope.loading = true;

    $scope.kinds = ["Info", "To do", "Decision", "Idea"];

    $scope.searchTopics = {};

    $scope.unreadFirst = true;

    TopicFactory.Topic.getAll(gotTopics);

    function gotTopics (topics) {
      setTimeout(function () {
        if ($scope.loading) {
          gotTopics(topics);
        }
      }, 1000);

      $scope.topics = topics;

      for (var i = 0, j = $scope.topics.length; i < j; i++) {
        $scope.topics[i].facebook = $scope.members.filter(function (o) {
          return $scope.topics[i].author === o.id;
        })[0].facebook;
      }

      $scope.loading = false;
    }

    $scope.showOpen = true;
    $scope.limit = 10;


    //===================================FUNCTIONS===================================

    $scope.time = function(date) {
      return $scope.timeSince(new Date(date));
    };

    $scope.createTopic = function(kind) {
      var date = new Date();
      TopicFactory.Topic.create({
        author: $scope.me.id,
        kind: kind,
        tags: [$scope.searchTopics.tags]
      }, function (response) {
        if (response.success) {
          TopicFactory.Topic.getAll(function (topics) {
            $scope.topics = topics;
            $scope.topics.filter(function (o) {
              return o._id == response.id;
            })[0].editing = true;
            $location.path('topic/'+response.id);
          });
        }
      });
    };

    $scope.count = function (open) {
      return $scope.topics.filter(function (o) {
        return (open ? !o.closed : o.closed);
      }).length;
    };

    $scope.shownTopics = function (open) {
      return $scope.topics.filter(function (o) {
        return o.editing || (open ? !o.closed : o.closed) && (function () {
          if ($scope.searchTopics.tags && o.tags.indexOf($scope.searchTopics.tags) === -1) {
            return false;
          }
          if ($scope.searchTopics.target && o.targets.indexOf($scope.searchTopics.target) === -1) {
            return false;
          }
          if ($scope.searchTopics.kind && o.kind !== $scope.searchTopics.kind) {
            return false;
          }
          return true;
        }());
      });
    };

    $scope.scroll = function() {
      if ($scope.limit < $scope.topics.length)
        $scope.limit += 4;
    };
  }
});

},{}],52:[function(require,module,exports){
'use strict';

theToolController.controller('TopicController', function ($rootScope, $scope, $routeParams, $location, $window, TopicFactory, NotificationFactory) {

  $rootScope.update.timeout(runController);

  function runController(){

    $scope.loading = true;

    TopicFactory.Topic.get({id: $routeParams.id}, function(result) {
      $scope.topic = result;

      //console.log($location.search());
      if($location.search().editing == true) {
        $scope.topic.editing=true;
        //console.log('TRUEEE');
      }

      $scope.topic.showComments = true;

      $scope.loading = false;
    });
  }

});

},{}],53:[function(require,module,exports){
'use strict';

theToolDirectives
  .directive('commentArea', function () {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: 'views/comment/area.html',
      controller: 'CommentAreaController',
      scope: {
        thread: '@',
        subthread: '@',
        me: '=',
        members: '='
      }
    };
  });
},{}],54:[function(require,module,exports){
'use strict';

theToolDirectives
  .directive('firstComment', function () {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: 'views/comment/first.html',
      controller: 'FirstCommentController',
      scope: {
        thread: '@'
      }
    };
  })
},{}],55:[function(require,module,exports){
require('./area');
require('./first');
},{"./area":53,"./first":54}],56:[function(require,module,exports){
'use strict';

theToolDirectives
  .directive('communicationArea', function () {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: 'views/communication/area.html',
      controller: 'CommunicationAreaController',
      scope: {
        thread: '@',
        event: '=',
        membersJson: '@members',
        meJson: '@me',
        rolesJson: '@roles'
      }
    };
  })
},{}],57:[function(require,module,exports){
'use strict';

theToolDirectives
  .directive('communication', function () {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: 'views/communication/communication.html',
      controller: 'CommunicationEmbedController',
      scope: {
        communication: '=communicationObject',
        members: '=',
        me: '='
      }
    };
  })
},{}],58:[function(require,module,exports){
require('./area');
require('./communication');
},{"./area":56,"./communication":57}],59:[function(require,module,exports){
'use strict';

theToolDirectives
  .directive('companyCard', function () {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: 'views/company/card.html',
      controller: 'CompanyEmbedController',
      scope: {
        company: '=company',
        event: '=event',
        notifications: '=notifications',
        me: '=me',
        members: '=members'
      }
    };
  });

},{}],60:[function(require,module,exports){
require('./card');
},{"./card":59}],61:[function(require,module,exports){
require('./input')
},{"./input":62}],62:[function(require,module,exports){
'use strict';

theToolDirectives
  .directive(
    'dateInput',
    function(dateFilter) {
        return {
            require: 'ngModel',
            template: '<input type="date"></input>',
            replace: true,
            link: function(scope, elm, attrs, ngModelCtrl) {
                ngModelCtrl.$formatters.unshift(function (modelValue) {
                    return dateFilter(modelValue, 'yyyy-MM-dd');
                });

                ngModelCtrl.$parsers.unshift(function(viewValue) {
                    return new Date(viewValue);
                });
            },
        };
  })
},{}],63:[function(require,module,exports){
theToolDirectives = angular.module("theTool.directives", []);

require("./comment");
require("./communication");
require("./company");
require("./date");
require("./markdown");
require("./meeting");
require("./speaker");
require("./tag");
require("./topic");
require("./scroll");
require("./subscription");
require("./member");
},{"./comment":55,"./communication":58,"./company":60,"./date":61,"./markdown":65,"./meeting":68,"./member":70,"./scroll":71,"./speaker":74,"./subscription":75,"./tag":77,"./topic":80}],64:[function(require,module,exports){
'use strict';

theToolDirectives
  .directive('compile', ['$compile', function ($compile) {
    return function(scope, element, attrs) {
        scope.$watch(
          function(scope) {
             // watch the 'compile' expression for changes
            return scope.$eval(attrs.compile);
          },
          function(value) {
            // when the 'compile' expression changes
            // assign it into the current DOM
            element.html(value);

            // compile the new DOM and link it to the current
            // scope.
            // NOTE: we only compile .childNodes so that
            // we don't get into infinite loop compiling ourselves
            $compile(element.contents())(scope);
          }
      );
    }
  }])
},{}],65:[function(require,module,exports){
require('./compile');
require('./markdown');
},{"./compile":64,"./markdown":66}],66:[function(require,module,exports){
'use strict';

theToolDirectives
  .directive('markdown', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var htmlText = markdown.toHTML(element.text());
            element.html(htmlText.replace(/\n/g, '<br>'));
        }
    };
  }])
},{}],67:[function(require,module,exports){
"use strict";

theToolDirectives.directive("embedMeeting", function () {
  return {
    restrict: "E",
    replace: true,
    templateUrl: "views/meeting/embed.html",
    controller: "MeetingEmbedController",
    scope: {
      meetingId: "=",
      members: "="
    }
  };
});

},{}],68:[function(require,module,exports){
require("./embed");

},{"./embed":67}],69:[function(require,module,exports){
'use strict';

theToolDirectives
  .directive('memberCard', function () {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: 'views/member/card.html',
      controller: 'MemberEmbedController',
      scope: {
        member: '=memberObject',
      }
    };
  })

},{}],70:[function(require,module,exports){
require('./card.js');
},{"./card.js":69}],71:[function(require,module,exports){
require("./position.js");
},{"./position.js":72}],72:[function(require,module,exports){
"use strict";

theToolDirectives.directive('whenScrolled', ['$timeout', function($timeout) {
  return function(scope, elm, attr) {

    //console.log("On directive");

    //console.log(elm);

    var raw = elm[0];
    //console.log(raw);

    $timeout(function() {
      //console.log(raw.scrollTop);
      //console.log(raw.scrollHeight);
      raw.scrollTop = raw.scrollHeight;
    });

    elm.bind('scroll', function() {
      if (raw.scrollTop <= 100) { // load more items before you hit the top
        var sh = raw.scrollHeight
        scope.$apply(attr.whenScrolled);
        raw.scrollTop = raw.scrollHeight - sh;
      }
    });
  };
}]);

},{}],73:[function(require,module,exports){
'use strict';

theToolDirectives
  .directive('speakerCard', function () {
    return {
      restrict: 'AEC',
      replace: true,
      templateUrl: 'views/speaker/card.html',
      controller: 'SpeakerEmbedController',
      scope: {
        speaker: '=speaker',
        event: '=event',
        notifications: '=notifications',
        me: '=me',
        members: '=members'
      }
    };
  });

},{}],74:[function(require,module,exports){
arguments[4][60][0].apply(exports,arguments)
},{"./card":73}],75:[function(require,module,exports){
require('./subscription');
},{"./subscription":76}],76:[function(require,module,exports){
'use strict';

theToolDirectives
  .directive('subscription', function () {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: 'views/subscription/button.html',
      controller: 'SubscriptionController',
      scope: {
        thread: '@'
      }
    };
  })
},{}],77:[function(require,module,exports){
arguments[4][47][0].apply(exports,arguments)
},{"./manager":78}],78:[function(require,module,exports){
"use strict";

theToolDirectives
  .directive("tagManager", function () {
    return {
      restrict: "E",
      replace: true,
      templateUrl: "views/tag/manager.html",
      controller: "TagManagerController",
      scope: {
        tags: "=tagsArray",
        search: "="
      }
    };
  })

},{}],79:[function(require,module,exports){
"use strict";

theToolDirectives.directive("topicCard", function () {
  return {
    restrict: "E",
    replace: true,
    templateUrl: "views/topic/card.html",
    controller: "TopicEmbedController",
    scope: {
      topic: "=",
      members: "=",
      me: "=",
      roles: "=",
      tags: "=",
      comments: "=",
      notifications: "="
    }
  };
});

},{}],80:[function(require,module,exports){
require("./topic");
require("./card");

},{"./card":79,"./topic":81}],81:[function(require,module,exports){
"use strict";

theToolDirectives.directive("topic", function () {
  return {
    restrict: "E",
    replace: true,
    templateUrl: "views/topic/topic.html",
    controller: "TopicEmbedController",
    scope: {
      topic: "=",
      members: "=",
      me: "=",
      roles: "=",
      tags: "=",
      comments: "=",
      notifications: "="
    }
  };
});

},{}],82:[function(require,module,exports){
'use strict';

angular.module('theTool.filters', [])
  .filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }])
  .filter('filterEventStatus', function(){
    return function(objs, event, search) {
      var result = objs;
      result = objs.filter(function(o) {
        if(o.participations.length <= 0){
          return search.unassigned || search.unassignedOnly;
        }
        if(event && !search.unassignedOnly) {
          return o.participations.filter(function(p) {
            if(search.status && search.status !== '' && search.member && search.member !== '') {
              return p.event === event.id && p.status === search.status && p.member === search.member;
            } else if(search.status && search.status !== '') {
              return p.event === event.id && p.status === search.status;
            } else if(search.member && search.member !== '') {
              return p.event === event.id && p.member === search.member;
            } else {
              return p.event === event.id;
            }
          }).length > 0;
        }
      });
      return result;
    };
  })
  .filter('filterRole', function() {
    return function(members, role) {
          var result = members;
          if(role) {
            result = members.filter(function(m) {
              return m.roles.filter(function(r) {
                return r.id == role;
              }).length > 0;
            });
          }
          return result;
      };
  });
},{}],83:[function(require,module,exports){
'use strict';

theToolServices
  .factory('ChatFactory', function ($resource) {
    return {
      Chat: $resource(url_prefix+'/api/chat/:id', null, {
        'update': {method: 'POST'},
        'getAll': {method: 'GET', isArray:true}
      }),
      Message: $resource(url_prefix+'/api/chat/:id/messages', null, {
        'getAll': {method: 'GET',isArray:true}
      })
    }
  })
},{}],84:[function(require,module,exports){
'use strict';

theToolServices
  .factory('CommentFactory', function ($resource) {
    return {
      Comment: $resource(url_prefix+'/api/comment/:id', null, {
        'getAll': {method: 'GET', isArray: true},
        'update': {method: 'PUT'},
        'create': {method: 'POST'},
        'delete': {method: 'DELETE'}
      }),
      Company: $resource(url_prefix+'/api/company/:id/comments', null, {
        'getAll': {method: 'GET', isArray: true}
      }),
      Speaker: $resource(url_prefix+'/api/speaker/:id/comments', null, {
        'getAll': {method: 'GET', isArray: true}
      }),
      Topic: $resource(url_prefix+'/api/topic/:id/comments', null, {
        'getAll': {method: 'GET', isArray: true}
      }),
      Communication: $resource(url_prefix+'/api/communication/:id/comments', null, {
        'getAll': {method: 'GET', isArray: true}
      })
    }
  })
},{}],85:[function(require,module,exports){
'use strict';

theToolServices
  .factory('CommunicationFactory', function ($resource) {
    return {
      Communication: $resource(url_prefix+'/api/communication/:id', null, {
        'getAll': {method: 'GET', isArray: true},
        'update': {method: 'PUT'},
        'create': {method: 'POST'},
        'delete': {method: 'DELETE'}
      }),
      Company: $resource(url_prefix+'/api/company/:id/communications', null, {
        'getAll': {method: 'GET', isArray: true}
      }),
      Speaker: $resource(url_prefix+'/api/speaker/:id/communications', null, {
        'getAll': {method: 'GET', isArray: true}
      })
    };
  })
},{}],86:[function(require,module,exports){
'use strict';

theToolServices
  .factory('CompanyFactory', function ($resource) {
    return {
      Company: $resource(url_prefix+'/api/company/:id', null, {
        'getAll': {method: 'GET', isArray:true},
        'update': {method: 'PUT'},
        'create': {method: 'POST'},
        'delete': {method: 'DELETE'}
      }),
      Member: $resource(url_prefix+'/api/member/:id/companies', null, {
        'getAll': {method: 'GET', isArray:true}
      })
    };
  })
},{}],87:[function(require,module,exports){
'use strict';

theToolServices
  .factory('EmailFactory', function ($resource) {
    return {
      Company: $resource(url_prefix+'/api/company/:id/sendInitialEmail', null, {
        'send': {method: 'POST'}
      }),
      Speaker: $resource(url_prefix+'/api/speaker/:id/sendInitialEmail', null, {
        'send': {method: 'POST'}
      })
    }
  })
},{}],88:[function(require,module,exports){
'use strict';

theToolServices
  .factory('EventFactory', function ($resource) {
    return {
      Event: $resource(url_prefix+'/api/event/:id', null, {
        'getAll': {method: 'GET', isArray: true},
        'update': {method: 'PUT'},
        'create': {method: 'POST'},
        'delete': {method: 'DELETE'}
      })
    }
  })
},{}],89:[function(require,module,exports){
theToolServices = angular.module('theTool.services', ['ngResource']);

require('./chat');
require('./comment');
require('./communication');
require('./company');
require('./email');
require('./meeting');
require('./member');
require('./message');
require('./notification');
require('./role');
require('./session');
require('./socket');
require('./speaker');
require('./subscription');
require('./tag');
require('./topic');
require('./event');
require('./item');

},{"./chat":83,"./comment":84,"./communication":85,"./company":86,"./email":87,"./event":88,"./item":90,"./meeting":91,"./member":92,"./message":93,"./notification":94,"./role":95,"./session":96,"./socket":97,"./speaker":98,"./subscription":99,"./tag":100,"./topic":101}],90:[function(require,module,exports){
'use strict';

theToolServices
  .factory('ItemFactory', function ($resource) {
    return {
      Item: $resource(url_prefix+'/api/item/:id', null, {
        'getAll': {method: 'GET', isArray: true},
        'update': {method: 'PUT'},
        'create': {method: 'POST'},
        'delete': {method: 'DELETE'}
      })
    }
  })
},{}],91:[function(require,module,exports){
'use strict';

theToolServices
  .factory('MeetingFactory', function ($resource) {
    return $resource(url_prefix+'/api/meeting/:id', null, {
      'getAll': {method: 'GET', isArray: true},
      'create': {method: 'POST'},
      'update': {method: 'PUT'},
      'delete': {method: 'DELETE'}
    });
  })

},{}],92:[function(require,module,exports){
'use strict';

theToolServices
  .factory('MemberFactory', function ($resource) {
    return {
      Member: $resource(url_prefix+'/api/member/:id', null, {
        'getAll': {method: 'GET', isArray:true},
        'update': {method: 'PUT'},
        'create': {method: 'POST'},
        'delete': {method: 'DELETE'}
      }),
      Role: $resource(url_prefix+'/api/role/:id/members', null, {
        'getAll': {method: 'GET', isArray: true}
      }),
      Me: $resource(url_prefix+'/api/myself', null, {
        'get': {method: 'GET', isArray: false}
      })
    };
  })
},{}],93:[function(require,module,exports){
'use strict';

theToolServices
  .factory('MessageFactory', function ($resource) {
    return $resource(url_prefix+'/api/message/:id', null, {
        'getAll':    {method: 'GET', isArray: true}
      })
  })
},{}],94:[function(require,module,exports){
'use strict';

theToolServices.factory('NotificationFactory', function ($resource) {
  return {
    Notification: $resource(url_prefix+'/api/notification/:id', null, {
      'getAll': {method: 'GET', isArray: true},
      'update': {method: 'PUT'}
    }),
    Company: $resource(url_prefix+'/api/company/:id/notifications', null, {
      'getAll': {method: 'GET', isArray: true}
    }),
    Speaker: $resource(url_prefix+'/api/speaker/:id/notifications', null, {
      'getAll': {method: 'GET', isArray: true}
    }),
    Topic: $resource(url_prefix+'/api/topic/:id/notifications', null, {
      'getAll': {method: 'GET', isArray: true}
    })
  };
});

},{}],95:[function(require,module,exports){
'use strict';

theToolServices
  .factory('RoleFactory', function ($resource) {
    return {
      Role: $resource(url_prefix+'/api/role/:id', null, {
        'getAll': {method: 'GET', isArray: true},
      }),
      Member: $resource(url_prefix+'/api/role/:id/members', null, {
        'getAll': {method: 'GET', isArray: true}
      })
    };
  })

},{}],96:[function(require,module,exports){
'use strict';

theToolServices
  .factory('SessionFactory', function ($resource) {
    return {
      Session: $resource(url_prefix+'/api/session/:id', null, {
        'getAll': {method: 'GET', isArray: true},
        'update': {method: 'PUT'},
        'create': {method: 'POST'},
        'delete': {method: 'DELETE'}
      }),
      Company: $resource(url_prefix+'/api/company/:id/sessions', null, {
        'getAll': {method: 'GET', isArray: true}
      }),
      Speaker: $resource(url_prefix+'/api/speaker/:id/sessions', null, {
        'getAll': {method: 'GET', isArray: true}
      })
    }
  })
},{}],97:[function(require,module,exports){
'use strict';

theToolServices
  .factory('SocketFactory', function ($resource, $location, $rootScope) {
    var socket;
    return {
      connect: function(nsp) {
        //console.log(socket);
        socket = io.connect(nsp, {multiplex: false});
      },
      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        });
      },
      disconnect: function () {
        socket.disconnect();
      },
      socket: socket
    };
  });

},{}],98:[function(require,module,exports){
'use strict';

theToolServices
  .factory('SpeakerFactory', function ($resource) {
    return {
      Speaker: $resource(url_prefix+'/api/speaker/:id', null, {
        'getAll': {method: 'GET', isArray:true},
        'update': {method: 'PUT'},
        'create': {method: 'POST'},
        'delete': {method: 'DELETE'}
      }),
      Member: $resource(url_prefix+'/api/member/:id/speakers', null, {
        'getAll': {method: 'GET', isArray:true}
      })
    };
  })
},{}],99:[function(require,module,exports){
"use strict";

theToolServices.factory("SubscriptionFactory", function ($resource) {
  return {
    Company: $resource(url_prefix + "/api/company/:id/subscription", null, {
      "get": {method: "GET"},
      "add": {method: "POST"},
      "remove": {method: "DELETE"}
    }),
    Speaker: $resource(url_prefix + "/api/speaker/:id/subscription", null, {
      "get": {method: "GET"},
      "add": {method: "POST"},
      "remove": {method: "DELETE"}
    }),
    Topic: $resource(url_prefix + "/api/topic/:id/subscription", null, {
      "get": {method: "GET"},
      "add": {method: "POST"},
      "remove": {method: "DELETE"}
    })
  };
});

},{}],100:[function(require,module,exports){
'use strict';

theToolServices
  .factory('TagFactory', function ($resource) {
    return {
      Tag: $resource(url_prefix+'/api/tag/:id', null, {
        'getAll': {method: 'GET', isArray: true},
        'update': {method: 'PUT'},
        'create': {method: 'POST'},
        'delete': {method: 'DELETE'}
      }),
      Topic: $resource(url_prefix+'/api/tag/:id/topics', null, {
        'getAll': {method: 'GET', isArray: true}
      })
    };
  })
},{}],101:[function(require,module,exports){
'use strict';

theToolServices
  .factory('TopicFactory', function ($resource) {
    return {
      Topic: $resource(url_prefix+'/api/topic/:id', null, {
        'getAll': {method: 'GET', isArray: true},
        'create': {method: 'POST'},
        'update': {method: 'PUT'},
        'delete': {method: 'DELETE'}
      }),
      Member: $resource(url_prefix+'/api/member/:id/topics', null, {
        'getAll': { method: 'GET', isArray: true }
      })
    };
  })

},{}],102:[function(require,module,exports){
url_prefix = require('./../../config').url;

require('./angularApp/app.js');
require('./angularApp/controllers');
require('./angularApp/directives');
require('./angularApp/filters');
require('./angularApp/services');
},{"./../../config":103,"./angularApp/app.js":1,"./angularApp/controllers":22,"./angularApp/directives":63,"./angularApp/filters":82,"./angularApp/services":89}],103:[function(require,module,exports){
var process=require("__browserify_process");var config = {
  url: process.env.EVENTDECK_URL || 'http://localhost:8080',
  port: process.env.EVENTDECK_PORT || 8080,
};

config.mongo = {
  url: process.env.EVENTDECK_MONGO_URL || 'mongodb://localhost/sinfo'
};

config.cookie = {
  name: process.env.EVENTDECK_COOKIE_NAME || 'eventdeck',
  password: process.env.EVENTDECK_COOKIE_PASSWORD || 'YOUR COOKIE PASSWORD'
};

config.mailgun = {
  email: process.env.EVENTDECK_MAILGUN_EMAIL || 'tool@bananamarket.eu',
  api: process.env.EVENTDECK_MAILGUN_API || 'key-7jm1c009ezjv85pkm1rqfxevufeovb43',
  publicApi: process.env.EVENTDECK_MAILGUN_PUBLIC_API || 'pubkey-0blv6drs63745oxru3itvfg1urp662y8'
};

config.facebook = {
  appId: process.env.EVENTDECK_FACEBOOK_APP_ID || '457207507744159',
  appSecret: process.env.EVENTDECK_FACEBOOK_APP_SECRET || '9f027c52e00bc3adbabcd926a3c95b97'
};

config.bunyan = {
  name: require('./package.json').name,
  level: process.env.EVENTDECK_LOG_LEVEL || 'trace'
};


module.exports = config;
},{"./package.json":106,"__browserify_process":104}],104:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],105:[function(require,module,exports){
var options = {};

options.session = {
	kind: [
		{id: 'keynote', name: 'Keynote', color:'#439BE8'},
		{id: 'meetup', name: 'Meetup', color: '#47F230'},
		{id: 'presentation', name: 'Presentation', color: '#5F4EF5'},
		{id: 'talk', name: 'Talk', color: '#FA8405'},
		{id: 'workshop', name: 'Workshop', color: '#F51414'}
	]
};

module.exports = options;
},{}],106:[function(require,module,exports){
module.exports={
  "name": "eventdeck",
  "version": "0.0.0",
  "description": "eventdeck ========",
  "main": "index.js",
  "scripts": {
    "start": "node serverApp/index.js | bunyan",
    "mon": "node_modules/.bin/nodemon serverApp/index.js | bunyan",
    "dist": "node_modules/.bin/browserify -t brfs --debug -e clientApp/js/theTool.js -o public/js/theTool.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git://github.com/SINFO/eventdeck.git"
  },
  "author": "Francisco Dias <francisco@baiodias.com> (http://franciscodias.net/)",
  "license": "BSD-2-Clause",
  "bugs": {
    "url": "https://github.com/SINFO/eventdeck/issues"
  },
  "homepage": "https://github.com/SINFO/eventdeck",
  "dependencies": {
    "cron": "~1.0.4",
    "hapi": "~3.0.0",
    "hapi-auth-cookie": "~1.0.2",
    "handlebars": "~2.0.0-alpha.2",
    "async": "~0.2.9",
    "mongoose": "~3.8.4",
    "markdown": "~0.5.0",
    "emailjs": "~0.3.8",
    "socket.io": "~1.0.2",
    "socket.io-client": "~1.0.2",
    "request": "~2.36.0",
    "mailgun": "~0.4.2",
    "mailcomposer": "~0.2.12",
    "bunyan": "~1.0.1"
  },
  "devDependencies": {
    "nodemon": "~0.7.10",
    "colors": "~0.6.2",
    "gaze": "~0.4.3",
    "brfs": "0.0.8",
    "browserify": "~3.20.0",
    "tabletop": "~1.3.3"
  }
}

},{}]},{},[102])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFuY2lzY29nb25jYWx2ZXMvRG9jdW1lbnRzL0RldmVsb3BtZW50L1NJTkZPL2V2ZW50ZGVjay9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL2NsaWVudEFwcC9qcy9hbmd1bGFyQXBwL2FwcC5qcyIsIi9Vc2Vycy9mcmFuY2lzY29nb25jYWx2ZXMvRG9jdW1lbnRzL0RldmVsb3BtZW50L1NJTkZPL2V2ZW50ZGVjay9jbGllbnRBcHAvanMvYW5ndWxhckFwcC9jb250cm9sbGVycy9hZG1pbi9pbmRleC5qcyIsIi9Vc2Vycy9mcmFuY2lzY29nb25jYWx2ZXMvRG9jdW1lbnRzL0RldmVsb3BtZW50L1NJTkZPL2V2ZW50ZGVjay9jbGllbnRBcHAvanMvYW5ndWxhckFwcC9jb250cm9sbGVycy9hdXRoL2luZGV4LmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL2NsaWVudEFwcC9qcy9hbmd1bGFyQXBwL2NvbnRyb2xsZXJzL2F1dGgvaW50ZXJjZXB0b3IuanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL2FuZ3VsYXJBcHAvY29udHJvbGxlcnMvYXV0aC9sb2dpbi5qcyIsIi9Vc2Vycy9mcmFuY2lzY29nb25jYWx2ZXMvRG9jdW1lbnRzL0RldmVsb3BtZW50L1NJTkZPL2V2ZW50ZGVjay9jbGllbnRBcHAvanMvYW5ndWxhckFwcC9jb250cm9sbGVycy9jaGF0L2NoYXQuanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL2FuZ3VsYXJBcHAvY29udHJvbGxlcnMvY2hhdC9pbmRleC5qcyIsIi9Vc2Vycy9mcmFuY2lzY29nb25jYWx2ZXMvRG9jdW1lbnRzL0RldmVsb3BtZW50L1NJTkZPL2V2ZW50ZGVjay9jbGllbnRBcHAvanMvYW5ndWxhckFwcC9jb250cm9sbGVycy9jaGF0L2xpc3QuanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL2FuZ3VsYXJBcHAvY29udHJvbGxlcnMvY29tbWVudC9hcmVhLmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL2NsaWVudEFwcC9qcy9hbmd1bGFyQXBwL2NvbnRyb2xsZXJzL2NvbW1lbnQvZmlyc3QuanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL2FuZ3VsYXJBcHAvY29udHJvbGxlcnMvY29tbWVudC9pbmRleC5qcyIsIi9Vc2Vycy9mcmFuY2lzY29nb25jYWx2ZXMvRG9jdW1lbnRzL0RldmVsb3BtZW50L1NJTkZPL2V2ZW50ZGVjay9jbGllbnRBcHAvanMvYW5ndWxhckFwcC9jb250cm9sbGVycy9jb21tdW5pY2F0aW9uL2FyZWEuanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL2FuZ3VsYXJBcHAvY29udHJvbGxlcnMvY29tbXVuaWNhdGlvbi9lbWJlZC5qcyIsIi9Vc2Vycy9mcmFuY2lzY29nb25jYWx2ZXMvRG9jdW1lbnRzL0RldmVsb3BtZW50L1NJTkZPL2V2ZW50ZGVjay9jbGllbnRBcHAvanMvYW5ndWxhckFwcC9jb250cm9sbGVycy9jb21tdW5pY2F0aW9uL2luZGV4LmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL2NsaWVudEFwcC9qcy9hbmd1bGFyQXBwL2NvbnRyb2xsZXJzL2NvbW11bmljYXRpb24vbGlzdC5qcyIsIi9Vc2Vycy9mcmFuY2lzY29nb25jYWx2ZXMvRG9jdW1lbnRzL0RldmVsb3BtZW50L1NJTkZPL2V2ZW50ZGVjay9jbGllbnRBcHAvanMvYW5ndWxhckFwcC9jb250cm9sbGVycy9jb21wYW55L2NvbXBhbnkuanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL2FuZ3VsYXJBcHAvY29udHJvbGxlcnMvY29tcGFueS9jb25maXJtLmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL2NsaWVudEFwcC9qcy9hbmd1bGFyQXBwL2NvbnRyb2xsZXJzL2NvbXBhbnkvY3JlYXRlLmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL2NsaWVudEFwcC9qcy9hbmd1bGFyQXBwL2NvbnRyb2xsZXJzL2NvbXBhbnkvZW1iZWQuanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL2FuZ3VsYXJBcHAvY29udHJvbGxlcnMvY29tcGFueS9pbmRleC5qcyIsIi9Vc2Vycy9mcmFuY2lzY29nb25jYWx2ZXMvRG9jdW1lbnRzL0RldmVsb3BtZW50L1NJTkZPL2V2ZW50ZGVjay9jbGllbnRBcHAvanMvYW5ndWxhckFwcC9jb250cm9sbGVycy9jb21wYW55L2xpc3QuanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL2FuZ3VsYXJBcHAvY29udHJvbGxlcnMvaW5kZXguanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL2FuZ3VsYXJBcHAvY29udHJvbGxlcnMvbWFpbi9ob21lLmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL2NsaWVudEFwcC9qcy9hbmd1bGFyQXBwL2NvbnRyb2xsZXJzL21haW4vaW5kZXguanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL2FuZ3VsYXJBcHAvY29udHJvbGxlcnMvbWFpbi9tYWluLmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL2NsaWVudEFwcC9qcy9hbmd1bGFyQXBwL2NvbnRyb2xsZXJzL21lZXRpbmcvZW1iZWQuanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL2FuZ3VsYXJBcHAvY29udHJvbGxlcnMvbWVldGluZy9pbmRleC5qcyIsIi9Vc2Vycy9mcmFuY2lzY29nb25jYWx2ZXMvRG9jdW1lbnRzL0RldmVsb3BtZW50L1NJTkZPL2V2ZW50ZGVjay9jbGllbnRBcHAvanMvYW5ndWxhckFwcC9jb250cm9sbGVycy9tZWV0aW5nL2xpc3QuanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL2FuZ3VsYXJBcHAvY29udHJvbGxlcnMvbWVldGluZy9tZWV0aW5nLmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL2NsaWVudEFwcC9qcy9hbmd1bGFyQXBwL2NvbnRyb2xsZXJzL21lbWJlci9jcmVhdGUuanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL2FuZ3VsYXJBcHAvY29udHJvbGxlcnMvbWVtYmVyL2VtYmVkLmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL2NsaWVudEFwcC9qcy9hbmd1bGFyQXBwL2NvbnRyb2xsZXJzL21lbWJlci9pbmRleC5qcyIsIi9Vc2Vycy9mcmFuY2lzY29nb25jYWx2ZXMvRG9jdW1lbnRzL0RldmVsb3BtZW50L1NJTkZPL2V2ZW50ZGVjay9jbGllbnRBcHAvanMvYW5ndWxhckFwcC9jb250cm9sbGVycy9tZW1iZXIvbGlzdC5qcyIsIi9Vc2Vycy9mcmFuY2lzY29nb25jYWx2ZXMvRG9jdW1lbnRzL0RldmVsb3BtZW50L1NJTkZPL2V2ZW50ZGVjay9jbGllbnRBcHAvanMvYW5ndWxhckFwcC9jb250cm9sbGVycy9tZW1iZXIvbWVtYmVyLmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL2NsaWVudEFwcC9qcy9hbmd1bGFyQXBwL2NvbnRyb2xsZXJzL3Nlc3Npb24vaW5kZXguanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL2FuZ3VsYXJBcHAvY29udHJvbGxlcnMvc2Vzc2lvbi9zZXNzaW9uLmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL2NsaWVudEFwcC9qcy9hbmd1bGFyQXBwL2NvbnRyb2xsZXJzL3Nlc3Npb24vc2Vzc2lvbnMuanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL2FuZ3VsYXJBcHAvY29udHJvbGxlcnMvc2Vzc2lvbi92aWV3LmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL2NsaWVudEFwcC9qcy9hbmd1bGFyQXBwL2NvbnRyb2xsZXJzL3NwZWFrZXIvY29uZmlybS5qcyIsIi9Vc2Vycy9mcmFuY2lzY29nb25jYWx2ZXMvRG9jdW1lbnRzL0RldmVsb3BtZW50L1NJTkZPL2V2ZW50ZGVjay9jbGllbnRBcHAvanMvYW5ndWxhckFwcC9jb250cm9sbGVycy9zcGVha2VyL2NyZWF0ZS5qcyIsIi9Vc2Vycy9mcmFuY2lzY29nb25jYWx2ZXMvRG9jdW1lbnRzL0RldmVsb3BtZW50L1NJTkZPL2V2ZW50ZGVjay9jbGllbnRBcHAvanMvYW5ndWxhckFwcC9jb250cm9sbGVycy9zcGVha2VyL2VtYmVkLmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL2NsaWVudEFwcC9qcy9hbmd1bGFyQXBwL2NvbnRyb2xsZXJzL3NwZWFrZXIvaW5kZXguanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL2FuZ3VsYXJBcHAvY29udHJvbGxlcnMvc3BlYWtlci9saXN0LmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL2NsaWVudEFwcC9qcy9hbmd1bGFyQXBwL2NvbnRyb2xsZXJzL3NwZWFrZXIvc3BlYWtlci5qcyIsIi9Vc2Vycy9mcmFuY2lzY29nb25jYWx2ZXMvRG9jdW1lbnRzL0RldmVsb3BtZW50L1NJTkZPL2V2ZW50ZGVjay9jbGllbnRBcHAvanMvYW5ndWxhckFwcC9jb250cm9sbGVycy9zdWJzY3JpcHRpb24vZW1iZWQuanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL2FuZ3VsYXJBcHAvY29udHJvbGxlcnMvc3Vic2NyaXB0aW9uL2luZGV4LmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL2NsaWVudEFwcC9qcy9hbmd1bGFyQXBwL2NvbnRyb2xsZXJzL3RhZy9pbmRleC5qcyIsIi9Vc2Vycy9mcmFuY2lzY29nb25jYWx2ZXMvRG9jdW1lbnRzL0RldmVsb3BtZW50L1NJTkZPL2V2ZW50ZGVjay9jbGllbnRBcHAvanMvYW5ndWxhckFwcC9jb250cm9sbGVycy90YWcvbWFuYWdlci5qcyIsIi9Vc2Vycy9mcmFuY2lzY29nb25jYWx2ZXMvRG9jdW1lbnRzL0RldmVsb3BtZW50L1NJTkZPL2V2ZW50ZGVjay9jbGllbnRBcHAvanMvYW5ndWxhckFwcC9jb250cm9sbGVycy90b3BpYy9lbWJlZC5qcyIsIi9Vc2Vycy9mcmFuY2lzY29nb25jYWx2ZXMvRG9jdW1lbnRzL0RldmVsb3BtZW50L1NJTkZPL2V2ZW50ZGVjay9jbGllbnRBcHAvanMvYW5ndWxhckFwcC9jb250cm9sbGVycy90b3BpYy9pbmRleC5qcyIsIi9Vc2Vycy9mcmFuY2lzY29nb25jYWx2ZXMvRG9jdW1lbnRzL0RldmVsb3BtZW50L1NJTkZPL2V2ZW50ZGVjay9jbGllbnRBcHAvanMvYW5ndWxhckFwcC9jb250cm9sbGVycy90b3BpYy9saXN0LmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL2NsaWVudEFwcC9qcy9hbmd1bGFyQXBwL2NvbnRyb2xsZXJzL3RvcGljL3RvcGljLmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL2NsaWVudEFwcC9qcy9hbmd1bGFyQXBwL2RpcmVjdGl2ZXMvY29tbWVudC9hcmVhLmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL2NsaWVudEFwcC9qcy9hbmd1bGFyQXBwL2RpcmVjdGl2ZXMvY29tbWVudC9maXJzdC5qcyIsIi9Vc2Vycy9mcmFuY2lzY29nb25jYWx2ZXMvRG9jdW1lbnRzL0RldmVsb3BtZW50L1NJTkZPL2V2ZW50ZGVjay9jbGllbnRBcHAvanMvYW5ndWxhckFwcC9kaXJlY3RpdmVzL2NvbW1lbnQvaW5kZXguanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL2FuZ3VsYXJBcHAvZGlyZWN0aXZlcy9jb21tdW5pY2F0aW9uL2FyZWEuanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL2FuZ3VsYXJBcHAvZGlyZWN0aXZlcy9jb21tdW5pY2F0aW9uL2NvbW11bmljYXRpb24uanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL2FuZ3VsYXJBcHAvZGlyZWN0aXZlcy9jb21tdW5pY2F0aW9uL2luZGV4LmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL2NsaWVudEFwcC9qcy9hbmd1bGFyQXBwL2RpcmVjdGl2ZXMvY29tcGFueS9jYXJkLmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL2NsaWVudEFwcC9qcy9hbmd1bGFyQXBwL2RpcmVjdGl2ZXMvY29tcGFueS9pbmRleC5qcyIsIi9Vc2Vycy9mcmFuY2lzY29nb25jYWx2ZXMvRG9jdW1lbnRzL0RldmVsb3BtZW50L1NJTkZPL2V2ZW50ZGVjay9jbGllbnRBcHAvanMvYW5ndWxhckFwcC9kaXJlY3RpdmVzL2RhdGUvaW5kZXguanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL2FuZ3VsYXJBcHAvZGlyZWN0aXZlcy9kYXRlL2lucHV0LmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL2NsaWVudEFwcC9qcy9hbmd1bGFyQXBwL2RpcmVjdGl2ZXMvaW5kZXguanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL2FuZ3VsYXJBcHAvZGlyZWN0aXZlcy9tYXJrZG93bi9jb21waWxlLmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL2NsaWVudEFwcC9qcy9hbmd1bGFyQXBwL2RpcmVjdGl2ZXMvbWFya2Rvd24vaW5kZXguanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL2FuZ3VsYXJBcHAvZGlyZWN0aXZlcy9tYXJrZG93bi9tYXJrZG93bi5qcyIsIi9Vc2Vycy9mcmFuY2lzY29nb25jYWx2ZXMvRG9jdW1lbnRzL0RldmVsb3BtZW50L1NJTkZPL2V2ZW50ZGVjay9jbGllbnRBcHAvanMvYW5ndWxhckFwcC9kaXJlY3RpdmVzL21lZXRpbmcvZW1iZWQuanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL2FuZ3VsYXJBcHAvZGlyZWN0aXZlcy9tZWV0aW5nL2luZGV4LmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL2NsaWVudEFwcC9qcy9hbmd1bGFyQXBwL2RpcmVjdGl2ZXMvbWVtYmVyL2NhcmQuanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL2FuZ3VsYXJBcHAvZGlyZWN0aXZlcy9tZW1iZXIvaW5kZXguanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL2FuZ3VsYXJBcHAvZGlyZWN0aXZlcy9zY3JvbGwvaW5kZXguanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL2FuZ3VsYXJBcHAvZGlyZWN0aXZlcy9zY3JvbGwvcG9zaXRpb24uanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL2FuZ3VsYXJBcHAvZGlyZWN0aXZlcy9zcGVha2VyL2NhcmQuanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL2FuZ3VsYXJBcHAvZGlyZWN0aXZlcy9zcGVha2VyL2luZGV4LmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL2NsaWVudEFwcC9qcy9hbmd1bGFyQXBwL2RpcmVjdGl2ZXMvc3Vic2NyaXB0aW9uL2luZGV4LmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL2NsaWVudEFwcC9qcy9hbmd1bGFyQXBwL2RpcmVjdGl2ZXMvc3Vic2NyaXB0aW9uL3N1YnNjcmlwdGlvbi5qcyIsIi9Vc2Vycy9mcmFuY2lzY29nb25jYWx2ZXMvRG9jdW1lbnRzL0RldmVsb3BtZW50L1NJTkZPL2V2ZW50ZGVjay9jbGllbnRBcHAvanMvYW5ndWxhckFwcC9kaXJlY3RpdmVzL3RhZy9pbmRleC5qcyIsIi9Vc2Vycy9mcmFuY2lzY29nb25jYWx2ZXMvRG9jdW1lbnRzL0RldmVsb3BtZW50L1NJTkZPL2V2ZW50ZGVjay9jbGllbnRBcHAvanMvYW5ndWxhckFwcC9kaXJlY3RpdmVzL3RhZy9tYW5hZ2VyLmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL2NsaWVudEFwcC9qcy9hbmd1bGFyQXBwL2RpcmVjdGl2ZXMvdG9waWMvY2FyZC5qcyIsIi9Vc2Vycy9mcmFuY2lzY29nb25jYWx2ZXMvRG9jdW1lbnRzL0RldmVsb3BtZW50L1NJTkZPL2V2ZW50ZGVjay9jbGllbnRBcHAvanMvYW5ndWxhckFwcC9kaXJlY3RpdmVzL3RvcGljL2luZGV4LmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL2NsaWVudEFwcC9qcy9hbmd1bGFyQXBwL2RpcmVjdGl2ZXMvdG9waWMvdG9waWMuanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL2FuZ3VsYXJBcHAvZmlsdGVycy9pbmRleC5qcyIsIi9Vc2Vycy9mcmFuY2lzY29nb25jYWx2ZXMvRG9jdW1lbnRzL0RldmVsb3BtZW50L1NJTkZPL2V2ZW50ZGVjay9jbGllbnRBcHAvanMvYW5ndWxhckFwcC9zZXJ2aWNlcy9jaGF0LmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL2NsaWVudEFwcC9qcy9hbmd1bGFyQXBwL3NlcnZpY2VzL2NvbW1lbnQuanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL2FuZ3VsYXJBcHAvc2VydmljZXMvY29tbXVuaWNhdGlvbi5qcyIsIi9Vc2Vycy9mcmFuY2lzY29nb25jYWx2ZXMvRG9jdW1lbnRzL0RldmVsb3BtZW50L1NJTkZPL2V2ZW50ZGVjay9jbGllbnRBcHAvanMvYW5ndWxhckFwcC9zZXJ2aWNlcy9jb21wYW55LmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL2NsaWVudEFwcC9qcy9hbmd1bGFyQXBwL3NlcnZpY2VzL2VtYWlsLmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL2NsaWVudEFwcC9qcy9hbmd1bGFyQXBwL3NlcnZpY2VzL2V2ZW50LmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL2NsaWVudEFwcC9qcy9hbmd1bGFyQXBwL3NlcnZpY2VzL2luZGV4LmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL2NsaWVudEFwcC9qcy9hbmd1bGFyQXBwL3NlcnZpY2VzL2l0ZW0uanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL2FuZ3VsYXJBcHAvc2VydmljZXMvbWVldGluZy5qcyIsIi9Vc2Vycy9mcmFuY2lzY29nb25jYWx2ZXMvRG9jdW1lbnRzL0RldmVsb3BtZW50L1NJTkZPL2V2ZW50ZGVjay9jbGllbnRBcHAvanMvYW5ndWxhckFwcC9zZXJ2aWNlcy9tZW1iZXIuanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL2FuZ3VsYXJBcHAvc2VydmljZXMvbWVzc2FnZS5qcyIsIi9Vc2Vycy9mcmFuY2lzY29nb25jYWx2ZXMvRG9jdW1lbnRzL0RldmVsb3BtZW50L1NJTkZPL2V2ZW50ZGVjay9jbGllbnRBcHAvanMvYW5ndWxhckFwcC9zZXJ2aWNlcy9ub3RpZmljYXRpb24uanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL2FuZ3VsYXJBcHAvc2VydmljZXMvcm9sZS5qcyIsIi9Vc2Vycy9mcmFuY2lzY29nb25jYWx2ZXMvRG9jdW1lbnRzL0RldmVsb3BtZW50L1NJTkZPL2V2ZW50ZGVjay9jbGllbnRBcHAvanMvYW5ndWxhckFwcC9zZXJ2aWNlcy9zZXNzaW9uLmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL2NsaWVudEFwcC9qcy9hbmd1bGFyQXBwL3NlcnZpY2VzL3NvY2tldC5qcyIsIi9Vc2Vycy9mcmFuY2lzY29nb25jYWx2ZXMvRG9jdW1lbnRzL0RldmVsb3BtZW50L1NJTkZPL2V2ZW50ZGVjay9jbGllbnRBcHAvanMvYW5ndWxhckFwcC9zZXJ2aWNlcy9zcGVha2VyLmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL2NsaWVudEFwcC9qcy9hbmd1bGFyQXBwL3NlcnZpY2VzL3N1YnNjcmlwdGlvbi5qcyIsIi9Vc2Vycy9mcmFuY2lzY29nb25jYWx2ZXMvRG9jdW1lbnRzL0RldmVsb3BtZW50L1NJTkZPL2V2ZW50ZGVjay9jbGllbnRBcHAvanMvYW5ndWxhckFwcC9zZXJ2aWNlcy90YWcuanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL2FuZ3VsYXJBcHAvc2VydmljZXMvdG9waWMuanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY2xpZW50QXBwL2pzL3RoZVRvb2wuanMiLCIvVXNlcnMvZnJhbmNpc2NvZ29uY2FsdmVzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9TSU5GTy9ldmVudGRlY2svY29uZmlnLmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9pbnNlcnQtbW9kdWxlLWdsb2JhbHMvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIi9Vc2Vycy9mcmFuY2lzY29nb25jYWx2ZXMvRG9jdW1lbnRzL0RldmVsb3BtZW50L1NJTkZPL2V2ZW50ZGVjay9vcHRpb25zLmpzIiwiL1VzZXJzL2ZyYW5jaXNjb2dvbmNhbHZlcy9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvU0lORk8vZXZlbnRkZWNrL3BhY2thZ2UuanNvbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JGQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hIQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1S0E7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekdBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaldBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVEQTs7QUNBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdRQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTs7QUNBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7O0FDQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTs7QUNBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiO1xuXG5hbmd1bGFyLm1vZHVsZShcInRoZVRvb2xcIiwgW1xuICBcIm5nXCIsXG4gIFwibmdSb3V0ZVwiLFxuICBcIm5nU2FuaXRpemVcIixcbiAgXCJuZ1RvdWNoXCIsXG4gIFwiaW5maW5pdGUtc2Nyb2xsXCIsXG4gIFwidW5zYXZlZENoYW5nZXNcIixcbiAgXCJsdWVnZy5kaXJlY3RpdmVzXCIsXG4gIFwibmdBdWRpb1wiLFxuICBcInRoZVRvb2wuZmlsdGVyc1wiLFxuICBcInRoZVRvb2wuc2VydmljZXNcIixcbiAgXCJ0aGVUb29sLmRpcmVjdGl2ZXNcIixcbiAgXCJ0aGVUb29sLmNvbnRyb2xsZXJzXCIsXG4gICd1aS5jYWxlbmRhcidcbiAgXSkuXG5jb25maWcoW1wiJHJvdXRlUHJvdmlkZXJcIiwgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcbiAgJHJvdXRlUHJvdmlkZXIud2hlbihcIi9cIiAgICAgICAgICAgICAgICAgICAgICAgICAgLCB7dGVtcGxhdGVVcmw6IFwidmlld3MvY2hhdC92aWV3Lmh0bWxcIiwgICAgICAgICAgICAgY29udHJvbGxlcjogXCJDaGF0Q29udHJvbGxlclwifSk7XG4gICRyb3V0ZVByb3ZpZGVyLndoZW4oXCIvYWRtaW5cIiAgICAgICAgICAgICAgICAgICAgICwge3RlbXBsYXRlVXJsOiBcInZpZXdzL2FkbWluL2luZGV4Lmh0bWxcIiwgICAgICAgICAgIGNvbnRyb2xsZXI6IFwiQWRtaW5Db250cm9sbGVyXCJ9KTtcbiAgJHJvdXRlUHJvdmlkZXIud2hlbihcIi9sb2dpblwiICAgICAgICAgICAgICAgICAgICAgLCB7dGVtcGxhdGVVcmw6IFwidmlld3MvYXV0aC9sb2dpbi5odG1sXCIsICAgICAgICAgICAgY29udHJvbGxlcjogXCJMb2dpbkNvbnRyb2xsZXJcIn0pO1xuICAkcm91dGVQcm92aWRlci53aGVuKFwiL2xvZ2luLzppZC86Y29kZVwiICAgICAgICAgICAsIHt0ZW1wbGF0ZVVybDogXCJ2aWV3cy9hdXRoL2xvZ2luLmh0bWxcIiwgICAgICAgICAgICBjb250cm9sbGVyOiBcIkxvZ2luQ29udHJvbGxlclwifSk7XG4gICRyb3V0ZVByb3ZpZGVyLndoZW4oXCIvY29tcGFuaWVzL1wiICAgICAgICAgICAgICAgICwge3RlbXBsYXRlVXJsOiBcInZpZXdzL2NvbXBhbnkvbGlzdC5odG1sXCIsICAgICAgICAgIGNvbnRyb2xsZXI6IFwiQ29tcGFuaWVzQ29udHJvbGxlclwifSk7XG4gICRyb3V0ZVByb3ZpZGVyLndoZW4oXCIvY29tcGFuaWVzL3RhYmxlL1wiICAgICAgICAgICwge3RlbXBsYXRlVXJsOiBcInZpZXdzL2NvbXBhbnkvdGFibGUuaHRtbFwiLCAgICAgICAgIGNvbnRyb2xsZXI6IFwiQ29tcGFuaWVzQ29udHJvbGxlclwifSk7XG4gICRyb3V0ZVByb3ZpZGVyLndoZW4oXCIvY29tcGFuaWVzL2J1ZGdldC9cIiAgICAgICAgICwge3RlbXBsYXRlVXJsOiBcInZpZXdzL2NvbXBhbnkvYnVkZ2V0Lmh0bWxcIiwgICAgICAgIGNvbnRyb2xsZXI6IFwiQ29tcGFuaWVzQ29udHJvbGxlclwifSk7XG4gICRyb3V0ZVByb3ZpZGVyLndoZW4oXCIvY29tcGFueS9cIiAgICAgICAgICAgICAgICAgICwge3RlbXBsYXRlVXJsOiBcInZpZXdzL2NvbXBhbnkvY3JlYXRlLmh0bWxcIiwgICAgICAgIGNvbnRyb2xsZXI6IFwiQ3JlYXRlQ29tcGFueUNvbnRyb2xsZXJcIn0pO1xuICAkcm91dGVQcm92aWRlci53aGVuKFwiL2NvbXBhbnkvOmlkXCIgICAgICAgICAgICAgICAsIHt0ZW1wbGF0ZVVybDogXCJ2aWV3cy9jb21wYW55L3ZpZXcuaHRtbFwiLCAgICAgICAgICBjb250cm9sbGVyOiBcIkNvbXBhbnlDb250cm9sbGVyXCJ9KTtcbiAgJHJvdXRlUHJvdmlkZXIud2hlbihcIi9jb21wYW55LzppZC9lZGl0XCIgICAgICAgICAgLCB7dGVtcGxhdGVVcmw6IFwidmlld3MvY29tcGFueS9lZGl0Lmh0bWxcIiwgICAgICAgICAgY29udHJvbGxlcjogXCJDb21wYW55Q29udHJvbGxlclwifSk7XG4gICRyb3V0ZVByb3ZpZGVyLndoZW4oXCIvY29tcGFueS86aWQvcGFydGljaXBhdGlvbnNcIiwge3RlbXBsYXRlVXJsOiBcInZpZXdzL2NvbXBhbnkvcGFydGljaXBhdGlvbnMuaHRtbFwiLGNvbnRyb2xsZXI6IFwiQ29tcGFueUNvbnRyb2xsZXJcIn0pO1xuICAkcm91dGVQcm92aWRlci53aGVuKFwiL2NvbXBhbnkvOmlkL2NvbmZpcm1cIiAgICAgICAsIHt0ZW1wbGF0ZVVybDogXCJ2aWV3cy9jb21wYW55L2NvbmZpcm0uaHRtbFwiLCAgICAgICBjb250cm9sbGVyOiBcIkNvbXBhbnlFbWFpbENvbnRyb2xsZXJcIn0pO1xuICAkcm91dGVQcm92aWRlci53aGVuKFwiL2NvbW1lbnQvOmlkL2VkaXRcIiAgICAgICAgICAsIHt0ZW1wbGF0ZVVybDogXCJ2aWV3cy9jb21tZW50L2VkaXQuaHRtbFwiLCAgICAgICAgICBjb250cm9sbGVyOiBcIkNvbW1lbnRDb250cm9sbGVyXCJ9KTtcbiAgJHJvdXRlUHJvdmlkZXIud2hlbihcIi9zcGVha2Vycy9cIiAgICAgICAgICAgICAgICAgLCB7dGVtcGxhdGVVcmw6IFwidmlld3Mvc3BlYWtlci9saXN0Lmh0bWxcIiwgICAgICAgICAgY29udHJvbGxlcjogXCJTcGVha2Vyc0NvbnRyb2xsZXJcIn0pO1xuICAkcm91dGVQcm92aWRlci53aGVuKFwiL3NwZWFrZXJzL3RhYmxlL1wiICAgICAgICAgICAsIHt0ZW1wbGF0ZVVybDogXCJ2aWV3cy9zcGVha2VyL3RhYmxlLmh0bWxcIiwgICAgICAgICBjb250cm9sbGVyOiBcIlNwZWFrZXJzQ29udHJvbGxlclwifSk7XG4gICRyb3V0ZVByb3ZpZGVyLndoZW4oXCIvc3BlYWtlci9cIiAgICAgICAgICAgICAgICAgICwge3RlbXBsYXRlVXJsOiBcInZpZXdzL3NwZWFrZXIvY3JlYXRlLmh0bWxcIiwgICAgICAgIGNvbnRyb2xsZXI6IFwiQ3JlYXRlU3BlYWtlckNvbnRyb2xsZXJcIn0pO1xuICAkcm91dGVQcm92aWRlci53aGVuKFwiL3NwZWFrZXIvOmlkXCIgICAgICAgICAgICAgICAsIHt0ZW1wbGF0ZVVybDogXCJ2aWV3cy9zcGVha2VyL3ZpZXcuaHRtbFwiLCAgICAgICAgICBjb250cm9sbGVyOiBcIlNwZWFrZXJDb250cm9sbGVyXCJ9KTtcbiAgJHJvdXRlUHJvdmlkZXIud2hlbihcIi9zcGVha2VyLzppZC9lZGl0XCIgICAgICAgICAgLCB7dGVtcGxhdGVVcmw6IFwidmlld3Mvc3BlYWtlci9lZGl0Lmh0bWxcIiwgICAgICAgICAgY29udHJvbGxlcjogXCJTcGVha2VyQ29udHJvbGxlclwifSk7XG4gICRyb3V0ZVByb3ZpZGVyLndoZW4oXCIvc3BlYWtlci86aWQvcGFydGljaXBhdGlvbnNcIiwge3RlbXBsYXRlVXJsOiBcInZpZXdzL3NwZWFrZXIvcGFydGljaXBhdGlvbnMuaHRtbFwiLGNvbnRyb2xsZXI6IFwiU3BlYWtlckNvbnRyb2xsZXJcIn0pO1xuICAkcm91dGVQcm92aWRlci53aGVuKFwiL3NwZWFrZXIvOmlkL2NvbmZpcm1cIiAgICAgICAsIHt0ZW1wbGF0ZVVybDogXCJ2aWV3cy9zcGVha2VyL2NvbmZpcm0uaHRtbFwiLCAgICAgICBjb250cm9sbGVyOiBcIlNwZWFrZXJFbWFpbENvbnRyb2xsZXJcIn0pO1xuICAkcm91dGVQcm92aWRlci53aGVuKFwiL21lbWJlcnMvXCIgICAgICAgICAgICAgICAgICAsIHt0ZW1wbGF0ZVVybDogXCJ2aWV3cy9tZW1iZXIvbGlzdC5odG1sXCIsICAgICAgICAgICBjb250cm9sbGVyOiBcIk1lbWJlcnNDb250cm9sbGVyXCJ9KTtcbiAgJHJvdXRlUHJvdmlkZXIud2hlbihcIi9tZW1iZXIvXCIgICAgICAgICAgICAgICAgICAgLCB7dGVtcGxhdGVVcmw6IFwidmlld3MvbWVtYmVyL2NyZWF0ZS5odG1sXCIsICAgICAgICAgY29udHJvbGxlcjogXCJDcmVhdGVNZW1iZXJDb250cm9sbGVyXCJ9KTtcbiAgJHJvdXRlUHJvdmlkZXIud2hlbihcIi9tZW1iZXIvOmlkXCIgICAgICAgICAgICAgICAgLCB7dGVtcGxhdGVVcmw6IFwidmlld3MvbWVtYmVyL3ZpZXcuaHRtbFwiLCAgICAgICAgICAgY29udHJvbGxlcjogXCJNZW1iZXJDb250cm9sbGVyXCJ9KTtcbiAgJHJvdXRlUHJvdmlkZXIud2hlbihcIi9tZW1iZXIvOmlkL2VkaXRcIiAgICAgICAgICAgLCB7dGVtcGxhdGVVcmw6IFwidmlld3MvbWVtYmVyL2VkaXQuaHRtbFwiLCAgICAgICAgICAgY29udHJvbGxlcjogXCJNZW1iZXJDb250cm9sbGVyXCJ9KTtcbiAgJHJvdXRlUHJvdmlkZXIud2hlbihcIi9tZWV0aW5nc1wiICAgICAgICAgICAgICAgICAgLCB7dGVtcGxhdGVVcmw6IFwidmlld3MvbWVldGluZy9saXN0Lmh0bWxcIiwgICAgICAgICAgY29udHJvbGxlcjogXCJNZWV0aW5nc0NvbnRyb2xsZXJcIn0pO1xuICAkcm91dGVQcm92aWRlci53aGVuKFwiL21lZXRpbmcvOmlkXCIgICAgICAgICAgICAgICAsIHt0ZW1wbGF0ZVVybDogXCJ2aWV3cy9tZWV0aW5nL3ZpZXcuaHRtbFwiLCAgICAgICAgICBjb250cm9sbGVyOiBcIk1lZXRpbmdDb250cm9sbGVyXCJ9KTtcbiAgJHJvdXRlUHJvdmlkZXIud2hlbihcIi9tZWV0aW5nLzppZC90ZXh0XCIgICAgICAgICAgLCB7dGVtcGxhdGVVcmw6IFwidmlld3MvbWVldGluZy90ZXh0Lmh0bWxcIiwgICAgICAgICAgY29udHJvbGxlcjogXCJNZWV0aW5nQ29udHJvbGxlclwifSk7XG4gICRyb3V0ZVByb3ZpZGVyLndoZW4oXCIvbWVldGluZy86aWQvZWRpdFwiICAgICAgICAgICwge3RlbXBsYXRlVXJsOiBcInZpZXdzL21lZXRpbmcvZWRpdC5odG1sXCIsICAgICAgICAgIGNvbnRyb2xsZXI6IFwiTWVldGluZ0NvbnRyb2xsZXJcIn0pO1xuICAkcm91dGVQcm92aWRlci53aGVuKFwiL2NoYXRzXCIgICAgICAgICAgICAgICAgICAgICAsIHt0ZW1wbGF0ZVVybDogXCJ2aWV3cy9jaGF0L2xpc3QuaHRtbFwiLCAgICAgICAgICAgICBjb250cm9sbGVyOiBcIkNoYXRzQ29udHJvbGxlclwifSk7XG4gICRyb3V0ZVByb3ZpZGVyLndoZW4oXCIvY2hhdC86aWRcIiAgICAgICAgICAgICAgICAgICwge3RlbXBsYXRlVXJsOiBcInZpZXdzL2NoYXQvdmlldy5odG1sXCIsICAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwiQ2hhdENvbnRyb2xsZXJcIn0pO1xuICAkcm91dGVQcm92aWRlci53aGVuKFwiL3RvcGljc1wiICAgICAgICAgICAgICAgICAgICAsIHt0ZW1wbGF0ZVVybDogXCJ2aWV3cy90b3BpYy9saXN0Lmh0bWxcIiwgICAgICAgICAgICBjb250cm9sbGVyOiBcIlRvcGljc0NvbnRyb2xsZXJcIn0pO1xuICAkcm91dGVQcm92aWRlci53aGVuKFwiL3RvcGljLzppZFwiICAgICAgICAgICAgICAgICAsIHt0ZW1wbGF0ZVVybDogXCJ2aWV3cy90b3BpYy92aWV3Lmh0bWxcIiwgICAgICAgICAgICBjb250cm9sbGVyOiBcIlRvcGljQ29udHJvbGxlclwifSk7XG4gICRyb3V0ZVByb3ZpZGVyLndoZW4oXCIvY29tbXVuaWNhdGlvbnMvOmtpbmRcIiAgICAgICwge3RlbXBsYXRlVXJsOiBcInZpZXdzL2NvbW11bmljYXRpb24vbGlzdC5odG1sXCIsICAgIGNvbnRyb2xsZXI6IFwiQ29tbXVuaWNhdGlvbnNDb250cm9sbGVyXCJ9KTtcbiAgJHJvdXRlUHJvdmlkZXIud2hlbihcIi9zZXNzaW9uL1wiICAgICAgICAgICAgICAgICAgLCB7dGVtcGxhdGVVcmw6IFwidmlld3Mvc2Vzc2lvbi9zZXNzaW9uLmh0bWxcIiwgICAgICAgY29udHJvbGxlcjogXCJTZXNzaW9uQ29udHJvbGxlclwifSk7XG4gICRyb3V0ZVByb3ZpZGVyLndoZW4oXCIvc2Vzc2lvbi86aWQvZWRpdFwiICAgICAgICAgICwge3RlbXBsYXRlVXJsOiBcInZpZXdzL3Nlc3Npb24vc2Vzc2lvbi5odG1sXCIsICAgICAgIGNvbnRyb2xsZXI6IFwiU2Vzc2lvbkNvbnRyb2xsZXJcIn0pO1xuICAkcm91dGVQcm92aWRlci53aGVuKFwiL3Nlc3Npb25zL1wiICAgICAgICAgICAgICAgICAsIHt0ZW1wbGF0ZVVybDogXCJ2aWV3cy9zZXNzaW9uL3Nlc3Npb25zLmh0bWxcIiwgICAgICBjb250cm9sbGVyOiBcIlNlc3Npb25zQ29udHJvbGxlclwifSk7XG4gICRyb3V0ZVByb3ZpZGVyLndoZW4oXCIvc2Vzc2lvbi86aWRcIiAgICAgICAgICAgICAgICwge3RlbXBsYXRlVXJsOiBcInZpZXdzL3Nlc3Npb24vdmlldy5odG1sXCIsICAgICAgICAgIGNvbnRyb2xsZXI6IFwiVmlld1Nlc3Npb25Db250cm9sbGVyXCJ9KTtcbiAgJHJvdXRlUHJvdmlkZXIub3RoZXJ3aXNlKHtyZWRpcmVjdFRvOiBcIi9cIn0pO1xufV0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnRoZVRvb2xDb250cm9sbGVyLmNvbnRyb2xsZXIoXCJBZG1pbkNvbnRyb2xsZXJcIiwgZnVuY3Rpb24gKCRyb290U2NvcGUsICRzY29wZSwgRXZlbnRGYWN0b3J5LCBJdGVtRmFjdG9yeSkge1xuXG4gICRyb290U2NvcGUudXBkYXRlLnRpbWVvdXQocnVuQ29udHJvbGxlcik7XG5cbiAgZnVuY3Rpb24gcnVuQ29udHJvbGxlcigpe1xuXG4gICAgRXZlbnRGYWN0b3J5LkV2ZW50LmdldEFsbChmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICRzY29wZS5ldmVudHMgPSByZXNwb25zZTtcbiAgICB9KTtcblxuICAgIEl0ZW1GYWN0b3J5Lkl0ZW0uZ2V0QWxsKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgJHNjb3BlLml0ZW1zID0gcmVzcG9uc2U7XG4gICAgfSk7XG5cbiAgICAkc2NvcGUuYWRkRXZlbnQgPSBmdW5jdGlvbihuZXdFdmVudCkge1xuICAgICAgRXZlbnRGYWN0b3J5LkV2ZW50LmNyZWF0ZShuZXdFdmVudCwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgaWYocmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgICAkc2NvcGUuZXJyb3IgPSByZXNwb25zZS5lcnJvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIEV2ZW50RmFjdG9yeS5FdmVudC5nZXRBbGwoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgJHNjb3BlLmV2ZW50cyA9IHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAkc2NvcGUuYWRkSXRlbSA9IGZ1bmN0aW9uKG5ld0l0ZW0pIHtcbiAgICAgIEl0ZW1GYWN0b3J5Lkl0ZW0uY3JlYXRlKG5ld0l0ZW0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmKHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgJHNjb3BlLmVycm9yID0gcmVzcG9uc2UuZXJyb3I7XG4gICAgICAgIH1cblxuICAgICAgICBJdGVtRmFjdG9yeS5JdGVtLmdldEFsbChmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAkc2NvcGUuaXRlbXMgPSByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnVwZGF0ZUV2ZW50ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBFdmVudEZhY3RvcnkuRXZlbnQudXBkYXRlKHtpZDogZXZlbnQuaWR9LCBldmVudCwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmKHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhyZXNwb25zZS5lcnJvcik7XG4gICAgICAgICAgcmV0dXJuICRzY29wZS5lcnJvciA9IHJlc3BvbnNlLmVycm9yO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50LmVkaXRpbmcgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAkc2NvcGUudXBkYXRlSXRlbSA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICBJdGVtRmFjdG9yeS5JdGVtLnVwZGF0ZSh7aWQ6IGl0ZW0uaWR9LCBpdGVtLCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgaWYocmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgICAkc2NvcGUuZXJyb3IgPSByZXNwb25zZS5lcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBpdGVtLmVkaXRpbmcgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAkc2NvcGUuZGVsZXRlRXZlbnQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIEV2ZW50RmFjdG9yeS5FdmVudC5kZWxldGUoe2lkOiBldmVudC5pZH0sIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICBpZihyZXNwb25zZS5lcnJvcikge1xuICAgICAgICAgICRzY29wZS5lcnJvciA9IHJlc3BvbnNlLmVycm9yO1xuICAgICAgICB9XG5cbiAgICAgICAgRXZlbnRGYWN0b3J5LkV2ZW50LmdldEFsbChmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAkc2NvcGUuZXZlbnRzID0gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgICRzY29wZS5kZWxldGVJdGVtID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIEl0ZW1GYWN0b3J5Lkl0ZW0uZGVsZXRlKHtpZDogaXRlbS5pZH0sIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICBpZihyZXNwb25zZS5lcnJvcikge1xuICAgICAgICAgICRzY29wZS5lcnJvciA9IHJlc3BvbnNlLmVycm9yO1xuICAgICAgICB9XG5cbiAgICAgICAgSXRlbUZhY3RvcnkuSXRlbS5nZXRBbGwoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgJHNjb3BlLml0ZW1zID0gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICB9XG59KTtcbiIsInJlcXVpcmUoXCIuL2xvZ2luXCIpO1xucmVxdWlyZSgnLi9pbnRlcmNlcHRvcicpO1xuIiwidGhlVG9vbENvbnRyb2xsZXIuY29uZmlnKGZ1bmN0aW9uICgkaHR0cFByb3ZpZGVyKSB7XG4gICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goWyckaW5qZWN0b3InLCBmdW5jdGlvbiAoJGluamVjdG9yKSB7XG4gICAgcmV0dXJuICRpbmplY3Rvci5nZXQoJ0F1dGhJbnRlcmNlcHRvcicpO1xuICB9XSk7XG59KTtcblxudGhlVG9vbENvbnRyb2xsZXIuZmFjdG9yeSgnQXV0aEludGVyY2VwdG9yJywgZnVuY3Rpb24gKCRyb290U2NvcGUsICRsb2NhdGlvbiwgJHdpbmRvdykge1xuICByZXR1cm4ge1xuICAgIHJlc3BvbnNlRXJyb3I6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAxKSB7XG4gICAgICAgICRyb290U2NvcGUudXBkYXRlLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgaWYoJGxvY2F0aW9uLnBhdGgoKS5pbmRleE9mKCcvbG9naW4nKSA9PSAtMSkge1xuICAgICAgICAgICRyb290U2NvcGUubmV4dFBhdGggPSAnIycgKyAkbG9jYXRpb24ucGF0aCgpO1xuICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvbG9naW4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbn0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBmYWNlYm9va0NvbmZpZyA9IHJlcXVpcmUoJy4vLi4vLi4vLi4vLi4vLi4vY29uZmlnJykuZmFjZWJvb2s7XG5cbnRoZVRvb2xDb250cm9sbGVyLmNvbnRyb2xsZXIoXCJMb2dpbkNvbnRyb2xsZXJcIiwgZnVuY3Rpb24gKCRyb290U2NvcGUsICRzY29wZSwgJHJvdXRlUGFyYW1zLCAkbG9jYXRpb24sICRodHRwLCAkd2luZG93KSB7XG5cbiAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PUlOSVRJQUxJWkFUSU9OPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgJC5hamF4U2V0dXAoe2NhY2hlOiB0cnVlfSk7XG4gICQuZ2V0U2NyaXB0KFwiLy9jb25uZWN0LmZhY2Vib29rLm5ldC9wdF9QVC9hbGwuanNcIiwgZnVuY3Rpb24gKCkge1xuICAgIEZCLmluaXQoe2FwcElkOiBmYWNlYm9va0NvbmZpZy5hcHBJZH0pO1xuICB9KTtcblxuICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAkc2NvcGUuc2hvd0lkSW5wdXQgPSB0cnVlO1xuICAkc2NvcGUuc2hvd0NvZGVJbnB1dCA9IGZhbHNlO1xuXG4gIGlmKCRzY29wZS5tZS5pZCkge1xuICAgIC8vJGxvY2F0aW9uLnBhdGgoJy8nKTtcbiAgICAkd2luZG93LmxvY2F0aW9uLmFzc2lnbignLycpO1xuICB9XG5cbiAgdmFyIGxvY2sgPSBmYWxzZTtcblxuICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09RlVOQ1RJT05TPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAkc2NvcGUuZmFjZWJvb2tMb2dpbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAkc2NvcGUuYmFuYW5hID0gdHJ1ZTtcblxuICBcdGlmIChsb2NrKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbG9jayA9IHRydWU7XG5cbiAgICBGQi5nZXRMb2dpblN0YXR1cyhmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IFwiY29ubmVjdGVkXCIpIHtcbiAgICAgICAgY29ubmVjdGVkKHJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBGQi5sb2dpbihmdW5jdGlvbiAoKSB7fSwge2Rpc3BsYXk6IFwicG9wdXBcIn0pO1xuICAgICAgICBGQi5FdmVudC5zdWJzY3JpYmUoXCJhdXRoLnN0YXR1c0NoYW5nZVwiLCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSBcImNvbm5lY3RlZFwiKSB7XG4gICAgICAgICAgICBjb25uZWN0ZWQocmVzcG9uc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbG9jayA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gY29ubmVjdGVkKHJlc3BvbnNlKSB7XG4gICAgICAkc2NvcGUuY29ubmVjdGVkID0gdHJ1ZTtcbiAgICAgICRzY29wZS5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICRzY29wZS5sb2dpbkluZm8gPSBcIkxvZ2dpbmcgaW4uLi5cIjtcblxuICAgICAgJGh0dHAuZ2V0KHVybF9wcmVmaXggKyAnL2FwaS9sb2dpbi9mYWNlYm9vaz9pZD0nK3Jlc3BvbnNlLmF1dGhSZXNwb25zZS51c2VySUQrJyZ0b2tlbj0nK3Jlc3BvbnNlLmF1dGhSZXNwb25zZS5hY2Nlc3NUb2tlbikuXG4gICAgICAgIHN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcbiAgICAgICAgICAvLyRsb2NhdGlvbi5wYXRoKCcvJyk7XG4gICAgICAgICAgaWYodHlwZW9mICRyb290U2NvcGUubmV4dFBhdGggPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICR3aW5kb3cubG9jYXRpb24uYXNzaWduKCcjJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAkd2luZG93LmxvY2F0aW9uLmFzc2lnbigkcm9vdFNjb3BlLm5leHRQYXRoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJHJvb3RTY29wZS51cGRhdGUuYWxsKCk7XG4gICAgICAgIH0pLlxuICAgICAgICBlcnJvcihmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xuICAgICAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkVSUk9SXCIsIGRhdGEpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgJHNjb3BlLnNlbmRFbWFpbCA9IGZ1bmN0aW9uIChtZW1iZXJJZCkge1xuICAgICRzY29wZS5sb2FkaW5nID0gdHJ1ZTtcbiAgICAkc2NvcGUubG9naW5JbmZvID0gXCJTZW5kaW5nIGVtYWlsLi4uXCI7XG4gICAgJHNjb3BlLnNob3dJZElucHV0ID0gZmFsc2U7XG4gICAgLy9jb25zb2xlLmxvZyhcIlNlbmRpbmcgZW1haWwuLi5cIik7XG5cbiAgICAkaHR0cC5nZXQodXJsX3ByZWZpeCArICcvYXBpL2xvZ2luLycgKyBtZW1iZXJJZCkuXG4gICAgICBzdWNjZXNzKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XG4gICAgICAgIGlmKGRhdGEuZXJyb3IpIHtcbiAgICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgIHNldEluZm8oXCJUaGVyZSB3YXMgYW4gZXJyb3IuLi5cIik7XG4gICAgICAgICAgJHNjb3BlLnNob3dJZElucHV0ID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgc2V0SW5mbyhcIkVtYWlsIHNlbnQhXCIpO1xuICAgICAgICAkc2NvcGUuc2hvd0NvZGVJbnB1dCA9IHRydWU7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJFbWFpbCBzZW50IVwiKVxuICAgICAgfSkuXG4gICAgICBlcnJvcihmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xuICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICBzZXRJbmZvKFwiVGhlcmUgd2FzIGFuIGVycm9yLi4uXCIpO1xuICAgICAgICAkc2NvcGUuc2hvd0lkSW5wdXQgPSB0cnVlO1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiRVJST1JcIiwgZGF0YSk7XG4gICAgICB9KTtcbiAgfVxuXG4gICRzY29wZS5zdWJtaXRDb2RlID0gZnVuY3Rpb24gKG1lbWJlcklkLCBtZW1iZXJDb2RlKSB7XG4gICAgJHNjb3BlLmxvYWRpbmcgPSB0cnVlO1xuICAgICRzY29wZS5sb2dpbkluZm8gPSBcIlZlcmlmeWluZyBjb2RlLi4uXCI7XG4gICAgJHNjb3BlLnNob3dDb2RlSW5wdXQgPSBmYWxzZTtcblxuICAgICRodHRwLmdldCh1cmxfcHJlZml4ICsgJy9hcGkvbG9naW4vJyArIG1lbWJlcklkICsgJy8nICsgbWVtYmVyQ29kZSkuXG4gICAgICBzdWNjZXNzKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XG4gICAgICAgIGlmKGRhdGEuZXJyb3IpIHtcbiAgICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgIHNldEluZm8oXCJUaGVyZSB3YXMgYW4gZXJyb3IuLi5cIik7XG4gICAgICAgICAgJHNjb3BlLnNob3dJZElucHV0ID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgJHNjb3BlLmxvZ2luSW5mbyA9IFwiU3VjY2VzcyFcIjtcbiAgICAgICAgJHdpbmRvdy5sb2NhdGlvbi5hc3NpZ24oJy8nKTtcbiAgICAgICAgLy8kbG9jYXRpb24ucGF0aCgnLycpO1xuICAgICAgfSkuXG4gICAgICBlcnJvcihmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xuICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICBzZXRJbmZvKFwiVGhlcmUgd2FzIGFuIGVycm9yLi4uXCIpO1xuICAgICAgICAkc2NvcGUuc2hvd0lkSW5wdXQgPSB0cnVlO1xuICAgICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRJbmZvKG1lc3NhZ2UpIHtcbiAgICAkc2NvcGUubG9naW5JbmZvID0gbWVzc2FnZTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7JHNjb3BlLmxvZ2luSW5mbz1cIlwifSwgMjAwMCk7XG4gIH1cblxuICBpZiAoJHJvdXRlUGFyYW1zLmlkICYmICRyb3V0ZVBhcmFtcy5jb2RlKSB7XG4gICAgJHNjb3BlLnN1Ym1pdENvZGUoJHJvdXRlUGFyYW1zLmlkLCAkcm91dGVQYXJhbXMuY29kZSlcbiAgfVxuXG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxudGhlVG9vbENvbnRyb2xsZXIuY29udHJvbGxlcignQ2hhdENvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHNjb3BlLCAkaHR0cCwgJHJvdXRlUGFyYW1zLCAkc2NlLCBuZ0F1ZGlvLCBTb2NrZXRGYWN0b3J5LCBNZXNzYWdlRmFjdG9yeSwgQ2hhdEZhY3RvcnksIE1lbWJlckZhY3RvcnkpIHtcblxuICAkcm9vdFNjb3BlLnVwZGF0ZS50aW1lb3V0KHJ1bkNvbnRyb2xsZXIpO1xuXG4gIGZ1bmN0aW9uIHJ1bkNvbnRyb2xsZXIoKXtcblxuICAgICRzY29wZS5lcnJvciA9IHt9O1xuXG4gICAgJHNjb3BlLnVwZGF0aW5nID0gZmFsc2U7XG4gICAgJHNjb3BlLmxvYWRpbmcgID0gdHJ1ZTtcbiAgICAkc2NvcGUuYXV0aCAgICAgPSBmYWxzZTtcbiAgICAkc2NvcGUuY29uZWN0ZWQgPSBmYWxzZTtcbiAgICAkc2NvcGUubWVzc2FnZXMgPSBbXTtcbiAgICAkc2NvcGUub25saW5lICAgPSBbXTtcblxuICAgIC8vY29uc29sZS5sb2coXCJDb25uZWN0aW5nXCIpO1xuXG4gICAgU29ja2V0RmFjdG9yeS5jb25uZWN0KCcvY2hhdCcpO1xuXG4gICAgU29ja2V0RmFjdG9yeS5vbignY29ubmVjdGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgJHNjb3BlLmNvbmVjdGVkID0gdHJ1ZTtcbiAgICAgIGlmKCEkc2NvcGUuYXV0aCl7XG4gICAgICAgIFNvY2tldEZhY3RvcnkuZW1pdCgnYXV0aCcsIHtpZDogKCRyb3V0ZVBhcmFtcy5pZCB8fCAnZ2VyYWwnKSwgdXNlcjogJHNjb3BlLm1lLmlkfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vY29uc29sZS5sb2coJ0F1dGggc3VjY2VzcycpO1xuICAgICAgICAgICRzY29wZS5hdXRoID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBTb2NrZXRGYWN0b3J5Lm9uKCd2YWxpZGF0aW9uJywgZnVuY3Rpb24gKHJlc3BvbnNlKXtcbiAgICAgIGlmKCFyZXNwb25zZS5lcnIpe1xuICAgICAgICAkc2NvcGUuY2hhdCAgICAgPSByZXNwb25zZS5jaGF0RGF0YTtcbiAgICAgICAgJHNjb3BlLm1lc3NhZ2VzID0gcmVzcG9uc2UubWVzc2FnZXM7XG4gICAgICAgICRzY29wZS5yb29tICAgICA9IHJlc3BvbnNlLnJvb207XG5cbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8ICRzY29wZS5jaGF0Lm1lbWJlcnMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICRzY29wZS5vbmxpbmUucHVzaCh7bWVtYmVyOiAkc2NvcGUuY2hhdC5tZW1iZXJzW2ldLCBvbjogZmFsc2V9KTtcbiAgICAgICAgICBpZihyZXNwb25zZS5vbmxpbmUuaW5kZXhPZigkc2NvcGUuY2hhdC5tZW1iZXJzW2ldKSAhPSAtMSl7XG4gICAgICAgICAgICAkc2NvcGUub25saW5lW2ldLm9uID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJHNjb3BlLm9ubGluZVtpXS5uYW1lID0gJHNjb3BlLmdldE1lbWJlcigkc2NvcGUub25saW5lW2ldLm1lbWJlcikubmFtZTtcbiAgICAgICAgfVxuICAgICAgICAkc2NvcGUuaGlzdG9yeSA9IGhpc3Rvcnk7XG4gICAgICB9XG4gICAgICBlbHNle1xuICAgICAgICAvL2NvbnNvbGUubG9nKHJlc3BvbnNlLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgJHNjb3BlLmxvYWRpbmcgID0gZmFsc2U7XG4gICAgfSk7XG5cbiAgICBTb2NrZXRGYWN0b3J5Lm9uKCd1c2VyLWNvbm5lY3RlZCcsIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgLy9jb25zb2xlLmxvZyhcIlVzZXIgY29ubmVjdGVkOiBcIiArIHJlc3BvbnNlLmlkKTtcbiAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCAkc2NvcGUub25saW5lLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgaWYoJHNjb3BlLm9ubGluZVtpXS5tZW1iZXIgPT09IHJlc3BvbnNlLmlkKXtcbiAgICAgICAgICAkc2NvcGUub25saW5lW2ldLm9uID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgU29ja2V0RmFjdG9yeS5vbigndXNlci1kaXNjb25uZWN0ZWQnLCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgIC8vY29uc29sZS5sb2coXCJVc2VyIGNvbm5lY3RlZDogXCIgKyByZXNwb25zZS5pZCk7XG4gICAgICBmb3IodmFyIGkgPSAwOyBpIDwgJHNjb3BlLm9ubGluZS5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGlmKCRzY29wZS5vbmxpbmVbaV0ubWVtYmVyID09PSByZXNwb25zZS5pZCl7XG4gICAgICAgICAgJHNjb3BlLm9ubGluZVtpXS5vbiA9IGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBTb2NrZXRGYWN0b3J5Lm9uKCdtZXNzYWdlJywgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICB2YXIgbWVzc2FnZSA9IHJlc3BvbnNlLm1lc3NhZ2U7XG4gICAgICAkc2NvcGUubWVzc2FnZXMucHVzaChtZXNzYWdlKTtcbiAgICAgIGlmKG1lc3NhZ2UubWVtYmVyICE9ICRzY29wZS5tZS5pZCkge1xuICAgICAgICBuZ0F1ZGlvLnBsYXkoXCJhdWRpby9tZXNzYWdlLm1wM1wiKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIFNvY2tldEZhY3Rvcnkub24oJ2hpc3Rvcnktc2VuZCcsIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgJHNjb3BlLm1lc3NhZ2VzID0gJHNjb3BlLm1lc3NhZ2VzLmNvbmNhdChyZXNwb25zZS5tZXNzYWdlcyk7XG4gICAgICAkc2NvcGUudXBkYXRpbmcgPSBmYWxzZTtcbiAgICAgICRzY29wZS5pbmZpbml0ZVNjcm9sbERpc2FibGVkID0gZmFsc2U7XG4gICAgfSk7XG5cbiAgICAkc2NvcGUuJG9uKCckbG9jYXRpb25DaGFuZ2VTdGFydCcsIGZ1bmN0aW9uKCl7XG4gICAgICBTb2NrZXRGYWN0b3J5LmRpc2Nvbm5lY3QoKTtcbiAgICAgIGRlbGV0ZSBTb2NrZXRGYWN0b3J5LnNvY2tldDtcbiAgICB9KTtcblxuICAgICRzY29wZS5zdWJtaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICgkc2NvcGUudGV4dCA9PSBcIlwiKXtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgbWVzc2FnZURhdGEgPSB7XG4gICAgICAgIHRleHQgICA6ICRzY29wZS50ZXh0LFxuICAgICAgICBjaGF0SWQgOiAoJHJvdXRlUGFyYW1zLmlkIHx8ICdnZXJhbCcpLFxuICAgICAgICBtZW1iZXIgOiAkc2NvcGUubWUuaWQsXG4gICAgICB9XG5cbiAgICAgIFNvY2tldEZhY3RvcnkuZW1pdCgnc2VuZCcsIHtyb29tOiAkc2NvcGUucm9vbSwgbWVzc2FnZTogbWVzc2FnZURhdGEgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ01lc3NhZ2Ugc2VudCcpO1xuICAgICAgICAkc2NvcGUudGV4dCA9IFwiXCI7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaGlzdG9yeSAoKSB7XG4gICAgICAvL2NvbnNvbGUubG9nKCdTdGFydCBoaXN0b3J5IHJlcXVlc3QnKTtcbiAgICAgIGlmKCEkc2NvcGUudXBkYXRpbmcpe1xuICAgICAgICAkc2NvcGUuaW5maW5pdGVTY3JvbGxEaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICRzY29wZS51cGRhdGluZyA9IHRydWU7XG4gICAgICAgIFNvY2tldEZhY3RvcnkuZW1pdCgnaGlzdG9yeS1nZXQnLCB7cm9vbTogJHNjb3BlLnJvb20sIGRhdGU6ICRzY29wZS5tZXNzYWdlc1skc2NvcGUubWVzc2FnZXMubGVuZ3RoLTFdLmRhdGUgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy9jb25zb2xlLmxvZygnU2VudCBoaXN0b3J5IHJlcXVlc3QnKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59KTtcbiIsInJlcXVpcmUoJy4vbGlzdCcpO1xucmVxdWlyZSgnLi9jaGF0Jyk7IiwiJ3VzZSBzdHJpY3QnO1xuXG50aGVUb29sQ29udHJvbGxlci5jb250cm9sbGVyKCdDaGF0c0NvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHNjb3BlLCBDaGF0RmFjdG9yeSkge1xuXG4gICRyb290U2NvcGUudXBkYXRlLnRpbWVvdXQocnVuQ29udHJvbGxlcik7XG5cbiAgZnVuY3Rpb24gcnVuQ29udHJvbGxlcigpe1xuXG4gICAgJHNjb3BlLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgQ2hhdEZhY3RvcnkuQ2hhdC5nZXRBbGwoZnVuY3Rpb24oY2hhdHMpIHtcbiAgICAgICRzY29wZS5jaGF0cyA9IGNoYXRzO1xuICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG59KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG50aGVUb29sQ29udHJvbGxlci5jb250cm9sbGVyKFwiQ29tbWVudEFyZWFDb250cm9sbGVyXCIsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkc2NvcGUsICRodHRwLCAkcm91dGVQYXJhbXMsIE1lbWJlckZhY3RvcnksIENvbW1lbnRGYWN0b3J5KSB7XG5cbiAgJHJvb3RTY29wZS51cGRhdGUudGltZW91dChydW5Db250cm9sbGVyKTtcblxuICBmdW5jdGlvbiBydW5Db250cm9sbGVyKCl7XG5cbiAgICAkc2NvcGUubG9hZGluZyA9IHRydWU7XG5cbiAgICAkc2NvcGUuY29tbWVudERhdGEgPSB7XG4gICAgICBtYXJrZG93bjogXCJcIlxuICAgIH07XG5cbiAgICBsb2FkQ29tbWVudHMoKTtcblxuICAgIGZ1bmN0aW9uIGxvYWRDb21tZW50cygpIHtcbiAgICAgIGlmICgkc2NvcGUudGhyZWFkLnNwbGl0KFwiLVwiKVsxXSA9PT0gXCJcIikge1xuICAgICAgICBzZXRUaW1lb3V0KGxvYWRDb21tZW50cywgNTAwKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGhyZWFkSWQ7XG4gICAgICB2YXIgdGhyZWFkVHlwZTtcblxuICAgICAgaWYoJHNjb3BlLnN1YnRocmVhZCAmJiAkc2NvcGUuc3VidGhyZWFkICE9ICcnKSB7XG4gICAgICAgIHRocmVhZFR5cGUgPSAkc2NvcGUuc3VidGhyZWFkLnNwbGl0KCctJylbMF07XG4gICAgICAgIHRocmVhZElkID0gJHNjb3BlLnN1YnRocmVhZC5zdWJzdHJpbmcoJHNjb3BlLnN1YnRocmVhZC5pbmRleE9mKFwiLVwiKSArIDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyZWFkVHlwZSA9ICRzY29wZS50aHJlYWQuc3BsaXQoJy0nKVswXTtcbiAgICAgICAgdGhyZWFkSWQgPSAkc2NvcGUudGhyZWFkLnN1YnN0cmluZygkc2NvcGUudGhyZWFkLmluZGV4T2YoXCItXCIpICsgMSk7XG4gICAgICB9XG5cbiAgICAgIHN3aXRjaCh0aHJlYWRUeXBlKSB7XG4gICAgICAgIGNhc2UgXCJjb21wYW55XCI6IFxuICAgICAgICAgIENvbW1lbnRGYWN0b3J5LkNvbXBhbnkuZ2V0QWxsKHtpZDogdGhyZWFkSWR9LCBnb3RDb21tZW50cyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJzcGVha2VyXCI6IFxuICAgICAgICAgIENvbW1lbnRGYWN0b3J5LlNwZWFrZXIuZ2V0QWxsKHtpZDogdGhyZWFkSWR9LCBnb3RDb21tZW50cyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ0b3BpY1wiOiBcbiAgICAgICAgICBDb21tZW50RmFjdG9yeS5Ub3BpYy5nZXRBbGwoe2lkOiB0aHJlYWRJZH0sIGdvdENvbW1lbnRzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImNvbW11bmljYXRpb25cIjogXG4gICAgICAgICAgQ29tbWVudEZhY3RvcnkuQ29tbXVuaWNhdGlvbi5nZXRBbGwoe2lkOiB0aHJlYWRJZH0sIGdvdENvbW1lbnRzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZ290Q29tbWVudHMoY29tbWVudHMpIHtcbiAgICAgICAgJHNjb3BlLmNvbW1lbnRzID0gY29tbWVudHM7XG5cbiAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAkc2NvcGUucG9zdENvbW1lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoJHNjb3BlLmNvbW1lbnREYXRhLm1hcmtkb3duID09PSBcIlwiKXtcbiAgICAgICAgJHNjb3BlLmVtcHR5Q29tbWVudCA9IHRydWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGRhdGUgPSBEYXRlLm5vdygpO1xuICAgICAgQ29tbWVudEZhY3RvcnkuQ29tbWVudC5jcmVhdGUoe1xuICAgICAgICB0aHJlYWQ6ICRzY29wZS50aHJlYWQsXG4gICAgICAgIHN1YnRocmVhZDogJHNjb3BlLnN1YnRocmVhZCxcbiAgICAgICAgbWVtYmVyOiAkc2NvcGUubWUuaWQsXG4gICAgICAgIG1hcmtkb3duOiAkc2NvcGUuY29tbWVudERhdGEubWFya2Rvd24sXG4gICAgICAgIGh0bWw6ICRzY29wZS5jb252ZXJ0TWFya2Rvd25Ub0h0bWwoJHNjb3BlLmNvbW1lbnREYXRhLm1hcmtkb3duKSxcbiAgICAgICAgcG9zdGVkOiBkYXRlLFxuICAgICAgICB1cGRhdGVkOiBkYXRlXG4gICAgICB9LCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgJHNjb3BlLmNvbW1lbnREYXRhLm1hcmtkb3duID0gXCJcIjtcbiAgICAgICAgJHNjb3BlLmNvbW1lbnRGb3JtLiRzZXRQcmlzdGluZSgpO1xuICAgICAgICBsb2FkQ29tbWVudHMoKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAkc2NvcGUuc2F2ZUNvbW1lbnQgPSBmdW5jdGlvbiAoY29tbWVudCkge1xuICAgICAgaWYgKGNvbW1lbnQuYnVmZmVyID09PSBcIlwiKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29tbWVudC5tYXJrZG93biA9IGNvbW1lbnQuYnVmZmVyO1xuICAgICAgY29tbWVudC5odG1sID0gJHNjb3BlLmNvbnZlcnRNYXJrZG93blRvSHRtbChjb21tZW50Lm1hcmtkb3duKTtcbiAgICAgIGNvbW1lbnQudXBkYXRlZCA9IERhdGUubm93KCk7XG5cbiAgICAgIENvbW1lbnRGYWN0b3J5LkNvbW1lbnQudXBkYXRlKHtpZDogY29tbWVudC5faWR9LCBjb21tZW50LCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgY29tbWVudC5idWZmZXIgPSBcIlwiO1xuICAgICAgICBjb21tZW50LmVkaXRpbmcgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgICRzY29wZS5xdW90ZUNvbW1lbnQgPSBmdW5jdGlvbiAoY29tbWVudCkge1xuICAgICAgJHNjb3BlLmNvbW1lbnREYXRhLm1hcmtkb3duID0gXCI+ICoqXCIgKyAkc2NvcGUuZ2V0TWVtYmVyKGNvbW1lbnQubWVtYmVyKS5uYW1lICsgXCIgc2FpZDoqKlxcbj4gXCIgKyBjb21tZW50Lm1hcmtkb3duLnNwbGl0KFwiXFxuXCIpLmpvaW4oXCJcXG4+IFwiKSArIFwiXFxuXFxuXCI7XG4gICAgfTtcblxuICAgICRzY29wZS5kZWxldGVDb21tZW50ID0gZnVuY3Rpb24gKGNvbW1lbnQpIHtcbiAgICAgIGlmIChjb25maXJtKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGNvbW1lbnQ/XCIpKSB7XG4gICAgICAgIENvbW1lbnRGYWN0b3J5LkNvbW1lbnQuZGVsZXRlKHtpZDogY29tbWVudC5faWR9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgbG9hZENvbW1lbnRzKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAkc2NvcGUuZ2V0TWVtYmVyID0gZnVuY3Rpb24gKG1lbWJlcklkKSB7XG4gICAgICByZXR1cm4gJHNjb3BlLm1lbWJlcnMuZmlsdGVyKGZ1bmN0aW9uKG8pIHtcbiAgICAgICAgcmV0dXJuIG8uaWQgPT0gbWVtYmVySWQ7XG4gICAgICB9KVswXTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmNvbnZlcnRUZXh0VG9IdG1sID0gZnVuY3Rpb24odGV4dCkge1xuICAgICAgdmFyIHVybEV4cCA9IC8oXFxiKGh0dHBzP3xmdHB8ZmlsZSk6XFwvXFwvWy1BLVowLTkrJkAjXFwvJT89fl98ITosLjtdKlstQS1aMC05KyZAI1xcLyU9fl98XSkvaWc7XG4gICAgICB2YXIgbWFpbEV4cCA9IC9bXFx3XFwuXFwtXStcXEAoW1xcd1xcLV0rXFwuKStbXFx3XXsyLDR9KD8hW148XSo+KS9pZztcblxuICAgICAgcmV0dXJuIHRleHQucmVwbGFjZSgvXFxuL2csICc8YnI+JykucmVwbGFjZSh1cmxFeHAsXCI8YSBocmVmPSckMSc+JDE8L2E+XCIpLnJlcGxhY2UobWFpbEV4cCxcIjxhIGhyZWY9JyMvY29tcGFueS9cIiskcm91dGVQYXJhbXMuaWQrXCIvY29uZmlybT9lbWFpbD0kJic+JCY8L2E+XCIpO1xuICAgIH07XG5cbiAgICAkc2NvcGUuY29udmVydE5ld0xpbmVzVG9IdG1sID0gZnVuY3Rpb24odGV4dCkge1xuICAgICAgcmV0dXJuICc8ZGl2IGRhdGEtbWFya2Rvd24+Jyt0ZXh0LnJlcGxhY2UoL1xcbi9nLCAnPGJyPicpKyc8L2Rpdj4nO1xuICAgIH07XG5cbiAgICAkc2NvcGUuY29udmVydE1hcmtkb3duVG9IdG1sID0gZnVuY3Rpb24odGV4dCkge1xuICAgICAgcmV0dXJuICc8ZGl2IGRhdGEtbWFya2Rvd24+JyArIHRleHQgKyAnPC9kaXY+JztcbiAgICB9O1xuXG4gICAgJHNjb3BlLmNoZWNrUGVybWlzc2lvbiA9IGZ1bmN0aW9uIChjb21tZW50KSB7XG4gICAgICBpZighJHNjb3BlLm1lLnJvbGVzKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgICB2YXIgcm9sZXMgPSAkc2NvcGUubWUucm9sZXMuZmlsdGVyKGZ1bmN0aW9uKG8pIHtcbiAgICAgICAgcmV0dXJuIG8uaWQgPT0gJ2RldmVsb3BtZW50LXRlYW0nIHx8IG8uaWQgPT0gJ2Nvb3JkaW5hdGlvbic7XG4gICAgICB9KTtcblxuICAgICAgaWYocm9sZXMubGVuZ3RoID09IDAgJiYgY29tbWVudC5tZW1iZXIgIT0gJHNjb3BlLm1lLmlkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgJHNjb3BlLnRpbWVTaW5jZSA9ZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgIHZhciBzZWNvbmRzID0gTWF0aC5mbG9vcigoRGF0ZS5ub3coKSAtIGRhdGUpIC8gMTAwMCk7XG5cbiAgICAgIHZhciBzdWZmaXggPSAnYWdvJztcbiAgICAgIGlmKHNlY29uZHMgPCAwKXtcbiAgICAgICAgc2Vjb25kcyA9IE1hdGguYWJzKHNlY29uZHMpO1xuICAgICAgICBzdWZmaXggPSAndG8gZ28nO1xuICAgICAgfVxuXG4gICAgICB2YXIgaW50ZXJ2YWwgPSBNYXRoLmZsb29yKHNlY29uZHMgLyAzMTUzNjAwMCk7XG5cbiAgICAgIGlmIChpbnRlcnZhbCA+IDEpIHtcbiAgICAgICAgICByZXR1cm4gaW50ZXJ2YWwgKyBcIiB5ZWFycyBcIiArIHN1ZmZpeDtcbiAgICAgIH1cbiAgICAgIGludGVydmFsID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gMjU5MjAwMCk7XG4gICAgICBpZiAoaW50ZXJ2YWwgPiAxKSB7XG4gICAgICAgICAgcmV0dXJuIGludGVydmFsICsgXCIgbW9udGhzIFwiICsgc3VmZml4O1xuICAgICAgfVxuICAgICAgaW50ZXJ2YWwgPSBNYXRoLmZsb29yKHNlY29uZHMgLyA4NjQwMCk7XG4gICAgICBpZiAoaW50ZXJ2YWwgPiAxKSB7XG4gICAgICAgICAgcmV0dXJuIGludGVydmFsICsgXCIgZGF5cyBcIiArIHN1ZmZpeDtcbiAgICAgIH1cbiAgICAgIGludGVydmFsID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gMzYwMCk7XG4gICAgICBpZiAoaW50ZXJ2YWwgPiAxKSB7XG4gICAgICAgICAgcmV0dXJuIGludGVydmFsICsgXCIgaG91cnMgXCIgKyBzdWZmaXg7XG4gICAgICB9XG4gICAgICBpbnRlcnZhbCA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDYwKTtcbiAgICAgIGlmIChpbnRlcnZhbCA+IDEpIHtcbiAgICAgICAgICByZXR1cm4gaW50ZXJ2YWwgKyBcIiBtaW51dGVzIFwiICsgc3VmZml4O1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1hdGguZmxvb3Ioc2Vjb25kcykgKyBcIiBzZWNvbmRzIFwiICsgc3VmZml4O1xuICAgIH07XG5cbiAgICAkc2NvcGUuZm9ybWF0RGF0ZSA9IGZ1bmN0aW9uICh0aW1lKSB7XG4gICAgICByZXR1cm4gbmV3IERhdGUodGltZSkudG9VVENTdHJpbmcoKTtcbiAgICB9O1xuICB9XG59KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG50aGVUb29sQ29udHJvbGxlci5jb250cm9sbGVyKFwiRmlyc3RDb21tZW50Q29udHJvbGxlclwiLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHNjb3BlLCAkaHR0cCwgJHJvdXRlUGFyYW1zLCBNZW1iZXJGYWN0b3J5LCBDb21tZW50RmFjdG9yeSkge1xuXG4gICRyb290U2NvcGUudXBkYXRlLnRpbWVvdXQocnVuQ29udHJvbGxlcik7XG5cbiAgZnVuY3Rpb24gcnVuQ29udHJvbGxlcigpe1xuXG4gICAgJHNjb3BlLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgJHNjb3BlLmNvbW1lbnREYXRhID0ge1xuICAgICAgbWFya2Rvd246IFwiXCJcbiAgICB9O1xuXG4gICAgTWVtYmVyRmFjdG9yeS5NZW1iZXIuZ2V0KHtpZDogXCJtZVwifSwgZnVuY3Rpb24gKG1lKSB7XG4gICAgICAkc2NvcGUubWUgPSBtZTtcbiAgICB9KTtcblxuICAgIE1lbWJlckZhY3RvcnkuTWVtYmVyLmdldEFsbChmdW5jdGlvbiAobWVtYmVycykge1xuICAgICAgJHNjb3BlLm1lbWJlcnMgPSBtZW1iZXJzO1xuICAgIH0pO1xuXG4gICAgbG9hZENvbW1lbnRzKCk7XG5cbiAgICBmdW5jdGlvbiBsb2FkQ29tbWVudHMoKSB7XG4gICAgICBpZiAoJHNjb3BlLnRocmVhZC5zcGxpdChcIi1cIilbMV0gPT09IFwiXCIpIHtcbiAgICAgICAgc2V0VGltZW91dChsb2FkQ29tbWVudHMsIDUwMCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHBhZ2VJZCA9ICRzY29wZS50aHJlYWQuc3Vic3RyaW5nKCRzY29wZS50aHJlYWQuaW5kZXhPZihcIi1cIikgKyAxKTtcblxuICAgICAgaWYgKCRzY29wZS50aHJlYWQuaW5kZXhPZihcImNvbXBhbnktXCIpICE9IC0xKSB7XG4gICAgICAgIENvbW1lbnRGYWN0b3J5LkNvbXBhbnkuZ2V0QWxsKHtpZDogcGFnZUlkfSwgZ290Q29tbWVudHMpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoJHNjb3BlLnRocmVhZC5pbmRleE9mKFwic3BlYWtlci1cIikgIT0gLTEpIHtcbiAgICAgICAgQ29tbWVudEZhY3RvcnkuU3BlYWtlci5nZXRBbGwoe2lkOiBwYWdlSWR9LCBnb3RDb21tZW50cyk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICgkc2NvcGUudGhyZWFkLmluZGV4T2YoXCJ0b3BpYy1cIikgIT0gLTEpIHtcbiAgICAgICAgQ29tbWVudEZhY3RvcnkuVG9waWMuZ2V0QWxsKHtpZDogcGFnZUlkfSwgZ290Q29tbWVudHMpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnb3RDb21tZW50cyhjb21tZW50cykge1xuICAgICAgICAkc2NvcGUuY29tbWVudHMgPSBbXTtcbiAgICAgICAgdmFyIGZpcnN0Q29tbWVudCA9IGNvbW1lbnRzLnNvcnQoZnVuY3Rpb24oYSxiKXtcbiAgICAgICAgICByZXR1cm4gbmV3IERhdGUoYS5wb3N0ZWQpIC0gbmV3IERhdGUoYi5wb3N0ZWQpO1xuICAgICAgICB9KVswXTtcblxuICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgICRzY29wZS5wb3N0Q29tbWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICgkc2NvcGUuY29tbWVudERhdGEubWFya2Rvd24gPT09IFwiXCIpe1xuICAgICAgICAkc2NvcGUuZW1wdHlDb21tZW50ID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgZGF0ZSA9IERhdGUubm93KCk7XG4gICAgICBDb21tZW50RmFjdG9yeS5Db21tZW50LmNyZWF0ZSh7XG4gICAgICAgIHRocmVhZDogJHNjb3BlLnRocmVhZCxcbiAgICAgICAgbWVtYmVyOiAkc2NvcGUubWUuaWQsXG4gICAgICAgIG1hcmtkb3duOiAkc2NvcGUuY29tbWVudERhdGEubWFya2Rvd24sXG4gICAgICAgIGh0bWw6ICRzY29wZS5jb252ZXJ0TWFya2Rvd25Ub0h0bWwoJHNjb3BlLmNvbW1lbnREYXRhLm1hcmtkb3duKSxcbiAgICAgICAgcG9zdGVkOiBkYXRlLFxuICAgICAgICB1cGRhdGVkOiBkYXRlXG4gICAgICB9LCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgJHNjb3BlLmNvbW1lbnREYXRhLm1hcmtkb3duID0gXCJcIjtcbiAgICAgICAgbG9hZENvbW1lbnRzKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAkc2NvcGUuc2F2ZUNvbW1lbnQgPSBmdW5jdGlvbiAoY29tbWVudCkge1xuICAgICAgaWYgKGNvbW1lbnQuYnVmZmVyID09PSBcIlwiKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29tbWVudC5tYXJrZG93biA9IGNvbW1lbnQuYnVmZmVyO1xuICAgICAgY29tbWVudC5odG1sID0gJHNjb3BlLmNvbnZlcnRNYXJrZG93blRvSHRtbChjb21tZW50Lm1hcmtkb3duKTtcbiAgICAgIGNvbW1lbnQudXBkYXRlZCA9IERhdGUubm93KCk7XG5cbiAgICAgIENvbW1lbnRGYWN0b3J5LkNvbW1lbnQudXBkYXRlKHtpZDogY29tbWVudC5faWR9LCBjb21tZW50LCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgY29tbWVudC5lZGl0aW5nID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAkc2NvcGUucXVvdGVDb21tZW50ID0gZnVuY3Rpb24gKGNvbW1lbnQpIHtcbiAgICAgICRzY29wZS5jb21tZW50RGF0YS5tYXJrZG93biA9IFwiPiAqKlwiICsgJHNjb3BlLmdldE1lbWJlcihjb21tZW50Lm1lbWJlcikubmFtZSArIFwiIHNhaWQ6KipcXG4+IFwiICsgY29tbWVudC5tYXJrZG93bi5zcGxpdChcIlxcblwiKS5qb2luKFwiXFxuPiBcIikgKyBcIlxcblxcblwiO1xuICAgIH07XG5cbiAgICAkc2NvcGUuZGVsZXRlQ29tbWVudCA9IGZ1bmN0aW9uIChjb21tZW50KSB7XG4gICAgICBpZiAoY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBjb21tZW50P1wiKSkge1xuICAgICAgICBDb21tZW50RmFjdG9yeS5Db21tZW50LmRlbGV0ZSh7aWQ6IGNvbW1lbnQuX2lkfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGxvYWRDb21tZW50cygpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgJHNjb3BlLmdldE1lbWJlciA9IGZ1bmN0aW9uIChtZW1iZXJJZCkge1xuICAgICAgcmV0dXJuICRzY29wZS5tZW1iZXJzLmZpbHRlcihmdW5jdGlvbihvKSB7XG4gICAgICAgIHJldHVybiBvLmlkID09IG1lbWJlcklkO1xuICAgICAgfSlbMF07XG4gICAgfTtcblxuICAgICRzY29wZS5jb252ZXJ0VGV4dFRvSHRtbCA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgIHZhciB1cmxFeHAgPSAvKFxcYihodHRwcz98ZnRwfGZpbGUpOlxcL1xcL1stQS1aMC05KyZAI1xcLyU/PX5ffCE6LC47XSpbLUEtWjAtOSsmQCNcXC8lPX5ffF0pL2lnO1xuICAgICAgdmFyIG1haWxFeHAgPSAvW1xcd1xcLlxcLV0rXFxAKFtcXHdcXC1dK1xcLikrW1xcd117Miw0fSg/IVtePF0qPikvaWc7XG5cbiAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoL1xcbi9nLCAnPGJyPicpLnJlcGxhY2UodXJsRXhwLFwiPGEgaHJlZj0nJDEnPiQxPC9hPlwiKS5yZXBsYWNlKG1haWxFeHAsXCI8YSBocmVmPScjL2NvbXBhbnkvXCIrJHJvdXRlUGFyYW1zLmlkK1wiL2NvbmZpcm0/ZW1haWw9JCYnPiQmPC9hPlwiKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmNvbnZlcnROZXdMaW5lc1RvSHRtbCA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgIHJldHVybiAnPGRpdiBkYXRhLW1hcmtkb3duPicrdGV4dC5yZXBsYWNlKC9cXG4vZywgJzxicj4nKSsnPC9kaXY+JztcbiAgICB9O1xuXG4gICAgJHNjb3BlLmNvbnZlcnRNYXJrZG93blRvSHRtbCA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgIHJldHVybiAnPGRpdiBkYXRhLW1hcmtkb3duPicgKyB0ZXh0ICsgJzwvZGl2Pic7XG4gICAgfTtcblxuICAgICRzY29wZS5jaGVja1Blcm1pc3Npb24gPSBmdW5jdGlvbiAoY29tbWVudCkge1xuICAgICAgaWYoISRzY29wZS5tZS5yb2xlcykgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgICAgdmFyIHJvbGVzID0gJHNjb3BlLm1lLnJvbGVzLmZpbHRlcihmdW5jdGlvbihvKSB7XG4gICAgICAgIHJldHVybiBvLmlkID09ICdkZXZlbG9wbWVudC10ZWFtJyB8fCBvLmlkID09ICdjb29yZGluYXRpb24nO1xuICAgICAgfSk7XG5cbiAgICAgIGlmKHJvbGVzLmxlbmd0aCA9PSAwICYmIGNvbW1lbnQubWVtYmVyICE9ICRzY29wZS5tZS5pZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgICRzY29wZS50aW1lU2luY2UgPWZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICB2YXIgc2Vjb25kcyA9IE1hdGguZmxvb3IoKERhdGUubm93KCkgLSBkYXRlKSAvIDEwMDApO1xuXG4gICAgICB2YXIgc3VmZml4ID0gJ2Fnbyc7XG4gICAgICBpZihzZWNvbmRzIDwgMCl7XG4gICAgICAgIHNlY29uZHMgPSBNYXRoLmFicyhzZWNvbmRzKTtcbiAgICAgICAgc3VmZml4ID0gJ3RvIGdvJztcbiAgICAgIH1cblxuICAgICAgdmFyIGludGVydmFsID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gMzE1MzYwMDApO1xuXG4gICAgICBpZiAoaW50ZXJ2YWwgPiAxKSB7XG4gICAgICAgICAgcmV0dXJuIGludGVydmFsICsgXCIgeWVhcnMgXCIgKyBzdWZmaXg7XG4gICAgICB9XG4gICAgICBpbnRlcnZhbCA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDI1OTIwMDApO1xuICAgICAgaWYgKGludGVydmFsID4gMSkge1xuICAgICAgICAgIHJldHVybiBpbnRlcnZhbCArIFwiIG1vbnRocyBcIiArIHN1ZmZpeDtcbiAgICAgIH1cbiAgICAgIGludGVydmFsID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gODY0MDApO1xuICAgICAgaWYgKGludGVydmFsID4gMSkge1xuICAgICAgICAgIHJldHVybiBpbnRlcnZhbCArIFwiIGRheXMgXCIgKyBzdWZmaXg7XG4gICAgICB9XG4gICAgICBpbnRlcnZhbCA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDM2MDApO1xuICAgICAgaWYgKGludGVydmFsID4gMSkge1xuICAgICAgICAgIHJldHVybiBpbnRlcnZhbCArIFwiIGhvdXJzIFwiICsgc3VmZml4O1xuICAgICAgfVxuICAgICAgaW50ZXJ2YWwgPSBNYXRoLmZsb29yKHNlY29uZHMgLyA2MCk7XG4gICAgICBpZiAoaW50ZXJ2YWwgPiAxKSB7XG4gICAgICAgICAgcmV0dXJuIGludGVydmFsICsgXCIgbWludXRlcyBcIiArIHN1ZmZpeDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNYXRoLmZsb29yKHNlY29uZHMpICsgXCIgc2Vjb25kcyBcIiArIHN1ZmZpeDtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmZvcm1hdERhdGUgPSBmdW5jdGlvbiAodGltZSkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKHRpbWUpLnRvVVRDU3RyaW5nKCk7XG4gICAgfTtcbiAgfVxufSk7XG4iLCJyZXF1aXJlKCcuL2FyZWEuanMnKTtcbnJlcXVpcmUoJy4vZmlyc3QuanMnKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG50aGVUb29sQ29udHJvbGxlci5jb250cm9sbGVyKFwiQ29tbXVuaWNhdGlvbkFyZWFDb250cm9sbGVyXCIsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkc2NvcGUsICRodHRwLCAkcm91dGVQYXJhbXMsIENvbW11bmljYXRpb25GYWN0b3J5KSB7XG5cbiAgJHJvb3RTY29wZS51cGRhdGUudGltZW91dChydW5Db250cm9sbGVyKTtcblxuICBmdW5jdGlvbiBydW5Db250cm9sbGVyKCl7XG5cbiAgICAkc2NvcGUubG9hZGluZyA9IHRydWU7XG5cbiAgICAkc2NvcGUuY29tbXVuaWNhdGlvbkRhdGEgPSB7XG4gICAgICBtYXJrZG93bjogXCJcIlxuICAgIH07XG5cbiAgICAkc2NvcGUubWUgPSBKU09OLnBhcnNlKCRzY29wZS5tZUpzb24pO1xuICAgICRzY29wZS5tZW1iZXJzID0gSlNPTi5wYXJzZSgkc2NvcGUubWVtYmVyc0pzb24pO1xuICAgICRzY29wZS5yb2xlcyA9IEpTT04ucGFyc2UoJHNjb3BlLnJvbGVzSnNvbik7XG5cbiAgICBsb2FkQ29tbXVuaWNhdGlvbnMoKTtcblxuICAgIGZ1bmN0aW9uIGxvYWRDb21tdW5pY2F0aW9ucygpIHtcbiAgICAgICRzY29wZS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgaWYgKCRzY29wZS50aHJlYWQuc3BsaXQoXCItXCIpWzFdID09PSBcIlwiKSB7XG4gICAgICAgIHNldFRpbWVvdXQobG9hZENvbW11bmljYXRpb25zLCA1MDApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBwYWdlSWQgPSAkc2NvcGUudGhyZWFkLnN1YnN0cmluZygkc2NvcGUudGhyZWFkLmluZGV4T2YoXCItXCIpICsgMSk7XG5cbiAgICAgIGlmICgkc2NvcGUudGhyZWFkLmluZGV4T2YoXCJjb21wYW55LVwiKSAhPSAtMSkge1xuICAgICAgICBDb21tdW5pY2F0aW9uRmFjdG9yeS5Db21wYW55LmdldEFsbCgge2lkOiBwYWdlSWR9LCBnb3RDb21tdW5pY2F0aW9ucyk7XG4gICAgICAgICRzY29wZS5raW5kcz1bJ0VtYWlsIFRvJywgJ0VtYWlsIEZyb20nLCAnTWVldGluZycsICdQaG9uZSBDYWxsJ107XG4gICAgICB9XG4gICAgICBlbHNlIGlmICgkc2NvcGUudGhyZWFkLmluZGV4T2YoXCJzcGVha2VyLVwiKSAhPSAtMSkge1xuICAgICAgICBDb21tdW5pY2F0aW9uRmFjdG9yeS5TcGVha2VyLmdldEFsbCgge2lkOiBwYWdlSWR9LCBnb3RDb21tdW5pY2F0aW9ucyk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGdvdENvbW11bmljYXRpb25zKGNvbW11bmljYXRpb25zKSB7XG4gICAgICAgICRzY29wZS5jb21tdW5pY2F0aW9ucyA9IGNvbW11bmljYXRpb25zO1xuXG4gICAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKCRzY29wZS50aHJlYWQuaW5kZXhPZihcInNwZWFrZXItXCIpICE9IC0xKSB7XG4gICAgICAgICAgaWYoY29tbXVuaWNhdGlvbnMuZmlsdGVyKGZ1bmN0aW9uKG8pIHtcbiAgICAgICAgICAgIHJldHVybiBvLmtpbmQuaW5kZXhPZignUGFyYWdyYXBoJykgIT0gLTE7XG4gICAgICAgICAgfSkubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICAgICRzY29wZS5raW5kcz1bJ0VtYWlsIFRvJywgJ0VtYWlsIEZyb20nLCAnTWVldGluZycsICdQaG9uZSBDYWxsJ107XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRzY29wZS5raW5kcz1bJ0luaXRhbCBFbWFpbCBQYXJhZ3JhcGgnLCdFbWFpbCBUbycsICdFbWFpbCBGcm9tJywgJ01lZXRpbmcnLCAnUGhvbmUgQ2FsbCddO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgICRzY29wZS5wb3N0Q29tbXVuaWNhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghJHNjb3BlLmNvbW11bmljYXRpb25EYXRhLmtpbmQgfHwgJHNjb3BlLmNvbW11bmljYXRpb25EYXRhLmtpbmQ9PSBcIlwiKXtcbiAgICAgICAgJHNjb3BlLmVtcHR5Q29tbXVuaWNhdGlvbiA9IHRydWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICghJHNjb3BlLmNvbW11bmljYXRpb25EYXRhLnRleHQgfHwgJHNjb3BlLmNvbW11bmljYXRpb25EYXRhLnRleHQ9PSBcIlwiKXtcbiAgICAgICAgJHNjb3BlLmVtcHR5Q29tbXVuaWNhdGlvbiA9IHRydWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGRhdGUgPSBEYXRlLm5vdygpO1xuXG4gICAgICAvL2NvbnNvbGUubG9nKCRzY29wZS5ldmVudCk7XG5cbiAgICAgIENvbW11bmljYXRpb25GYWN0b3J5LkNvbW11bmljYXRpb24uY3JlYXRlKHtcbiAgICAgICAgdGhyZWFkOiAkc2NvcGUudGhyZWFkLFxuICAgICAgICBtZW1iZXI6ICRzY29wZS5tZS5pZCxcbiAgICAgICAga2luZDogJHNjb3BlLmNvbW11bmljYXRpb25EYXRhLmtpbmQsXG4gICAgICAgIHRleHQ6ICRzY29wZS5jb21tdW5pY2F0aW9uRGF0YS50ZXh0LFxuICAgICAgICBldmVudDogJHNjb3BlLmV2ZW50LmlkLFxuICAgICAgICBwb3N0ZWQ6IGRhdGUsXG4gICAgICAgIHVwZGF0ZWQ6IGRhdGVcbiAgICAgIH0sIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAkc2NvcGUuY29tbXVuaWNhdGlvbkRhdGEudGV4dCA9IFwiXCI7XG4gICAgICAgICRzY29wZS5jb21tdW5pY2F0aW9uRGF0YS5raW5kID0gXCJcIjtcbiAgICAgICAgJHNjb3BlLmNvbW11bmljYXRpb25Gb3JtLiRzZXRQcmlzdGluZSgpO1xuICAgICAgICBsb2FkQ29tbXVuaWNhdGlvbnMoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgICRzY29wZS5zYXZlQ29tbXVuaWNhdGlvbiA9IGZ1bmN0aW9uIChjb21tdW5pY2F0aW9uKSB7XG4gICAgICBpZiAoY29tbXVuaWNhdGlvbi5idWZmZXIgPT09IFwiXCIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb21tdW5pY2F0aW9uLnRleHQgPSBjb21tdW5pY2F0aW9uLmJ1ZmZlcjtcbiAgICAgIGNvbW11bmljYXRpb24udXBkYXRlZCA9IERhdGUubm93KCk7XG5cbiAgICAgIENvbW11bmljYXRpb25GYWN0b3J5LkNvbW11bmljYXRpb24udXBkYXRlKHtpZDogY29tbXVuaWNhdGlvbi5faWR9LCBjb21tdW5pY2F0aW9uLCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgY29tbXVuaWNhdGlvbi5lZGl0aW5nID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAkc2NvcGUuZGVsZXRlQ29tbXVuaWNhdGlvbiA9IGZ1bmN0aW9uIChjb21tdW5pY2F0aW9uKSB7XG4gICAgICBDb21tdW5pY2F0aW9uRmFjdG9yeS5Db21tdW5pY2F0aW9uLmRlbGV0ZSh7aWQ6IGNvbW11bmljYXRpb24uX2lkfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICBsb2FkQ29tbXVuaWNhdGlvbnMoKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAkc2NvcGUuYXBwcm92ZUNvbW11bmljYXRpb24gPSBmdW5jdGlvbiAoY29tbXVuaWNhdGlvbikge1xuICAgICAgQ29tbXVuaWNhdGlvbkZhY3RvcnkuQ29tbXVuaWNhdGlvbi5hcHByb3ZlKHtpZDogY29tbXVuaWNhdGlvbi5faWR9LCBudWxsLCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgbG9hZENvbW11bmljYXRpb25zKCk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmdldE1lbWJlciA9IGZ1bmN0aW9uIChtZW1iZXJJZCkge1xuICAgICAgcmV0dXJuICRzY29wZS5tZW1iZXJzLmZpbHRlcihmdW5jdGlvbihvKSB7XG4gICAgICAgIHJldHVybiBvLmlkID09IG1lbWJlcklkO1xuICAgICAgfSlbMF07XG4gICAgfTtcblxuICAgICRzY29wZS5jaGVja1Blcm1pc3Npb24gPSBmdW5jdGlvbiAoY29tbXVuaWNhdGlvbikge1xuICAgICAgdmFyIHJvbGVzID0gJHNjb3BlLm1lLnJvbGVzLmZpbHRlcihmdW5jdGlvbihvKSB7XG4gICAgICAgIHJldHVybiBvLmlkID09ICdkZXZlbG9wbWVudC10ZWFtJyB8fCBvLmlkID09ICdjb29yZGluYXRpb24nO1xuICAgICAgfSk7XG5cbiAgICAgIGlmKHJvbGVzLmxlbmd0aCA9PSAwICYmIGNvbW11bmljYXRpb24ubWVtYmVyICE9ICRzY29wZS5tZS5pZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgICRzY29wZS50aW1lU2luY2UgPWZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICB2YXIgc2Vjb25kcyA9IE1hdGguZmxvb3IoKERhdGUubm93KCkgLSBkYXRlKSAvIDEwMDApO1xuXG4gICAgICB2YXIgc3VmZml4ID0gJ2Fnbyc7XG4gICAgICBpZihzZWNvbmRzIDwgMCl7XG4gICAgICAgIHNlY29uZHMgPSBNYXRoLmFicyhzZWNvbmRzKTtcbiAgICAgICAgc3VmZml4ID0gJ3RvIGdvJztcbiAgICAgIH1cblxuICAgICAgdmFyIGludGVydmFsID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gMzE1MzYwMDApO1xuXG4gICAgICBpZiAoaW50ZXJ2YWwgPiAxKSB7XG4gICAgICAgICAgcmV0dXJuIGludGVydmFsICsgXCIgeWVhcnMgXCIgKyBzdWZmaXg7XG4gICAgICB9XG4gICAgICBpbnRlcnZhbCA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDI1OTIwMDApO1xuICAgICAgaWYgKGludGVydmFsID4gMSkge1xuICAgICAgICAgIHJldHVybiBpbnRlcnZhbCArIFwiIG1vbnRocyBcIiArIHN1ZmZpeDtcbiAgICAgIH1cbiAgICAgIGludGVydmFsID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gODY0MDApO1xuICAgICAgaWYgKGludGVydmFsID4gMSkge1xuICAgICAgICAgIHJldHVybiBpbnRlcnZhbCArIFwiIGRheXMgXCIgKyBzdWZmaXg7XG4gICAgICB9XG4gICAgICBpbnRlcnZhbCA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDM2MDApO1xuICAgICAgaWYgKGludGVydmFsID4gMSkge1xuICAgICAgICAgIHJldHVybiBpbnRlcnZhbCArIFwiIGhvdXJzIFwiICsgc3VmZml4O1xuICAgICAgfVxuICAgICAgaW50ZXJ2YWwgPSBNYXRoLmZsb29yKHNlY29uZHMgLyA2MCk7XG4gICAgICBpZiAoaW50ZXJ2YWwgPiAxKSB7XG4gICAgICAgICAgcmV0dXJuIGludGVydmFsICsgXCIgbWludXRlcyBcIiArIHN1ZmZpeDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNYXRoLmZsb29yKHNlY29uZHMpICsgXCIgc2Vjb25kcyBcIiArIHN1ZmZpeDtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmNvbnZlcnRVUkxzID0gZnVuY3Rpb24odGV4dCkge1xuICAgICAgdmFyIHVybEV4cCA9IC8oXFxiKGh0dHBzP3xmdHB8ZmlsZSk6XFwvXFwvWy1BLVowLTkrJkAjXFwvJT89fl98ITosLjtdKlstQS1aMC05KyZAI1xcLyU9fl98XSkvaWc7XG5cbiAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoL1xcbi9nLCAnPGJyPicpLnJlcGxhY2UodXJsRXhwLFwiPGEgaHJlZj0nJDEnPiQxPC9hPlwiKTtcbiAgICB9XG4gIH1cblxufSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudGhlVG9vbENvbnRyb2xsZXIuY29udHJvbGxlcihcIkNvbW11bmljYXRpb25FbWJlZENvbnRyb2xsZXJcIiwgZnVuY3Rpb24gKCRyb290U2NvcGUsICRzY29wZSwgQ29tbXVuaWNhdGlvbkZhY3RvcnkpIHtcblxuICAkcm9vdFNjb3BlLnVwZGF0ZS50aW1lb3V0KHJ1bkNvbnRyb2xsZXIpO1xuXG4gIGZ1bmN0aW9uIHJ1bkNvbnRyb2xsZXIoKXtcblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1JTklUSUFMSVpBVElPTj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAkc2NvcGUuc3VjY2VzcyAgICAgPSBcIlwiO1xuICAgICRzY29wZS5lcnJvciAgICAgICA9IFwiXCI7XG5cbiAgICAkc2NvcGUuY29tbXVuaWNhdGlvbi5lZGl0aW5nID0gZmFsc2U7XG4gICAgJHNjb3BlLmNvbW11bmljYXRpb24uZGVsZXRlZCA9IGZhbHNlO1xuXG5cbiAgICAkc2NvcGUuc2F2ZUNvbW11bmljYXRpb24gPSBmdW5jdGlvbiAoY29tbXVuaWNhdGlvbikge1xuICAgICAgaWYgKGNvbW11bmljYXRpb24uYnVmZmVyID09PSBcIlwiKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29tbXVuaWNhdGlvbi50ZXh0ID0gY29tbXVuaWNhdGlvbi5idWZmZXI7XG4gICAgICBjb21tdW5pY2F0aW9uLnVwZGF0ZWQgPSBEYXRlLm5vdygpO1xuXG4gICAgICBDb21tdW5pY2F0aW9uRmFjdG9yeS5Db21tdW5pY2F0aW9uLnVwZGF0ZSh7aWQ6IGNvbW11bmljYXRpb24uX2lkfSwgY29tbXVuaWNhdGlvbiwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGNvbW11bmljYXRpb24uZWRpdGluZyA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgJHNjb3BlLmRlbGV0ZUNvbW11bmljYXRpb24gPSBmdW5jdGlvbiAoY29tbXVuaWNhdGlvbikge1xuICAgICAgQ29tbXVuaWNhdGlvbkZhY3RvcnkuQ29tbXVuaWNhdGlvbi5kZWxldGUoe2lkOiBjb21tdW5pY2F0aW9uLl9pZH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJHNjb3BlLmNvbW11bmljYXRpb24uZGVsZXRlZCA9IHRydWU7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnNldENvbW11bmljYXRpb25TdGF0dXMgPSBmdW5jdGlvbiAoY29tbXVuaWNhdGlvbiwgc3RhdHVzKSB7XG4gICAgICBDb21tdW5pY2F0aW9uRmFjdG9yeS5Db21tdW5pY2F0aW9uLnVwZGF0ZSh7aWQ6IGNvbW11bmljYXRpb24uX2lkfSwge3N0YXR1czogc3RhdHVzfSwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICRzY29wZS5jb21tdW5pY2F0aW9uLnN0YXR1cyA9IHN0YXR1cztcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAkc2NvcGUuZ2V0TWVtYmVyID0gZnVuY3Rpb24gKG1lbWJlcklkKSB7XG4gICAgICByZXR1cm4gJHNjb3BlLm1lbWJlcnMuZmlsdGVyKGZ1bmN0aW9uKG8pIHtcbiAgICAgICAgcmV0dXJuIG8uaWQgPT0gbWVtYmVySWQ7XG4gICAgICB9KVswXTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmNoZWNrUGVybWlzc2lvbiA9IGZ1bmN0aW9uIChjb21tdW5pY2F0aW9uKSB7XG4gICAgICB2YXIgcm9sZXMgPSAkc2NvcGUubWUucm9sZXMuZmlsdGVyKGZ1bmN0aW9uKG8pIHtcbiAgICAgICAgcmV0dXJuIG8uaWQgPT0gJ2RldmVsb3BtZW50LXRlYW0nIHx8IG8uaWQgPT0gJ2Nvb3JkaW5hdGlvbic7XG4gICAgICB9KTtcblxuICAgICAgaWYocm9sZXMubGVuZ3RoID09IDAgJiYgY29tbXVuaWNhdGlvbi5tZW1iZXIgIT0gJHNjb3BlLm1lLmlkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgJHNjb3BlLnRpbWVTaW5jZSA9ZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgIHZhciBzZWNvbmRzID0gTWF0aC5mbG9vcigoRGF0ZS5ub3coKSAtIGRhdGUpIC8gMTAwMCk7XG5cbiAgICAgIHZhciBzdWZmaXggPSAnYWdvJztcbiAgICAgIGlmKHNlY29uZHMgPCAwKXtcbiAgICAgICAgc2Vjb25kcyA9IE1hdGguYWJzKHNlY29uZHMpO1xuICAgICAgICBzdWZmaXggPSAndG8gZ28nO1xuICAgICAgfVxuXG4gICAgICB2YXIgaW50ZXJ2YWwgPSBNYXRoLmZsb29yKHNlY29uZHMgLyAzMTUzNjAwMCk7XG5cbiAgICAgIGlmIChpbnRlcnZhbCA+IDEpIHtcbiAgICAgICAgICByZXR1cm4gaW50ZXJ2YWwgKyBcIiB5ZWFycyBcIiArIHN1ZmZpeDtcbiAgICAgIH1cbiAgICAgIGludGVydmFsID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gMjU5MjAwMCk7XG4gICAgICBpZiAoaW50ZXJ2YWwgPiAxKSB7XG4gICAgICAgICAgcmV0dXJuIGludGVydmFsICsgXCIgbW9udGhzIFwiICsgc3VmZml4O1xuICAgICAgfVxuICAgICAgaW50ZXJ2YWwgPSBNYXRoLmZsb29yKHNlY29uZHMgLyA4NjQwMCk7XG4gICAgICBpZiAoaW50ZXJ2YWwgPiAxKSB7XG4gICAgICAgICAgcmV0dXJuIGludGVydmFsICsgXCIgZGF5cyBcIiArIHN1ZmZpeDtcbiAgICAgIH1cbiAgICAgIGludGVydmFsID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gMzYwMCk7XG4gICAgICBpZiAoaW50ZXJ2YWwgPiAxKSB7XG4gICAgICAgICAgcmV0dXJuIGludGVydmFsICsgXCIgaG91cnMgXCIgKyBzdWZmaXg7XG4gICAgICB9XG4gICAgICBpbnRlcnZhbCA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDYwKTtcbiAgICAgIGlmIChpbnRlcnZhbCA+IDEpIHtcbiAgICAgICAgICByZXR1cm4gaW50ZXJ2YWwgKyBcIiBtaW51dGVzIFwiICsgc3VmZml4O1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1hdGguZmxvb3Ioc2Vjb25kcykgKyBcIiBzZWNvbmRzIFwiICsgc3VmZml4O1xuICAgIH07XG5cbiAgICAkc2NvcGUuZm9ybWF0RGF0ZSA9IGZ1bmN0aW9uICh0aW1lKSB7XG4gICAgICByZXR1cm4gbmV3IERhdGUodGltZSkudG9VVENTdHJpbmcoKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmNvbnZlcnRVUkxzID0gZnVuY3Rpb24odGV4dCkge1xuICAgICAgdmFyIHVybEV4cCA9IC8oXFxiKGh0dHBzP3xmdHB8ZmlsZSk6XFwvXFwvWy1BLVowLTkrJkAjXFwvJT89fl98ITosLjtdKlstQS1aMC05KyZAI1xcLyU9fl98XSkvaWc7XG5cbiAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoL1xcbi9nLCAnPGJyPicpLnJlcGxhY2UodXJsRXhwLFwiPGEgaHJlZj0nJDEnPiQxPC9hPlwiKTtcbiAgICB9XG4gIH1cbn0pO1xuIiwicmVxdWlyZSgnLi9hcmVhLmpzJyk7XG5yZXF1aXJlKCcuL2xpc3QuanMnKTtcbnJlcXVpcmUoJy4vZW1iZWQuanMnKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudGhlVG9vbENvbnRyb2xsZXJcbiAgLmNvbnRyb2xsZXIoJ0NvbW11bmljYXRpb25zQ29udHJvbGxlcicsIGZ1bmN0aW9uICgkcm91dGVQYXJhbXMsICRyb290U2NvcGUsICRzY29wZSwgJGh0dHAsIENvbW11bmljYXRpb25GYWN0b3J5KSB7XG4gICAgJHJvb3RTY29wZS51cGRhdGUudGltZW91dChydW5Db250cm9sbGVyKTtcblxuICAgIGZ1bmN0aW9uIHJ1bkNvbnRyb2xsZXIoKXtcbiAgICAgIFxuICAgICAgJHNjb3BlLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICBDb21tdW5pY2F0aW9uRmFjdG9yeS5Db21tdW5pY2F0aW9uLmdldEFsbChmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAkc2NvcGUuY29tbXVuaWNhdGlvbnMgPSByZXNwb25zZTtcbiAgICAgIH0pO1xuXG4gICAgICAkc2NvcGUuc2hvd09wZW4gPSB0cnVlO1xuXG4gICAgICAkc2NvcGUuc2hvd25Db21tdW5pY2F0aW9ucyA9IGZ1bmN0aW9uIChzaG93T3Blbikge1xuICAgICAgICByZXR1cm4gJHNjb3BlLmNvbW11bmljYXRpb25zLmZpbHRlcihmdW5jdGlvbihvKSB7XG4gICAgICAgICAgcmV0dXJuIChzaG93T3BlbiA/ICEoby5zdGF0dXM9PSdhcHByb3ZlZCcpIDogby5zdGF0dXM9PSdhcHByb3ZlZCcpICYmICRyb3V0ZVBhcmFtcy5raW5kID09IG8udGhyZWFkLnNwbGl0KCctJylbMF07XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9XG4gIH0pO1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbnRoZVRvb2xDb250cm9sbGVyXG4gIC5jb250cm9sbGVyKCdDb21wYW55Q29udHJvbGxlcicsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkc2NvcGUsICRodHRwLCAkbG9jYXRpb24sICRyb3V0ZVBhcmFtcywgJHNjZSwgQ29tcGFueUZhY3RvcnksIE1lbWJlckZhY3RvcnksIE5vdGlmaWNhdGlvbkZhY3RvcnkpIHtcblxuICAgICRyb290U2NvcGUudXBkYXRlLnRpbWVvdXQocnVuQ29udHJvbGxlcik7XG5cbiAgICBmdW5jdGlvbiBydW5Db250cm9sbGVyKCl7XG5cbiAgICAgICRzY29wZS50cnVzdFNyYyA9IGZ1bmN0aW9uKHNyYykge1xuICAgICAgICByZXR1cm4gJHNjZS50cnVzdEFzUmVzb3VyY2VVcmwoc3JjKycjcGFnZS1ib2R5Jyk7XG4gICAgICB9XG5cbiAgICAgICRzY29wZS5jb252ZXJ0RW1haWxzID0gZnVuY3Rpb24odGV4dCkge1xuICAgICAgICB2YXIgbWFpbEV4cCA9IC9bXFx3XFwuXFwtXStcXEAoW1xcd1xcLV0rXFwuKStbXFx3XXsyLDR9KD8hW148XSo+KS9pZztcbiAgICAgICAgdmFyIHR3aXR0ZXJFeHAgPSAvKF58W15AXFx3XSlAKFxcd3sxLDE1fSlcXGIvZztcbiAgICAgICAgcmV0dXJuIHRleHQucmVwbGFjZShtYWlsRXhwLFwiPGEgaHJlZj0nIy9jb21wYW55L1wiKyRyb3V0ZVBhcmFtcy5pZCtcIi9jb25maXJtP2VtYWlsPSQmJz4kJjwvYT5cIikucmVwbGFjZSh0d2l0dGVyRXhwLFwiJDE8YSBocmVmPSdodHRwOi8vdHdpdHRlci5jb20vJDInIHRhcmdldD0nX2JsYW5rJz4kMjwvYT5cIilcbiAgICAgIH1cblxuICAgICAgJHNjb3BlLnN1Ym1pdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY29tcGFueURhdGEgPSB0aGlzLmZvcm1EYXRhO1xuXG4gICAgICAgIENvbXBhbnlGYWN0b3J5LkNvbXBhbnkudXBkYXRlKHsgaWQ6Y29tcGFueURhdGEuaWQgfSwgY29tcGFueURhdGEsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgaWYocmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgICAgICRzY29wZS5lcnJvciA9IHJlc3BvbnNlLmVycm9yO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkc2NvcGUubWVzc2FnZSA9IHJlc3BvbnNlLnN1Y2Nlc3M7XG4gICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnY29tcGFueS8nK2NvbXBhbnlEYXRhLmlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgJHNjb3BlLmRlbGV0ZUNvbXBhbnkgPSBmdW5jdGlvbihjb21wYW55KSB7XG4gICAgICAgIENvbXBhbnlGYWN0b3J5LkNvbXBhbnkuZGVsZXRlKHsgaWQ6Y29tcGFueS5pZCB9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgIGlmKHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgICAkc2NvcGUuZXJyb3IgPSByZXNwb25zZS5lcnJvcjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSByZXNwb25zZS5zdWNjZXNzO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnY29tcGFuaWVzLycpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgICRzY29wZS5jaGVja1Blcm1pc3Npb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByb2xlcyA9ICRzY29wZS5tZS5yb2xlcy5maWx0ZXIoZnVuY3Rpb24obykge1xuICAgICAgICAgIHJldHVybiBvLmlkID09ICdkZXZlbG9wbWVudC10ZWFtJyB8fCBvLmlkID09ICdjb29yZGluYXRpb24nO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZihyb2xlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG5cbiAgICAgICRzY29wZS5zdGF0dXNlcyA9IFsnU3VnZ2VzdGlvbicsJ0NvbnRhY3RlZCcsJ0luIENvbnZlcnNhdGlvbnMnLCdJbiBOZWdvdGlhdGlvbnMnLCdDbG9zZWQgRGVhbCcsJ1JlamVjdGVkJywnR2l2ZSBVcCddO1xuICAgICAgJHNjb3BlLmxvZ29TaXplcyA9IFtudWxsLCAnUycsJ00nLCdMJ107XG4gICAgICAkc2NvcGUuc3RhbmREYXlzID0gW251bGwsIDEsMiwzLDQsNV07XG4gICAgICAkc2NvcGUucG9zdHNOdW1iZXJzID0gW251bGwsIDEsMiwzLDQsNV07XG5cbiAgICAgICRzY29wZS5jb21wYW55ID0gJHNjb3BlLmZvcm1EYXRhID0gJHNjb3BlLmdldENvbXBhbnkoJHJvdXRlUGFyYW1zLmlkKTtcblxuICAgICAgQ29tcGFueUZhY3RvcnkuQ29tcGFueS5nZXQoe2lkOiAkcm91dGVQYXJhbXMuaWR9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAkc2NvcGUuY29tcGFueSA9ICRzY29wZS5mb3JtRGF0YSA9IHJlc3BvbnNlO1xuXG4gICAgICAgIE5vdGlmaWNhdGlvbkZhY3RvcnkuQ29tcGFueS5nZXRBbGwoe2lkOiAkcm91dGVQYXJhbXMuaWR9LCBmdW5jdGlvbihnZXREYXRhKSB7XG4gICAgICAgICAgJHNjb3BlLmNvbXBhbnlOb3RpZmljYXRpb25zID0gZ2V0RGF0YTtcblxuICAgICAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbiIsIid1c2Ugc3RyaWN0JztcblxudGhlVG9vbENvbnRyb2xsZXJcbiAgLmNvbnRyb2xsZXIoJ0NvbXBhbnlFbWFpbENvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHNjb3BlLCAkaHR0cCwgJHJvdXRlUGFyYW1zLCAkc2NlLCAkbG9jYXRpb24sIEVtYWlsRmFjdG9yeSkge1xuICAgICRyb290U2NvcGUudXBkYXRlLnRpbWVvdXQocnVuQ29udHJvbGxlcik7XG5cbiAgICBmdW5jdGlvbiBydW5Db250cm9sbGVyKCl7XG5cbiAgICAgICRzY29wZS5lbWFpbCA9ICRsb2NhdGlvbi5zZWFyY2goKS5lbWFpbDtcbiAgICAgICRzY29wZS5jb21wYW55SWQgPSAkcm91dGVQYXJhbXMuaWQ7XG4gICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgJHNjb3BlLmVycm9yID0gbnVsbDtcbiAgICAgICRzY29wZS5tZXNzYWdlID0gbnVsbDtcblxuICAgICAgJHNjb3BlLnN1Ym1pdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUubG9hZGluZyA9IHRydWU7XG4gICAgICAgICRzY29wZS5lcnJvciA9IG51bGw7XG4gICAgICAgICRzY29wZS5tZXNzYWdlID0gbnVsbDtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKFwic2VuZCBlbWFpbCB0byBcIiwgJHNjb3BlLmVtYWlsLCBcIiBmcm9tIFwiLCAkc2NvcGUuY29tcGFueUlkKTtcblxuICAgICAgICBFbWFpbEZhY3RvcnkuQ29tcGFueS5zZW5kKHsgaWQ6ICRzY29wZS5jb21wYW55SWQgfSwgeyBlbWFpbDogJHNjb3BlLmVtYWlsIH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICBpZihyZXNwb25zZS5lcnJvcikge1xuICAgICAgICAgICAgJHNjb3BlLmVycm9yID0gcmVzcG9uc2UuZXJyb3I7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRzY29wZS5tZXNzYWdlID0gcmVzcG9uc2UubWVzc2FnZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9XG4gIH0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuIFxudGhlVG9vbENvbnRyb2xsZXJcbiAgLmNvbnRyb2xsZXIoJ0NyZWF0ZUNvbXBhbnlDb250cm9sbGVyJywgZnVuY3Rpb24gKCRyb290U2NvcGUsICRzY29wZSwgJGh0dHAsICRyb3V0ZVBhcmFtcywgJGxvY2F0aW9uLCBDb21wYW55RmFjdG9yeSkge1xuICAgICRyb290U2NvcGUudXBkYXRlLnRpbWVvdXQocnVuQ29udHJvbGxlcik7XG5cbiAgICBmdW5jdGlvbiBydW5Db250cm9sbGVyKCl7XG4gICAgICBcbiAgICAgICRzY29wZS5zdWJtaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNvbXBhbnlEYXRhID0gdGhpcy5mb3JtRGF0YTtcblxuICAgICAgICBDb21wYW55RmFjdG9yeS5Db21wYW55LmNyZWF0ZShjb21wYW55RGF0YSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICBpZihyZXNwb25zZS5lcnJvcikge1xuICAgICAgICAgICAgJHNjb3BlLmVycm9yID0gcmVzcG9uc2UuZXJyb3I7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRzY29wZS5tZXNzYWdlID0gcmVzcG9uc2UubWVzc2FnZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgQ29tcGFueUZhY3RvcnkuQ29tcGFueS5nZXRBbGwoZnVuY3Rpb24gKGNvbXBhbmllcykge1xuICAgICAgICAgICAgICAkc2NvcGUuY29tcGFuaWVzID0gY29tcGFuaWVzO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKFwiL2NvbXBhbnkvXCIgKyByZXNwb25zZS5pZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgICRzY29wZS5zdGF0dXNlcyA9IFsnU3VnZ2VzdGlvbicsJ0NvbnRhY3RlZCcsJ0luIENvbnZlcnNhdGlvbnMnLCdJbiBOZWdvdGlhdGlvbnMnLCdDbG9zZWQgRGVhbCcsJ1JlamVjdGVkJywnR2l2ZSBVcCddO1xuICAgIH1cbiAgfSk7IiwiJ3VzZSBzdHJpY3QnO1xuXG50aGVUb29sQ29udHJvbGxlci5jb250cm9sbGVyKCdDb21wYW55RW1iZWRDb250cm9sbGVyJywgZnVuY3Rpb24gKCRyb290U2NvcGUsICRzY29wZSkge1xuXG4gICRyb290U2NvcGUudXBkYXRlLnRpbWVvdXQocnVuQ29udHJvbGxlcik7XG5cbiAgZnVuY3Rpb24gcnVuQ29udHJvbGxlcigpe1xuXG4gICAgaWYoJHNjb3BlLmNvbW1lbnRzKSB7XG4gICAgICAkc2NvcGUuY29tcGFueS5jb21tZW50cyA9ICRzY29wZS5jb21tZW50cy5maWx0ZXIoZnVuY3Rpb24oZSkge1xuICAgICAgICByZXR1cm4gZS50aHJlYWQgPT0gJ2NvbXBhbnktJyskc2NvcGUuY29tcGFueS5pZDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmKCRzY29wZS5ldmVudCkge1xuICAgICAgJHNjb3BlLnBhcnRpY2lwYXRpb24gPSAkc2NvcGUuY29tcGFueS5wYXJ0aWNpcGF0aW9ucy5maWx0ZXIoZnVuY3Rpb24obykge1xuICAgICAgICByZXR1cm4gby5ldmVudCA9PSAkc2NvcGUuZXZlbnQuaWQ7XG4gICAgICB9KVswXTtcbiAgICB9XG5cbiAgICAkc2NvcGUuZ2V0TWVtYmVyID0gZnVuY3Rpb24gKG1lbWJlcklkKSB7XG4gICAgICB2YXIgbWVtYmVyID0gJHNjb3BlLm1lbWJlcnMuZmlsdGVyKGZ1bmN0aW9uKG8pIHtcbiAgICAgICAgcmV0dXJuIG8uaWQgPT0gbWVtYmVySWQ7XG4gICAgICB9KTtcblxuICAgICAgaWYobWVtYmVyLmxlbmd0aD4wKSB7XG4gICAgICAgIHJldHVybiBtZW1iZXJbMF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG5hbWU6ICdObyBvbmUnLFxuICAgICAgICAgIGZhY2Vib29rOiAnMTAwMDAwNDU2MzM1OTcyJ1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG5cbiAgICAkc2NvcGUuZ2V0VW5yZWFkTm90aWZpY2F0aW9ucyA9IGZ1bmN0aW9uICh0aHJlYWQpIHtcbiAgICAgIHZhciBub3RpZmljYXRpb25zID0gJHNjb3BlLm5vdGlmaWNhdGlvbnMuZmlsdGVyKGZ1bmN0aW9uKG8pIHtcbiAgICAgICAgcmV0dXJuIG8udGhyZWFkID09IHRocmVhZDtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5vdGlmaWNhdGlvbnM7XG4gICAgfTtcblxuICAgICRzY29wZS5jb21wYW55LnVucmVhZCA9ICRzY29wZS5nZXRVbnJlYWROb3RpZmljYXRpb25zKCdjb21wYW55LScgKyAkc2NvcGUuY29tcGFueS5pZCkubGVuZ3RoID4gMDtcblxuICAgICRzY29wZS50aW1lU2luY2UgPWZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICB2YXIgc2Vjb25kcyA9IE1hdGguZmxvb3IoKERhdGUubm93KCkgLSBkYXRlKSAvIDEwMDApO1xuXG4gICAgICB2YXIgc3VmZml4ID0gJ2Fnbyc7XG4gICAgICBpZihzZWNvbmRzIDwgMCl7XG4gICAgICAgIHNlY29uZHMgPSBNYXRoLmFicyhzZWNvbmRzKTtcbiAgICAgICAgc3VmZml4ID0gJ3RvIGdvJztcbiAgICAgIH1cblxuICAgICAgdmFyIGludGVydmFsID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gMzE1MzYwMDApO1xuXG4gICAgICBpZiAoaW50ZXJ2YWwgPiAxKSB7XG4gICAgICAgICAgcmV0dXJuIGludGVydmFsICsgJyB5ZWFycyAnICsgc3VmZml4O1xuICAgICAgfVxuICAgICAgaW50ZXJ2YWwgPSBNYXRoLmZsb29yKHNlY29uZHMgLyAyNTkyMDAwKTtcbiAgICAgIGlmIChpbnRlcnZhbCA+IDEpIHtcbiAgICAgICAgICByZXR1cm4gaW50ZXJ2YWwgKyAnIG1vbnRocyAnICsgc3VmZml4O1xuICAgICAgfVxuICAgICAgaW50ZXJ2YWwgPSBNYXRoLmZsb29yKHNlY29uZHMgLyA4NjQwMCk7XG4gICAgICBpZiAoaW50ZXJ2YWwgPiAxKSB7XG4gICAgICAgICAgcmV0dXJuIGludGVydmFsICsgJyBkYXlzICcgKyBzdWZmaXg7XG4gICAgICB9XG4gICAgICBpbnRlcnZhbCA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDM2MDApO1xuICAgICAgaWYgKGludGVydmFsID4gMSkge1xuICAgICAgICAgIHJldHVybiBpbnRlcnZhbCArICcgaG91cnMgJyArIHN1ZmZpeDtcbiAgICAgIH1cbiAgICAgIGludGVydmFsID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gNjApO1xuICAgICAgaWYgKGludGVydmFsID4gMSkge1xuICAgICAgICAgIHJldHVybiBpbnRlcnZhbCArICcgbWludXRlcyAnICsgc3VmZml4O1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1hdGguZmxvb3Ioc2Vjb25kcykgKyAnIHNlY29uZHMgJyArIHN1ZmZpeDtcbiAgICB9O1xuICB9XG59KTtcbiIsInJlcXVpcmUoJy4vY29tcGFueS5qcycpO1xucmVxdWlyZSgnLi9saXN0LmpzJyk7XG5yZXF1aXJlKCcuL2NyZWF0ZS5qcycpO1xucmVxdWlyZSgnLi9jb25maXJtLmpzJyk7XG5yZXF1aXJlKCcuL2VtYmVkLmpzJyk7IiwiJ3VzZSBzdHJpY3QnO1xuXG50aGVUb29sQ29udHJvbGxlclxuICAuY29udHJvbGxlcignQ29tcGFuaWVzQ29udHJvbGxlcicsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkc2NvcGUsICRodHRwLCAkc2NlLCBDb21wYW55RmFjdG9yeSkge1xuXG4gICAgJHJvb3RTY29wZS51cGRhdGUudGltZW91dChydW5Db250cm9sbGVyKTtcblxuICAgIGZ1bmN0aW9uIHJ1bkNvbnRyb2xsZXIoKXtcbiAgICAgICRzY29wZS5zYXZlU3RhdHVzID0gZnVuY3Rpb24oY29tcGFueSkge1xuICAgICAgICB2YXIgY29tcGFueURhdGEgPSBjb21wYW55O1xuXG4gICAgICAgIENvbXBhbnlGYWN0b3J5LkNvbXBhbnkudXBkYXRlKHsgaWQ6Y29tcGFueS5pZCB9LCBjb21wYW55RGF0YSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICBpZihyZXNwb25zZS5lcnJvcikge1xuICAgICAgICAgICAgJHNjb3BlLmVycm9yID0gcmVzcG9uc2UuZXJyb3I7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRzY29wZS5tZXNzYWdlID0gcmVzcG9uc2UubWVzc2FnZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgJHNjb3BlLmdldENsYXNzRnJvbVBheW1lbnRTdGF0dXMgPSBmdW5jdGlvbihwYXJ0aWNpcGF0aW9uKSB7XG4gICAgICAgIGlmKCFwYXJ0aWNpcGF0aW9uKSB7IHJldHVybiAnZ3JleSc7IH1cbiAgICAgICAgaWYoIXBhcnRpY2lwYXRpb24ucGF5bWVudCkgeyByZXR1cm4gJ2dyZXknOyB9XG4gICAgICAgIGlmKCFwYXJ0aWNpcGF0aW9uLnBheW1lbnQuc3RhdHVzKSB7IHJldHVybiAnZ3JleSc7IH1cbiAgICAgICAgdmFyIHN0YXR1cyA9IHBhcnRpY2lwYXRpb24ucGF5bWVudC5zdGF0dXMudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZihzdGF0dXMuaW5kZXhPZigncGFnbycpICE9IC0xIHx8IHN0YXR1cy5pbmRleE9mKCdlbWl0aWRvJykgIT0gLTEgfHwgc3RhdHVzLmluZGV4T2YoJ3JlY2libyBlbnZpYWRvJykgIT0gLTEpIHsgcmV0dXJuICdsaW1lJzsgfVxuICAgICAgICBlbHNlIGlmKHN0YXR1cy5pbmRleE9mKCdlbnZpYWRvJykgIT0gLTEpIHsgcmV0dXJuICdvcmFuZ2UnOyB9XG4gICAgICAgIGVsc2UgeyByZXR1cm4gJ2dyZXknOyB9XG4gICAgICB9O1xuXG4gICAgICAkc2NvcGUucGF5bWVudFN0YXR1c2VzID0gWydFbWl0aWRvJywgJ1JlY2libyBFbnZpYWRvJywgJ1BhZ28nLCAnRW52aWFkbyddO1xuXG4gICAgICAkc2NvcGUubGltaXQgPSAyMDtcblxuICAgICAgJHNjb3BlLnN0YXR1c2VzID0gWydTdWdnZXN0aW9uJywnQ29udGFjdGVkJywnSW4gQ29udmVyc2F0aW9ucycsJ0luIE5lZ290aWF0aW9ucycsJ0Nsb3NlZCBEZWFsJywnUmVqZWN0ZWQnLCdHaXZlIFVwJ107XG5cbiAgICAgICRzY29wZS5jb21wYW55UHJlZGljYXRlID0gJ3VwZGF0ZWQnO1xuICAgICAgJHNjb3BlLnJldmVyc2UgPSAndHJ1ZSc7XG4gICAgICAkc2NvcGUudW5yZWFkRmlyc3QgPSB0cnVlO1xuXG4gICAgICBDb21wYW55RmFjdG9yeS5Db21wYW55LmdldEFsbChmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAkc2NvcGUucHJlZGljYXRlID0gJ3VwZGF0ZWQnO1xuICAgICAgICAkc2NvcGUucmV2ZXJzZSA9IHRydWU7XG4gICAgICAgICRzY29wZS5jb21wYW5pZXMgPSByZXNwb25zZTtcbiAgICAgIH0pO1xuXG4gICAgICAkc2NvcGUuc2Nyb2xsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkc2NvcGUubGltaXQgPD0gJHNjb3BlLmNvbXBhbmllcy5sZW5ndGgpXG4gICAgICAgICAgJHNjb3BlLmxpbWl0ICs9IDg7XG4gICAgICB9O1xuXG4gICAgICAkc2NvcGUuY2hlY2tQZXJtaXNzaW9uID0gZnVuY3Rpb24gKG1lbWJlcikge1xuICAgICAgICB2YXIgcm9sZXMgPSAkc2NvcGUubWUucm9sZXMuZmlsdGVyKGZ1bmN0aW9uKG8pIHtcbiAgICAgICAgICByZXR1cm4gby5pZCA9PSAnZGV2ZWxvcG1lbnQtdGVhbScgfHwgby5pZCA9PSAnY29vcmRpbmF0aW9uJztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYocm9sZXMubGVuZ3RoID09PSAwICYmIG1lbWJlci5pZCAhPSAkc2NvcGUubWUuaWQpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG5cbiAgICAgICRzY29wZS5hZGRDb21wYW55ID0gZnVuY3Rpb24obWVtYmVyLCBuZXdDb21wYW55KSB7XG4gICAgICAgIC8vY29uc29sZS5sb2cobmV3Q29tcGFueSk7XG4gICAgICAgIHZhciBjb21wYW55RGF0YSA9IG5ld0NvbXBhbnk7XG5cbiAgICAgICAgaWYobmV3Q29tcGFueS5pZCkge1xuICAgICAgICAgIHZhciBwYXJ0aWNpcGF0aW9uID0gJHNjb3BlLmdldFBhcnRpY2lwYXRpb24oY29tcGFueURhdGEsICRzY29wZS5jdXJyZW50RXZlbnQuaWQpO1xuICAgICAgICAgIGlmKHBhcnRpY2lwYXRpb24pIHtcbiAgICAgICAgICAgIHBhcnRpY2lwYXRpb24ubWVtYmVyID0gbWVtYmVyLmlkO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb21wYW55RGF0YS5wYXJ0aWNpcGF0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgZXZlbnQ6ICRzY29wZS5jdXJyZW50RXZlbnQuaWQsXG4gICAgICAgICAgICAgIHN0YXR1czogJ1NlbGVjdGVkJyxcbiAgICAgICAgICAgICAgbWVtYmVyOiBtZW1iZXIuaWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBDb21wYW55RmFjdG9yeS5Db21wYW55LnVwZGF0ZSh7IGlkOiBjb21wYW55RGF0YS5pZCB9LCB7IHBhcnRpY2lwYXRpb25zOiBjb21wYW55RGF0YS5wYXJ0aWNpcGF0aW9ucyB9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgaWYocmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICRzY29wZS5lcnJvciA9IHJlc3BvbnNlLmVycm9yO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSByZXNwb25zZS5zdWNjZXNzO1xuXG4gICAgICAgICAgICAgIENvbXBhbnlGYWN0b3J5LkNvbXBhbnkuZ2V0QWxsKGZ1bmN0aW9uIChjb21wYW5pZXMpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuY29tcGFuaWVzID0gY29tcGFuaWVzO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb21wYW55RGF0YS5wYXJ0aWNpcGF0aW9ucyA9IFt7XG4gICAgICAgICAgICBldmVudDogJHNjb3BlLmN1cnJlbnRFdmVudC5pZCxcbiAgICAgICAgICAgIHN0YXR1czogJ1NlbGVjdGVkJyxcbiAgICAgICAgICAgIG1lbWJlcjogbWVtYmVyLmlkXG4gICAgICAgICAgfV07XG5cbiAgICAgICAgICBDb21wYW55RmFjdG9yeS5Db21wYW55LmNyZWF0ZShjb21wYW55RGF0YSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGlmKHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgICAgICRzY29wZS5lcnJvciA9IHJlc3BvbnNlLmVycm9yO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSByZXNwb25zZS5tZXNzYWdlO1xuXG4gICAgICAgICAgICAgIENvbXBhbnlGYWN0b3J5LkNvbXBhbnkuZ2V0QWxsKGZ1bmN0aW9uIChjb21wYW5pZXMpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuY29tcGFuaWVzID0gY29tcGFuaWVzO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cblxufSk7XG5cbiIsInRoZVRvb2xDb250cm9sbGVyID0gYW5ndWxhci5tb2R1bGUoJ3RoZVRvb2wuY29udHJvbGxlcnMnLCBbXSk7XG5cbnJlcXVpcmUoJy4vYXV0aCcpO1xucmVxdWlyZSgnLi9tYWluJyk7XG5yZXF1aXJlKCcuL2NvbXBhbnknKTtcbnJlcXVpcmUoJy4vc3BlYWtlcicpO1xucmVxdWlyZSgnLi9tZW1iZXInKTtcbnJlcXVpcmUoJy4vY29tbWVudCcpO1xucmVxdWlyZSgnLi9tZWV0aW5nJyk7XG5yZXF1aXJlKCcuL2NoYXQnKTtcbnJlcXVpcmUoJy4vdG9waWMnKTtcbnJlcXVpcmUoJy4vY29tbXVuaWNhdGlvbicpO1xucmVxdWlyZSgnLi90YWcnKTtcbnJlcXVpcmUoJy4vc3Vic2NyaXB0aW9uJyk7XG5yZXF1aXJlKCcuL2FkbWluJyk7XG5yZXF1aXJlKCcuL3Nlc3Npb24nKTsiLCJcInVzZSBzdHJpY3RcIjtcblxudGhlVG9vbENvbnRyb2xsZXIuY29udHJvbGxlcihcImhvbWVcIiwgZnVuY3Rpb24gKCRyb290U2NvcGUsICRzY29wZSwgTm90aWZpY2F0aW9uRmFjdG9yeSkge1xuXG4gICRyb290U2NvcGUudXBkYXRlLnRpbWVvdXQocnVuQ29udHJvbGxlcik7XG5cbiAgZnVuY3Rpb24gcnVuQ29udHJvbGxlcigpe1xuXG4gICAgJHNjb3BlLmxvYWRpbmcgPSB0cnVlO1xuICAgICRzY29wZS5ub3RpZmljYXRpb25zID0gW107XG4gICAgJHNjb3BlLmxpbWl0ID0gMTA7XG5cbiAgICBOb3RpZmljYXRpb25GYWN0b3J5Lk5vdGlmaWNhdGlvbi5nZXRBbGwoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAkc2NvcGUubm90aWZpY2F0aW9ucyA9IHJlc3BvbnNlO1xuICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB9KTtcblxuICAgICRzY29wZS5zY3JvbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoJHNjb3BlLmxpbWl0IDwgJHNjb3BlLm5vdGlmaWNhdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICRzY29wZS5saW1pdCArPSAxMDtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbn0pO1xuIiwicmVxdWlyZSgnLi9tYWluLmpzJyk7XG5yZXF1aXJlKCcuL2hvbWUuanMnKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudGhlVG9vbENvbnRyb2xsZXIuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHNjb3BlLCAkaHR0cCwgJHJvdXRlUGFyYW1zLCAkc2NlLCAkbG9jYXRpb24sICR3aW5kb3csICRyb290U2NvcGUsIE5vdGlmaWNhdGlvbkZhY3RvcnksIE1lbWJlckZhY3RvcnksIENvbXBhbnlGYWN0b3J5LCBTcGVha2VyRmFjdG9yeSwgVG9waWNGYWN0b3J5LCBSb2xlRmFjdG9yeSwgVGFnRmFjdG9yeSwgQ29tbWVudEZhY3RvcnksIENoYXRGYWN0b3J5LCBFdmVudEZhY3RvcnksIFNlc3Npb25GYWN0b3J5LCBJdGVtRmFjdG9yeSkge1xuXG4gIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1JTklUSUFMSVpBVElPTj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgJHNjb3BlLnJlYWR5ID0gZmFsc2U7XG5cbiAgJHNjb3BlLmRpc3BsYXkgPSBmYWxzZTtcblxuICAkc2NvcGUuc2VhcmNoID0ge307XG4gICRzY29wZS5zZWFyY2hUb3BpY3MgPSB7fTtcbiAgJHNjb3BlLnNlYXJjaENvbXBhbmllcyA9IHt9O1xuICAkc2NvcGUuc2VhcmNoU3BlYWtlcnMgPSB7fTtcbiAgJHNjb3BlLnNlYXJjaE1lbWJlcnMgPSB7fTtcbiAgJHNjb3BlLmFjdGl2ZUV2ZW50ID0ge307XG5cbiAgJHNjb3BlLm1lID0ge307XG4gICRzY29wZS5tZW1iZXJzID0gW107XG4gICRzY29wZS5jb21wYW5pZXMgPSBbXTtcbiAgJHNjb3BlLnNwZWFrZXJzID0gW107XG4gICRzY29wZS50b3BpY3MgPSBbXTtcbiAgJHNjb3BlLnRhcmdldE5vdGlmaWNhdGlvbnMgPSBbXTtcbiAgJHNjb3BlLnVucmVhZE5vdGlmaWNhdGlvbnMgPSBbXTtcblxuICAkc2NvcGUudGFyZ2V0SW5mbyA9IHtcbiAgICBudW1iZXI6IDAsXG4gICAgdGV4dDogXCIgTG9hZGluZy4uLlwiXG4gIH07XG5cbiAgdmFyIGZhY3Rvcmllc1JlYWR5ID0gMDtcblxuICAkc2NvcGUuc2V0Q3VycmVudEV2ZW50ID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAkc2NvcGUuY3VycmVudEV2ZW50ID0ge307XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpeyRzY29wZS5jdXJyZW50RXZlbnQgPSBldmVudDt9LDEwKTtcbiAgfVxuXG4gICRyb290U2NvcGUudXBkYXRlID0ge1xuXG4gICAgcnVubmluZzogZmFsc2UsXG5cbiAgICB0aW1lb3V0OiBmdW5jdGlvbihjYil7XG4gICAgICBpZighJHNjb3BlLnJlYWR5KXtcbiAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICBpZighJHJvb3RTY29wZS51cGRhdGUucnVubmluZyl7XG4gICAgICAgICAgJHJvb3RTY29wZS51cGRhdGUuYWxsKCk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgJHJvb3RTY29wZS51cGRhdGUudGltZW91dChjYikgfSwgMTUwMCk7XG4gICAgICB9XG4gICAgICBlbHNle1xuICAgICAgICBjYigpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSxcblxuICAgIG1lOiBmdW5jdGlvbigpe1xuICAgICAgTWVtYmVyRmFjdG9yeS5NZS5nZXQoZnVuY3Rpb24gKG1lKSB7XG4gICAgICAgICRzY29wZS5tZSA9IG1lO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIG1lbWJlcnM6IGZ1bmN0aW9uKCl7XG4gICAgICBNZW1iZXJGYWN0b3J5Lk1lbWJlci5nZXRBbGwoZnVuY3Rpb24gKG1lbWJlcnMpIHtcbiAgICAgICAgJHNjb3BlLm1lbWJlcnMgPSBtZW1iZXJzO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIGNvbXBhbmllczogZnVuY3Rpb24oKXtcbiAgICAgIENvbXBhbnlGYWN0b3J5LkNvbXBhbnkuZ2V0QWxsKGZ1bmN0aW9uIChjb21wYW5pZXMpIHtcbiAgICAgICAgJHNjb3BlLmNvbXBhbmllcyA9IGNvbXBhbmllcztcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBzcGVha2VyczogZnVuY3Rpb24oKXtcbiAgICAgIFNwZWFrZXJGYWN0b3J5LlNwZWFrZXIuZ2V0QWxsKGZ1bmN0aW9uIChzcGVha2Vycykge1xuICAgICAgICAkc2NvcGUuc3BlYWtlcnMgPSBzcGVha2VycztcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICB0b3BpY3M6IGZ1bmN0aW9uKCl7XG4gICAgICBUb3BpY0ZhY3RvcnkuVG9waWMuZ2V0QWxsKGZ1bmN0aW9uICh0b3BpY3MpIHtcbiAgICAgICAgJHNjb3BlLnRvcGljcyA9IHRvcGljcztcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICByb2xlczogZnVuY3Rpb24oKXtcbiAgICAgIFJvbGVGYWN0b3J5LlJvbGUuZ2V0QWxsKGZ1bmN0aW9uIChyb2xlcykge1xuICAgICAgICAkc2NvcGUucm9sZXMgPSByb2xlcztcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICB0YWdzOiBmdW5jdGlvbigpe1xuICAgICAgVGFnRmFjdG9yeS5UYWcuZ2V0QWxsKGZ1bmN0aW9uICh0YWdzKSB7XG4gICAgICAgICRzY29wZS50b3BpY1RhZ3MgPSB0YWdzO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIGNvbW1lbnRzOiBmdW5jdGlvbigpe1xuICAgICAgQ29tbWVudEZhY3RvcnkuQ29tbWVudC5nZXRBbGwoZnVuY3Rpb24gKGNvbW1lbnRzKSB7XG4gICAgICAgICRzY29wZS5jb21tZW50cyA9IGNvbW1lbnRzO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIGNoYXRzOiBmdW5jdGlvbigpIHtcbiAgICAgIENoYXRGYWN0b3J5LkNoYXQuZ2V0QWxsKGZ1bmN0aW9uKGNoYXRzKSB7XG4gICAgICAgICRzY29wZS5jaGF0cyA9IGNoYXRzO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIGV2ZW50czogZnVuY3Rpb24oKSB7XG4gICAgICBFdmVudEZhY3RvcnkuRXZlbnQuZ2V0QWxsKGZ1bmN0aW9uKGV2ZW50cykge1xuICAgICAgICAkc2NvcGUuZXZlbnRzID0gZXZlbnRzO1xuICAgICAgICAkc2NvcGUuY3VycmVudEV2ZW50ID0gZXZlbnRzWzBdO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIHNlc3Npb25zOiBmdW5jdGlvbigpIHtcbiAgICAgIFNlc3Npb25GYWN0b3J5LlNlc3Npb24uZ2V0QWxsKGZ1bmN0aW9uKHNlc3Npb25zKSB7XG4gICAgICAgICRzY29wZS5zZXNzaW9ucyA9IHNlc3Npb25zO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIGl0ZW1zOiBmdW5jdGlvbigpIHtcbiAgICAgIEl0ZW1GYWN0b3J5Lkl0ZW0uZ2V0QWxsKGZ1bmN0aW9uKGl0ZW1zKSB7XG4gICAgICAgICRzY29wZS5pdGVtcyA9IGl0ZW1zO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIGFsbDogZnVuY3Rpb24oKXtcbiAgICAgIHRoaXMucnVubmluZyA9IHRydWU7XG4gICAgICBmYWN0b3JpZXNSZWFkeSA9IDA7XG4gICAgICAvL2NvbnNvbGUubG9nKFwiVXBkYXRpbmchXCIpO1xuICAgICAgdGhpcy5tZSgpO1xuICAgICAgdGhpcy5tZW1iZXJzKCk7XG4gICAgICB0aGlzLmNvbXBhbmllcygpO1xuICAgICAgdGhpcy5zcGVha2VycygpO1xuICAgICAgdGhpcy50b3BpY3MoKTtcbiAgICAgIHRoaXMucm9sZXMoKTtcbiAgICAgIHRoaXMudGFncygpO1xuICAgICAgdGhpcy5jb21tZW50cygpO1xuICAgICAgdGhpcy5jaGF0cygpO1xuICAgICAgdGhpcy5ldmVudHMoKTtcbiAgICAgIHRoaXMuc2Vzc2lvbnMoKTtcbiAgICAgIHRoaXMuaXRlbXMoKTtcbiAgICB9XG5cbiAgfVxuXG4gICRyb290U2NvcGUudXBkYXRlLmFsbCgpO1xuXG5cbiAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PUZVTkNUSU9OUz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gY2FsbGJhY2soKSB7XG4gICAgaWYgKCsrZmFjdG9yaWVzUmVhZHkgPT0gMTIpIHtcbiAgICAgICRyb290U2NvcGUudXBkYXRlLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICRzY29wZS5yZWFkeSA9IHRydWU7XG5cbiAgICAgICRzY29wZS51cGRhdGUoKTtcblxuICAgICAgc2V0SW50ZXJ2YWwoJHNjb3BlLnVwZGF0ZSwgMTAwMDApO1xuXG4gICAgICAkcm9vdFNjb3BlLiRvbihcIiRsb2NhdGlvbkNoYW5nZVN0YXJ0XCIsIGZ1bmN0aW9uIChldmVudCwgbmV4dCwgY3VycmVudCkge1xuICAgICAgICBzZXRUaW1lb3V0KCRzY29wZS51cGRhdGUsIDUwMCk7XG4gICAgICAgICRzY29wZS5zZWFyY2gubmFtZSA9ICcnO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cblxuICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09U0NPUEUgRlVOQ1RJT05TPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAkc2NvcGUudXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgTm90aWZpY2F0aW9uRmFjdG9yeS5Ob3RpZmljYXRpb24uZ2V0QWxsKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgJHNjb3BlLnRhcmdldE5vdGlmaWNhdGlvbnMgPSBbXTtcbiAgICAgICRzY29wZS51bnJlYWROb3RpZmljYXRpb25zID0gW107XG4gICAgICAkc2NvcGUudGFyZ2V0SW5mby5udW1iZXIgPSAwO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3BvbnNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChyZXNwb25zZVtpXS50YXJnZXRzLmluZGV4T2YoJHNjb3BlLm1lLmlkKSAhPSAtMSkge1xuICAgICAgICAgIGlmIChyZXNwb25zZVtpXS51bnJlYWQuaW5kZXhPZigkc2NvcGUubWUuaWQpICE9IC0xKSB7XG4gICAgICAgICAgICAkc2NvcGUudGFyZ2V0SW5mby5udW1iZXIrKztcbiAgICAgICAgICB9XG4gICAgICAgICAgJHNjb3BlLnRhcmdldE5vdGlmaWNhdGlvbnMudW5zaGlmdChyZXNwb25zZVtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3BvbnNlW2ldLnVucmVhZC5pbmRleE9mKCRzY29wZS5tZS5pZCkgIT0gLTEpIHtcbiAgICAgICAgICAkc2NvcGUudW5yZWFkTm90aWZpY2F0aW9ucy51bnNoaWZ0KHJlc3BvbnNlW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoJHNjb3BlLnRhcmdldEluZm8ubnVtYmVyID09IDApIHtcbiAgICAgICAgJHNjb3BlLnRhcmdldEluZm8udGV4dCA9IFwiIE5vIE5vdGlmaWNhdGlvbnNcIjtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAkc2NvcGUudGFyZ2V0SW5mby50ZXh0ID0gXCIgXCIgKyAkc2NvcGUudGFyZ2V0SW5mby5udW1iZXIgKyBcIiBOb3RpZmljYXRpb25cIiArICgkc2NvcGUudGFyZ2V0SW5mby5udW1iZXIgPiAxID8gXCJzXCIgOiBcIlwiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gICRzY29wZS50aW1lU2luY2UgPWZ1bmN0aW9uIChkYXRlKSB7XG4gICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgIHZhciBzZWNvbmRzID0gTWF0aC5mbG9vcigoRGF0ZS5ub3coKSAtIGRhdGUpIC8gMTAwMCk7XG5cbiAgICB2YXIgc3VmZml4ID0gJ2Fnbyc7XG4gICAgaWYoc2Vjb25kcyA8IDApe1xuICAgICAgc2Vjb25kcyA9IE1hdGguYWJzKHNlY29uZHMpO1xuICAgICAgc3VmZml4ID0gJ3RvIGdvJztcbiAgICB9XG5cbiAgICB2YXIgaW50ZXJ2YWwgPSBNYXRoLmZsb29yKHNlY29uZHMgLyAzMTUzNjAwMCk7XG5cbiAgICBpZiAoaW50ZXJ2YWwgPiAxKSB7XG4gICAgICAgIHJldHVybiBpbnRlcnZhbCArIFwiIHllYXJzIFwiICsgc3VmZml4O1xuICAgIH1cbiAgICBpbnRlcnZhbCA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDI1OTIwMDApO1xuICAgIGlmIChpbnRlcnZhbCA+IDEpIHtcbiAgICAgICAgcmV0dXJuIGludGVydmFsICsgXCIgbW9udGhzIFwiICsgc3VmZml4O1xuICAgIH1cbiAgICBpbnRlcnZhbCA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDg2NDAwKTtcbiAgICBpZiAoaW50ZXJ2YWwgPiAxKSB7XG4gICAgICAgIHJldHVybiBpbnRlcnZhbCArIFwiIGRheXMgXCIgKyBzdWZmaXg7XG4gICAgfVxuICAgIGludGVydmFsID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gMzYwMCk7XG4gICAgaWYgKGludGVydmFsID4gMSkge1xuICAgICAgICByZXR1cm4gaW50ZXJ2YWwgKyBcIiBob3VycyBcIiArIHN1ZmZpeDtcbiAgICB9XG4gICAgaW50ZXJ2YWwgPSBNYXRoLmZsb29yKHNlY29uZHMgLyA2MCk7XG4gICAgaWYgKGludGVydmFsID4gMSkge1xuICAgICAgICByZXR1cm4gaW50ZXJ2YWwgKyBcIiBtaW51dGVzIFwiICsgc3VmZml4O1xuICAgIH1cbiAgICByZXR1cm4gTWF0aC5mbG9vcihzZWNvbmRzKSArIFwiIHNlY29uZHMgXCIgKyBzdWZmaXg7XG4gIH07XG5cbiAgJHNjb3BlLmZvcm1hdERhdGUgPSBmdW5jdGlvbiAodGltZSkge1xuICAgIHJldHVybiBuZXcgRGF0ZSh0aW1lKS50b1VUQ1N0cmluZygpO1xuICB9O1xuXG4gICRzY29wZS5nZXRNZW1iZXIgPSBmdW5jdGlvbiAobWVtYmVySWQpIHtcbiAgICB2YXIgbWVtYmVyID0gJHNjb3BlLm1lbWJlcnMuZmlsdGVyKGZ1bmN0aW9uKG8pIHtcbiAgICAgIHJldHVybiBvLmlkID09IG1lbWJlcklkO1xuICAgIH0pO1xuXG4gICAgaWYobWVtYmVyLmxlbmd0aD4wKSB7XG4gICAgICByZXR1cm4gbWVtYmVyWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBcIk5vIG9uZVwiLFxuICAgICAgICBmYWNlYm9vazogXCIxMDAwMDA0NTYzMzU5NzJcIlxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAkc2NvcGUuZ2V0U3BlYWtlciA9IGZ1bmN0aW9uIChzcGVha2VySWQpIHtcbiAgICByZXR1cm4gJHNjb3BlLnNwZWFrZXJzLmZpbHRlcihmdW5jdGlvbihvKSB7XG4gICAgICByZXR1cm4gby5pZCA9PSBzcGVha2VySWQ7XG4gICAgfSlbMF07XG4gIH07XG5cbiAgJHNjb3BlLmdldENvbXBhbnkgPSBmdW5jdGlvbiAoY29tcGFueUlkKSB7XG4gICAgcmV0dXJuICRzY29wZS5jb21wYW5pZXMuZmlsdGVyKGZ1bmN0aW9uKG8pIHtcbiAgICAgIHJldHVybiBvLmlkID09IGNvbXBhbnlJZDtcbiAgICB9KVswXTtcbiAgfTtcblxuICAkc2NvcGUuZ2V0VG9waWMgPSBmdW5jdGlvbiAodG9waWNJZCkge1xuICAgIHJldHVybiAkc2NvcGUudG9waWNzLmZpbHRlcihmdW5jdGlvbihvKSB7XG4gICAgICByZXR1cm4gby5faWQgPT0gdG9waWNJZDtcbiAgICB9KVswXTtcbiAgfTtcblxuICAkc2NvcGUuZ2V0Tm90aWZpY2F0aW9ucyA9IGZ1bmN0aW9uICh0aHJlYWQpIHtcbiAgICByZXR1cm4gJHNjb3BlLm5vdGlmaWNhdGlvbnMuZmlsdGVyKGZ1bmN0aW9uKG8pIHtcbiAgICAgIHJldHVybiBvLnRocmVhZCA9PSB0aHJlYWQ7XG4gICAgfSlbMF07XG4gIH07XG5cbiAgJHNjb3BlLmdldFVucmVhZE5vdGlmaWNhdGlvbnMgPSBmdW5jdGlvbiAodGhyZWFkKSB7XG4gICAgcmV0dXJuICRzY29wZS51bnJlYWROb3RpZmljYXRpb25zLmZpbHRlcihmdW5jdGlvbihvKSB7XG4gICAgICByZXR1cm4gby50aHJlYWQgPT0gdGhyZWFkO1xuICAgIH0pWzBdO1xuICB9O1xuXG4gICRzY29wZS5nZXRFdmVudCA9IGZ1bmN0aW9uIChldmVudElkKSB7XG4gICAgcmV0dXJuICRzY29wZS5ldmVudHMuZmlsdGVyKGZ1bmN0aW9uKG8pIHtcbiAgICAgIHJldHVybiBvLmlkID09IGV2ZW50SWQ7XG4gICAgfSlbMF07XG4gIH07XG5cbiAgJHNjb3BlLmdldFNlc3Npb24gPSBmdW5jdGlvbiAoc2Vzc2lvbklkKSB7XG4gICAgcmV0dXJuICRzY29wZS5zZXNzaW9ucy5maWx0ZXIoZnVuY3Rpb24obykge1xuICAgICAgcmV0dXJuIG8uX2lkID09IHNlc3Npb25JZDtcbiAgICB9KVswXTtcbiAgfTtcblxuICAkc2NvcGUuZ2V0SXRlbSA9IGZ1bmN0aW9uIChpdGVtSWQpIHtcbiAgICByZXR1cm4gJHNjb3BlLml0ZW1zLmZpbHRlcihmdW5jdGlvbihvKSB7XG4gICAgICByZXR1cm4gby5pZCA9PSBpdGVtSWQ7XG4gICAgfSlbMF07XG4gIH07XG5cbiAgJHNjb3BlLmdldFBhcnRpY2lwYXRpb24gPSBmdW5jdGlvbiAodGhpbmcsIGV2ZW50SWQpIHtcbiAgICByZXR1cm4gdGhpbmcucGFydGljaXBhdGlvbnMuZmlsdGVyKGZ1bmN0aW9uKG8pIHtcbiAgICAgIHJldHVybiBvLmV2ZW50ID09IGV2ZW50SWQ7XG4gICAgfSlbMF07XG4gIH07XG5cbiAgJHNjb3BlLnNob3cgPSBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUuZGlzcGxheSA9ICgkc2NvcGUuc2VhcmNoLm5hbWUgPyB0cnVlIDogZmFsc2UpO1xuICB9O1xuXG4gICRzY29wZS5oaWRlID0gZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLmRpc3BsYXkgPSBmYWxzZTtcbiAgfTtcblxuICAkc2NvcGUuY29udmVydFVSTHMgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgdmFyIHVybEV4cCA9IC8oXFxiKGh0dHBzP3xmdHB8ZmlsZSk6XFwvXFwvWy1BLVowLTkrJkAjXFwvJT89fl98ITosLjtdKlstQS1aMC05KyZAI1xcLyU9fl98XSkvaWc7XG5cbiAgICByZXR1cm4gdGV4dC5yZXBsYWNlKC9cXG4vZywgJzxicj4nKS5yZXBsYWNlKHVybEV4cCxcIjxhIGhyZWY9JyQxJz4kMTwvYT5cIik7XG4gIH1cblxuICAkc2NvcGUuY29udmVydE5ld0xpbmVzVG9IdG1sID0gZnVuY3Rpb24odGV4dCkge1xuICAgIHJldHVybiAnPGRpdiBkYXRhLW1hcmtkb3duPicrdGV4dC5yZXBsYWNlKC9cXG4vZywgJzxicj4nKSsnPC9kaXY+JztcbiAgfVxuXG4gICRzY29wZS5jb252ZXJ0TWFya2Rvd25Ub0h0bWwgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgcmV0dXJuICc8ZGl2IGRhdGEtbWFya2Rvd24+JyArIHRleHQgKyAnPC9kaXY+JztcbiAgfVxuXG4gICRzY29wZS5sb2dvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgJGh0dHAuZ2V0KHVybF9wcmVmaXggKyAnL2FwaS9sb2dvdXQnKS5cbiAgICAgIHN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcbiAgICAgICAgJHdpbmRvdy5sb2NhdGlvbi5hc3NpZ24oJy8nKTtcbiAgICAgIH0pLlxuICAgICAgZXJyb3IoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkVSUk9SXCIsIGRhdGEpO1xuICAgICAgICAkd2luZG93LmxvY2F0aW9uLmFzc2lnbignLycpO1xuICAgICAgfSk7XG4gIH1cblxuXG59KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG50aGVUb29sQ29udHJvbGxlci5jb250cm9sbGVyKFwiTWVldGluZ0VtYmVkQ29udHJvbGxlclwiLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHNjb3BlLCBNZWV0aW5nRmFjdG9yeSkge1xuXG4gICRyb290U2NvcGUudXBkYXRlLnRpbWVvdXQocnVuQ29udHJvbGxlcik7XG5cbiAgZnVuY3Rpb24gcnVuQ29udHJvbGxlcigpe1xuXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PUlOSVRJQUxJWkFUSU9OPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgICRzY29wZS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgIE1lZXRpbmdGYWN0b3J5LmdldCh7aWQ6ICRzY29wZS5tZWV0aW5nSWR9LCBmdW5jdGlvbiAobWVldGluZykge1xuICAgICAgJHNjb3BlLm1lZXRpbmcgPSBtZWV0aW5nO1xuXG4gICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgIH0pO1xuXG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09RlVOQ1RJT05TPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgICRzY29wZS5nZXRNZW1iZXIgPSBmdW5jdGlvbiAobWVtYmVySWQpIHtcbiAgICAgIHJldHVybiAkc2NvcGUubWVtYmVycy5maWx0ZXIoZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgcmV0dXJuIG8uaWQgPT09IG1lbWJlcklkO1xuICAgICAgfSlbMF07XG4gICAgfTtcbiAgfVxuXG59KTtcbiIsInJlcXVpcmUoXCIuL2VtYmVkXCIpO1xucmVxdWlyZShcIi4vbGlzdFwiKTtcbnJlcXVpcmUoXCIuL21lZXRpbmdcIik7XG4iLCIndXNlIHN0cmljdCc7XG5cbnRoZVRvb2xDb250cm9sbGVyLmNvbnRyb2xsZXIoJ01lZXRpbmdzQ29udHJvbGxlcicsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkc2NvcGUsICRsb2NhdGlvbiwgTWVldGluZ0ZhY3RvcnkpIHtcblxuICAkcm9vdFNjb3BlLnVwZGF0ZS50aW1lb3V0KHJ1bkNvbnRyb2xsZXIpO1xuXG4gIGZ1bmN0aW9uIHJ1bkNvbnRyb2xsZXIoKXtcblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1JTklUSUFMSVpBVElPTj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAkc2NvcGUubG9hZGluZyA9IHRydWU7XG5cbiAgICBpbml0KCk7XG5cbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCRzY29wZS5sb2FkaW5nKSB7XG4gICAgICAgICAgaW5pdCgpO1xuICAgICAgICB9XG4gICAgICB9LCAxMDAwKTtcblxuICAgICAgTWVldGluZ0ZhY3RvcnkuZ2V0QWxsKGZ1bmN0aW9uIChtZWV0aW5ncykge1xuICAgICAgICAkc2NvcGUubWVldGluZ3MgPSBtZWV0aW5ncztcblxuICAgICAgICBmb3IgKHZhciBpID0gMCwgaiA9ICRzY29wZS5tZWV0aW5ncy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgICAgICAkc2NvcGUubWVldGluZ3NbaV0uZmFjZWJvb2sgPSAkc2NvcGUubWVtYmVycy5maWx0ZXIoZnVuY3Rpb24obykge1xuICAgICAgICAgICAgcmV0dXJuICRzY29wZS5tZWV0aW5nc1tpXS5hdXRob3IgPT0gby5pZDtcbiAgICAgICAgICB9KVswXS5mYWNlYm9vaztcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1GVU5DVElPTlM9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgJHNjb3BlLnRpbWUgPSBmdW5jdGlvbihkYXRlKSB7XG4gICAgICByZXR1cm4gJHNjb3BlLnRpbWVTaW5jZShuZXcgRGF0ZShkYXRlKSk7XG4gICAgfTtcblxuICAgICRzY29wZS5jcmVhdGVNZWV0aW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG5cbiAgICAgIE1lZXRpbmdGYWN0b3J5LmNyZWF0ZSh7XG4gICAgICAgIGF1dGhvcjogJHNjb3BlLm1lLmlkLFxuICAgICAgICB0aXRsZTogZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoXCJwdC1QVFwiKSArIFwiIC0gTWVldGluZ1wiLFxuICAgICAgICBkYXRlOiBkYXRlXG4gICAgICB9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICAgICRsb2NhdGlvbi5wYXRoKFwiL21lZXRpbmcvXCIgKyByZXNwb25zZS5pZCArIFwiL2VkaXRcIik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbn0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnRoZVRvb2xDb250cm9sbGVyLmNvbnRyb2xsZXIoXCJNZWV0aW5nQ29udHJvbGxlclwiLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHNjb3BlLCAkcm91dGVQYXJhbXMsICRsb2NhdGlvbiwgJHRpbWVvdXQsIE1lZXRpbmdGYWN0b3J5LCBUb3BpY0ZhY3RvcnksIFRhZ0ZhY3RvcnkpIHtcblxuICAkcm9vdFNjb3BlLnVwZGF0ZS50aW1lb3V0KHJ1bkNvbnRyb2xsZXIpO1xuXG4gIGZ1bmN0aW9uIHJ1bkNvbnRyb2xsZXIoKXtcblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1JTklUSUFMSVpBVElPTj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAkc2NvcGUubG9hZGluZyA9IHRydWU7XG5cbiAgICAkc2NvcGUua2luZHMgPSBbXCJJbmZvXCIsIFwiVG8gZG9cIiwgXCJEZWNpc2lvblwiLCBcIklkZWFcIl07XG5cbiAgICBNZWV0aW5nRmFjdG9yeS5nZXQoe2lkOiAkcm91dGVQYXJhbXMuaWR9LCBmdW5jdGlvbiAobWVldGluZykge1xuICAgICAgJHNjb3BlLm1lZXRpbmcgPSBtZWV0aW5nO1xuXG4gICAgICBTdHJpbmcucHJvdG90eXBlLmVuZHNXaXRoID0gZnVuY3Rpb24gKHN1ZmZpeCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbmRleE9mKHN1ZmZpeCwgdGhpcy5sZW5ndGggLSBzdWZmaXgubGVuZ3RoKSAhPT0gLTE7XG4gICAgICB9O1xuXG4gICAgICBpZiAoJGxvY2F0aW9uLnBhdGgoKS5lbmRzV2l0aChcIi90ZXh0XCIpKSB7XG4gICAgICAgIHZhciB0ZXh0ID0gbWVldGluZy50aXRsZSArIFwiXFxuXFxuXCIgKyAobWVldGluZy5kZXNjcmlwdGlvbiA/IG1lZXRpbmcuZGVzY3JpcHRpb24gKyBcIlxcblxcblwiIDogXCJcIik7XG5cbiAgICAgICAgaWYgKG1lZXRpbmcuYXR0ZW5kYW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdGV4dCArPSBcIkF0dGVuZGFudHM6XFxuXCI7XG5cbiAgICAgICAgICBtZWV0aW5nLmF0dGVuZGFudHMuc29ydCgpO1xuXG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZWV0aW5nLmF0dGVuZGFudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRleHQgKz0gJHNjb3BlLmdldE1lbWJlcihtZWV0aW5nLmF0dGVuZGFudHNbaV0pLm5hbWUgKyAoaSsxIDwgbWVldGluZy5hdHRlbmRhbnRzLmxlbmd0aCA/IFwiLCBcIiA6IFwiXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0ZXh0ICs9IFwiXFxuXFxuXCI7XG4gICAgICAgIH1cblxuICAgICAgICBUYWdGYWN0b3J5LlRhZy5nZXRBbGwoZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgIHZhciB0YWdzID0gW107XG5cbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGFncy5wdXNoKHJlc3VsdFtpXSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGFncy5zb3J0KGZ1bmN0aW9uIChvMSwgbzIpIHtcbiAgICAgICAgICAgIHJldHVybiBvMS5uYW1lLmxvY2FsZUNvbXBhcmUobzIubmFtZSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciB0b3BpY3MgPSBtZWV0aW5nLnRvcGljcy5maWx0ZXIoZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG8udGFncy5pbmRleE9mKHRhZ3NbaV0uaWQpICE9IC0xO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICh0b3BpY3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0ZXh0ICs9IHRhZ3NbaV0ubmFtZSArIFwiOlxcblwiO1xuXG4gICAgICAgICAgICB0b3BpY3Muc29ydChmdW5jdGlvbiAobzEsIG8yKSB7XG4gICAgICAgICAgICAgIHJldHVybiBvMS5wb3N0ZWQudG9TdHJpbmcoKS5sb2NhbGVDb21wYXJlKG8yLnBvc3RlZC50b1N0cmluZygpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRvcGljcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICB0ZXh0ICs9IFwiICAgIC0gXCIgKyB0b3BpY3Nbal0udGV4dC5yZXBsYWNlKC9cXG4vZywgXCJcXG4gICAgICBcIikgKyBcIlxcblwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0ZXh0ICs9IFwiXFxuXCI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJHNjb3BlLm51bWJlck9mTGluZXMgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG4gPSAwO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZXh0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIGlmICh0ZXh0W2ldID09PSBcIlxcblwiKSB7XG4gICAgICAgICAgICAgICAgbisrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbiArIDI7XG4gICAgICAgICAgfSgpKTtcblxuICAgICAgICAgICRzY29wZS50ZXh0ID0gdGV4dDtcblxuICAgICAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1GVU5DVElPTlM9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgJHNjb3BlLnRvZ2dsZUF0dGVuZGFudCA9IGZ1bmN0aW9uIChtZW1iZXIpIHtcbiAgICAgIHZhciBpbmRleCA9ICRzY29wZS5tZWV0aW5nLmF0dGVuZGFudHMuaW5kZXhPZihtZW1iZXIpO1xuXG4gICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICRzY29wZS5tZWV0aW5nLmF0dGVuZGFudHMucHVzaChtZW1iZXIpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgICRzY29wZS5tZWV0aW5nLmF0dGVuZGFudHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgJHNjb3BlLnRvZ2dsZUF0dGVuZGFudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgaiA9ICRzY29wZS5tZW1iZXJzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuICAgICAgICAkc2NvcGUudG9nZ2xlQXR0ZW5kYW50KCRzY29wZS5tZW1iZXJzW2ldLmlkKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgJHNjb3BlLmdldEF0dGVuZGFudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gJHNjb3BlLm1lZXRpbmcuYXR0ZW5kYW50cy5tYXAoZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgcmV0dXJuICRzY29wZS5nZXRNZW1iZXIobyk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmNyZWF0ZVRvcGljID0gZnVuY3Rpb24gKGtpbmQpIHtcbiAgICAgIHZhciB0b3BpYyA9IHtcbiAgICAgICAgZWRpdGluZzogdHJ1ZSxcbiAgICAgICAgYXV0aG9yOiAkc2NvcGUubWUuaWQsXG4gICAgICAgIHRleHQ6IFwiXCIsXG4gICAgICAgIHRhcmdldHM6IFtdLFxuICAgICAgICBraW5kOiBraW5kLFxuICAgICAgICBjbG9zZWQ6IGZhbHNlLFxuICAgICAgICByZXN1bHQ6IFwiXCIsXG4gICAgICAgIHBvbGw6IHtcbiAgICAgICAgICBraW5kOiBcInRleHRcIixcbiAgICAgICAgICBvcHRpb25zOiBbXVxuICAgICAgICB9LFxuICAgICAgICBkdWVkYXRlOiBudWxsLFxuICAgICAgICBtZWV0aW5nczogWyRzY29wZS5tZWV0aW5nLl9pZF0sXG4gICAgICAgIHJvb3Q6IG51bGwsXG4gICAgICAgIHRhZ3M6IFtdLFxuICAgICAgICBwb3N0ZWQ6IG5ldyBEYXRlKClcbiAgICAgIH07XG5cbiAgICAgIFRvcGljRmFjdG9yeS5Ub3BpYy5jcmVhdGUodG9waWMsIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICAgIHRvcGljLl9pZCA9IHJlc3BvbnNlLmlkO1xuICAgICAgICAgICRzY29wZS5tZWV0aW5nLnRvcGljcy5wdXNoKHRvcGljKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgICRzY29wZS5hZGRUb3BpYyA9IGZ1bmN0aW9uICh0b3BpY0lkKSB7XG4gICAgICAkc2NvcGUuZGlzcGxheSA9IGZhbHNlO1xuXG4gICAgICB2YXIgdG9waWMgPSAkc2NvcGUudG9waWNzLmZpbHRlcihmdW5jdGlvbiAobykge1xuICAgICAgICByZXR1cm4gby5faWQgPT09IHRvcGljSWQ7XG4gICAgICB9KVswXTtcblxuICAgICAgJHNjb3BlLm1lZXRpbmcudG9waWNzLnB1c2godG9waWMpO1xuXG4gICAgICB0b3BpYy5tZWV0aW5ncy5wdXNoKCRzY29wZS5tZWV0aW5nLl9pZCk7XG4gICAgICBUb3BpY0ZhY3RvcnkuVG9waWMudXBkYXRlKHtpZDogdG9waWMuX2lkfSwgdG9waWMpO1xuICAgIH07XG5cbiAgICAkc2NvcGUucmVtb3ZlVG9waWMgPSBmdW5jdGlvbiAodG9waWMpIHtcbiAgICAgICRzY29wZS5tZWV0aW5nLnRvcGljcy5zcGxpY2UoJHNjb3BlLm1lZXRpbmcudG9waWNzLmluZGV4T2YodG9waWMpLCAxKTtcblxuICAgICAgdG9waWMubWVldGluZ3Muc3BsaWNlKHRvcGljLm1lZXRpbmdzLmluZGV4T2YoJHNjb3BlLm1lZXRpbmcuX2lkKSwgMSk7XG4gICAgICBUb3BpY0ZhY3RvcnkuVG9waWMudXBkYXRlKHtpZDogdG9waWMuX2lkfSwgdG9waWMpO1xuICAgIH07XG5cbiAgICAkc2NvcGUuc2F2ZU1lZXRpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAkc2NvcGUuc3VjY2VzcyA9IFwiXCI7XG4gICAgICAkc2NvcGUuZXJyb3IgICA9IFwiXCI7XG5cbiAgICAgIGlmICghJHNjb3BlLm1lZXRpbmcudGl0bGUpe1xuICAgICAgICAkc2NvcGUuZXJyb3IgPSBcIlBsZWFzZSBlbnRlciBhIHRpdGxlLlwiO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIE1lZXRpbmdGYWN0b3J5LnVwZGF0ZSh7aWQ6ICRzY29wZS5tZWV0aW5nLl9pZH0sICRzY29wZS5tZWV0aW5nLCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAkc2NvcGUuc3VjY2VzcyA9IFwiTWVldGluZyBzYXZlZC5cIjtcblxuICAgICAgICAgIGlmICgkc2NvcGUudGltZW91dCkge1xuICAgICAgICAgICAgJHRpbWVvdXQuY2FuY2VsKCRzY29wZS50aW1lb3V0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkc2NvcGUudGltZW91dCA9ICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRzY29wZS5zdWNjZXNzID0gXCJcIjtcbiAgICAgICAgICB9LCAzMDAwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAkc2NvcGUuZXJyb3IgPSBcIlRoZXJlIHdhcyBhbiBlcnJvci4gUGxlYXNlIGNvbnRhY3QgdGhlIERldiBUZWFtIGFuZCBnaXZlIHRoZW0gdGhlIGRldGFpbHMgYWJvdXQgdGhlIGVycm9yLlwiO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmRlbGV0ZU1lZXRpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBtZWV0aW5nP1wiKSkge1xuICAgICAgICBNZWV0aW5nRmFjdG9yeS5kZWxldGUoe2lkOiAkc2NvcGUubWVldGluZy5faWR9LCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICBpZihyZXNwb25zZS5lcnJvcikge1xuICAgICAgICAgICAgJHNjb3BlLmVycm9yID0gXCJUaGVyZSB3YXMgYW4gZXJyb3IuIFBsZWFzZSBjb250YWN0IHRoZSBEZXYgVGVhbSBhbmQgZ2l2ZSB0aGVtIHRoZSBkZXRhaWxzIGFib3V0IHRoZSBlcnJvci5cIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkbG9jYXRpb24ucGF0aChcIi9tZWV0aW5ncy9cIik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgJHNjb3BlLnNob3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAkc2NvcGUuZGlzcGxheSA9ICgkc2NvcGUuc2VhcmNoVG9waWMgPyB0cnVlIDogZmFsc2UpO1xuICAgIH07XG5cbiAgICAkc2NvcGUuYWxyZWFkeUluTWVldGluZ0ZpbHRlciA9IGZ1bmN0aW9uICh0b3BpYykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAkc2NvcGUubWVldGluZy50b3BpY3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCRzY29wZS5tZWV0aW5nLnRvcGljc1tpXS5faWQgPT09IHRvcGljLl9pZCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgfVxufSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudGhlVG9vbENvbnRyb2xsZXIuY29udHJvbGxlcihcIkNyZWF0ZU1lbWJlckNvbnRyb2xsZXJcIiwgZnVuY3Rpb24gKCRyb290U2NvcGUsICRzY29wZSwgJGh0dHAsICRsb2NhdGlvbiwgJHJvdXRlUGFyYW1zLCBNZW1iZXJGYWN0b3J5KSB7XG5cbiAkcm9vdFNjb3BlLnVwZGF0ZS50aW1lb3V0KHJ1bkNvbnRyb2xsZXIpO1xuXG4gIGZ1bmN0aW9uIHJ1bkNvbnRyb2xsZXIoKXtcblxuICAgICRzY29wZS5mb3JtRGF0YSA9IHt9O1xuICAgICRzY29wZS5mb3JtRGF0YS5yb2xlcyA9IFtdO1xuICAgICRzY29wZS5mb3JtRGF0YS5waG9uZXMgPSBbXTtcblxuICAgICRzY29wZS5zdWJtaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBtZW1iZXJEYXRhID0gdGhpcy5mb3JtRGF0YTtcblxuICAgICAgTWVtYmVyRmFjdG9yeS5NZW1iZXIuY3JlYXRlKG1lbWJlckRhdGEsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmKHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgJHNjb3BlLmVycm9yID0gcmVzcG9uc2UuZXJyb3I7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSByZXNwb25zZS5tZXNzYWdlO1xuICAgICAgICAgICRsb2NhdGlvbi5wYXRoKFwiL21lbWJlci9cIiArIHJlc3BvbnNlLmlkKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuXG59KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG50aGVUb29sQ29udHJvbGxlci5jb250cm9sbGVyKFwiTWVtYmVyRW1iZWRDb250cm9sbGVyXCIsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkc2NvcGUpIHtcblxuICAkcm9vdFNjb3BlLnVwZGF0ZS50aW1lb3V0KHJ1bkNvbnRyb2xsZXIpO1xuXG4gIGZ1bmN0aW9uIHJ1bkNvbnRyb2xsZXIoKXtcblxuICB9XG5cbn0pO1xuIiwicmVxdWlyZSgnLi9tZW1iZXIuanMnKTtcbnJlcXVpcmUoJy4vbGlzdC5qcycpO1xucmVxdWlyZSgnLi9jcmVhdGUuanMnKTtcbnJlcXVpcmUoJy4vZW1iZWQuanMnKTsiLCJcInVzZSBzdHJpY3RcIjtcblxudGhlVG9vbENvbnRyb2xsZXIuY29udHJvbGxlcihcIk1lbWJlcnNDb250cm9sbGVyXCIsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkc2NvcGUsIE1lbWJlckZhY3RvcnkpIHtcbiAgXG4gICRyb290U2NvcGUudXBkYXRlLnRpbWVvdXQocnVuQ29udHJvbGxlcik7XG5cbiAgZnVuY3Rpb24gcnVuQ29udHJvbGxlcigpe1xuICAgIE1lbWJlckZhY3RvcnkuTWVtYmVyLmdldEFsbChmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICRzY29wZS5tZW1iZXJQcmVkaWNhdGUgPSBcIm5hbWVcIjtcbiAgICAgICRzY29wZS5yZXZlcnNlID0gZmFsc2U7XG4gICAgICAkc2NvcGUubWVtYmVycyA9IHJlc3BvbnNlO1xuICAgIH0pO1xuICB9XG59KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG50aGVUb29sQ29udHJvbGxlci5jb250cm9sbGVyKFwiTWVtYmVyQ29udHJvbGxlclwiLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHNjb3BlLCAkaHR0cCwgJHJvdXRlUGFyYW1zLCAkc2NlLCAkbG9jYXRpb24sIE1lbWJlckZhY3RvcnkpIHtcblxuICAkcm9vdFNjb3BlLnVwZGF0ZS50aW1lb3V0KHJ1bkNvbnRyb2xsZXIpO1xuXG4gIGZ1bmN0aW9uIHJ1bkNvbnRyb2xsZXIoKXtcblxuICAgICRzY29wZS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgIGlmICgkcm91dGVQYXJhbXMuaWQgPT09IFwibWVcIikge1xuICAgICAgJGxvY2F0aW9uLnBhdGgoXCIvbWVtYmVyL1wiICsgJHNjb3BlLm1lLmlkKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAkc2NvcGUubWVtYmVyID0gJHNjb3BlLmZvcm1EYXRhID0gJHNjb3BlLmdldE1lbWJlcigkcm91dGVQYXJhbXMuaWQpO1xuXG4gICAgTWVtYmVyRmFjdG9yeS5NZW1iZXIuZ2V0KHtpZDokcm91dGVQYXJhbXMuaWR9LCBmdW5jdGlvbihyZXN1bHQpIHsgXG4gICAgICBpZighcmVzdWx0LmVycm9yKSB7XG4gICAgICAgICRzY29wZS5tZW1iZXIgPSAkc2NvcGUuZm9ybURhdGEgPSByZXN1bHQ7XG4gICAgICAgIGdldE1lbWJlclN0dWZmKCk7XG4gICAgICB9IFxuICAgIH0pO1xuXG4gICAgZ2V0TWVtYmVyU3R1ZmYoKTtcblxuICAgIGZ1bmN0aW9uIGdldE1lbWJlclN0dWZmKCkge1xuICAgICAgaWYoJHNjb3BlLmNvbXBhbmllcyAmJiAkc2NvcGUuc3BlYWtlcnMgJiYgJHNjb3BlLmNvbW1lbnRzICYmICRzY29wZS5jb21wYW5pZXMubGVuZ3RoID4gMCAmJiAkc2NvcGUuc3BlYWtlcnMubGVuZ3RoID4gMCAmJiAkc2NvcGUuY29tbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZ2V0TWVtYmVyU3R1ZmYsIDEwMDApO1xuICAgICAgfVxuXG4gICAgICAkc2NvcGUubWVtYmVyU3R1ZmYgPSB7fTtcblxuICAgICAgJHNjb3BlLm1lbWJlclN0dWZmLmNvbXBhbmllcyA9ICRzY29wZS5jb21wYW5pZXMuZmlsdGVyKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcmV0dXJuIGUubWVtYmVyID09ICRzY29wZS5tZW1iZXIuaWQ7XG4gICAgICB9KVxuXG4gICAgICAkc2NvcGUubWVtYmVyU3R1ZmYuc3BlYWtlcnMgPSAkc2NvcGUuc3BlYWtlcnMuZmlsdGVyKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcmV0dXJuIGUubWVtYmVyID09ICRzY29wZS5tZW1iZXIuaWQ7XG4gICAgICB9KVxuXG4gICAgICAkc2NvcGUubWVtYmVyU3R1ZmYuY29tbWVudHMgPSAkc2NvcGUuY29tbWVudHMuZmlsdGVyKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcmV0dXJuIGUubWVtYmVyID09ICRzY29wZS5tZW1iZXIuaWQ7XG4gICAgICB9KVxuICAgIH1cblxuXG4gICAgJHNjb3BlLnN1Ym1pdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG1lbWJlckRhdGEgPSB0aGlzLmZvcm1EYXRhO1xuXG4gICAgICBNZW1iZXJGYWN0b3J5Lk1lbWJlci51cGRhdGUoeyBpZDptZW1iZXJEYXRhLmlkIH0sIG1lbWJlckRhdGEsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmKHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgJHNjb3BlLmVycm9yID0gcmVzcG9uc2UuZXJyb3I7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSByZXNwb25zZS5zdWNjZXNzO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59KTtcbiIsInJlcXVpcmUoJy4vc2Vzc2lvbi5qcycpO1xucmVxdWlyZSgnLi9zZXNzaW9ucy5qcycpO1xucmVxdWlyZSgnLi92aWV3LmpzJyk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnRoZVRvb2xDb250cm9sbGVyXG4uY29udHJvbGxlcignU2Vzc2lvbkNvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHNjb3BlLCAkaHR0cCwgJHJvdXRlUGFyYW1zLCAkbG9jYXRpb24sIFNlc3Npb25GYWN0b3J5KSB7XG5cbiAgICB2YXIgb3B0aW9ucyA9IHJlcXVpcmUoJy4vLi4vLi4vLi4vLi4vLi4vb3B0aW9ucy5qcycpO1xuICAgIHZhciBpbml0aWFsRGF0ZVBpY2tlcjtcbiAgICB2YXIgZmluYWxEYXRlUGlja2VyO1xuICAgIHZhciBteVZhbGlkYXRvcjtcbiAgICAkc2NvcGUuYWxsRGF5ID0gZmFsc2U7XG4gICAgJHNjb3BlLmZvcm1EYXRhID0ge1xuICAgICAgICBuYW1lOiBcIlwiLFxuICAgICAgICBraW5kOiBcIlwiLFxuICAgICAgICB1cmw6IFwiXCIsXG4gICAgICAgIHBsYWNlOiBcIlwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgIH1cblxuICAgICRzY29wZS5ob3Vyc0xpc3QgPSBbXTtcbiAgICAkc2NvcGUubWludXRlc0xpc3QgPSBbXTtcbiAgICAkc2NvcGUuc2Vzc2lvbnNLaW5kID0gb3B0aW9ucy5zZXNzaW9uLmtpbmQ7XG4gICAgJHNjb3BlLnNwZWFrZXJzTGlzdCA9IFt7XG4gICAgICAgIGlkOiBcIlwiLFxuICAgICAgICBuYW1lOiBcIlwiLFxuICAgICAgICBwb3NpdGlvbjogXCJcIixcbiAgICAgICAgc2hvdzogZmFsc2VcbiAgICB9XTtcblxuICAgICRzY29wZS5jb21wYW5pZXNMaXN0ID0gW3tcbiAgICAgICAgaWQ6IFwiXCIsXG4gICAgICAgIG5hbWU6IFwiXCIsXG4gICAgICAgIHNob3c6IGZhbHNlXG4gICAgfV07XG5cbiAgICAkc2NvcGUuZGF0ZSA9IHtcbiAgICAgICAgaW5pdGlhbERhdGUgOiB7XG4gICAgICAgICAgICBob3VyczogXCJcIixcbiAgICAgICAgICAgIG1pbnV0ZXM6IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgZmluYWxEYXRlOiB7XG4gICAgICAgICAgICBob3VyczogXCJcIixcbiAgICAgICAgICAgIG1pbnV0ZXM6IFwiXCJcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBpbml0RGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDw9IDIzOyBpKyspe1xuICAgICAgICAgICAgJHNjb3BlLmhvdXJzTGlzdC5wdXNoKGkpO1xuICAgICAgICB9XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPD0gNTk7IGkrPTUpe1xuICAgICAgICAgICAgJHNjb3BlLm1pbnV0ZXNMaXN0LnB1c2goaSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaW5pdERhdGUoKTtcblxuICAgICAgICBpZiAoJHJvdXRlUGFyYW1zLmlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHZhciBzZXNzaW9uID0gJHNjb3BlLmdldFNlc3Npb24oJHJvdXRlUGFyYW1zLmlkKTtcblxuICAgICAgICAgICAgJHNjb3BlLmZvcm1EYXRhID0ge1xuICAgICAgICAgICAgICAgIG5hbWU6IHNlc3Npb24ubmFtZSxcbiAgICAgICAgICAgICAgICBraW5kOiBzZXNzaW9uLmtpbmQsXG4gICAgICAgICAgICAgICAgdXJsOiBzZXNzaW9uLnVybCxcbiAgICAgICAgICAgICAgICBwbGFjZTogc2Vzc2lvbi5wbGFjZSxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogc2Vzc2lvbi5kZXNjcmlwdGlvblxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJHNjb3BlLnNwZWFrZXJzTGlzdCA9IHNlc3Npb24uc3BlYWtlcnM7XG4gICAgICAgICAgICAkc2NvcGUuY29tcGFuaWVzTGlzdCA9ICBzZXNzaW9uLmNvbXBhbmllcztcbiAgICAgICAgICAgICRzY29wZS5kYXRlLmluaXRpYWxEYXRlID0gc2Vzc2lvbi5pbml0aWFsRGF0ZTtcbiAgICAgICAgICAgICRzY29wZS5kYXRlLmZpbmFsRGF0ZSA9IHNlc3Npb24uZmluYWxEYXRlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdCgpXG5cblxuICAgICRzY29wZS5hZGRTcGVha2VyUm93ID0gZnVuY3Rpb24gKCnCoCB7XG4gICAgICAgICRzY29wZS5zcGVha2Vyc0xpc3QucHVzaCh7XG4gICAgICAgICAgICBpZDogXCJcIixcbiAgICAgICAgICAgIG5hbWU6IFwiXCIsXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJcIixcbiAgICAgICAgICAgIHNob3c6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAkc2NvcGUucmVtb3ZlU3BlYWtlclJvdyA9IGZ1bmN0aW9uIChzcGVha2VyKSB7XG4gICAgICAgIHZhciB0ZXN0VG9SZW1vdmUgPSBmdW5jdGlvbihlbDEsIGVsMil7XG4gICAgICAgICAgICBpZihlbDEuaWQgPT0gZWwyLmlkICYmIGVsMS5uYW1lID09IGVsMi5uYW1lICYmIGVsMS5wb3NpdGlvbiA9PSBlbDIucG9zaXRpb24pe1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJlbW92ZUVsZW1lbnRGcm9tTGlzdCgkc2NvcGUuc3BlYWtlcnNMaXN0LCBzcGVha2VyLCB0ZXN0VG9SZW1vdmUpO1xuICAgIH07XG5cbiAgICAkc2NvcGUuYWRkU3BlYWtlciA9IGZ1bmN0aW9uKGlkeCwgbmFtZSwgaWQpIHtcbiAgICAgICAgJHNjb3BlLnNwZWFrZXJzTGlzdFtpZHhdLm5hbWUgPSBuYW1lO1xuICAgICAgICAkc2NvcGUuc3BlYWtlcnNMaXN0W2lkeF0uaWQgPSBpZDtcbiAgICAgICAgJHNjb3BlLnNwZWFrZXJzTGlzdFtpZHhdLnNob3cgPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnNob3dTcGVha2VycyA9IGZ1bmN0aW9uKGlkeCkge1xuICAgICAgICAkc2NvcGUuc3BlYWtlcnNMaXN0W2lkeF0uc2hvdyA9ICgkc2NvcGUuc3BlYWtlcnNMaXN0W2lkeF0ubmFtZSA/ICB0cnVlIDogZmFsc2UpO1xuICAgIH07XG5cbiAgICAkc2NvcGUuYWRkQ29tcGFueVJvdyA9IGZ1bmN0aW9uICgpwqAge1xuICAgICAgICAkc2NvcGUuY29tcGFuaWVzTGlzdC5wdXNoKHtcbiAgICAgICAgICAgIGlkOiBcIlwiLFxuICAgICAgICAgICAgbmFtZTogXCJcIixcbiAgICAgICAgICAgIHNob3c6IGZhbHNlXG4gICAgICAgIH0pXG4gICAgfTtcblxuICAgICRzY29wZS5yZW1vdmVDb21wYW55Um93ID0gZnVuY3Rpb24gKGNvbXBhbnkpIHtcbiAgICAgICAgdmFyIHRlc3RUb1JlbW92ZSA9IGZ1bmN0aW9uKGVsMSwgZWwyKXtcbiAgICAgICAgICAgIGlmKGVsMS5pZCA9PSBlbDIuaWQgJiYgZWwxLm5hbWUgPT0gZWwyLm5hbWUpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJlbW92ZUVsZW1lbnRGcm9tTGlzdCgkc2NvcGUuY29tcGFuaWVzTGlzdCwgY29tcGFueSwgdGVzdFRvUmVtb3ZlKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmFkZENvbXBhbnkgPSBmdW5jdGlvbihpZHgsIG5hbWUsIGlkKSB7XG4gICAgICAgICRzY29wZS5jb21wYW5pZXNMaXN0W2lkeF0ubmFtZSA9IG5hbWU7XG4gICAgICAgICRzY29wZS5jb21wYW5pZXNMaXN0W2lkeF0uaWQgPSBpZDtcbiAgICAgICAgJHNjb3BlLmNvbXBhbmllc0xpc3RbaWR4XS5zaG93ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgJHNjb3BlLnNob3dDb21wYW5pZXMgPSBmdW5jdGlvbihpZHgpIHtcblxuICAgICAgICAkc2NvcGUuY29tcGFuaWVzTGlzdFtpZHhdLnNob3cgPSAoJHNjb3BlLmNvbXBhbmllc0xpc3RbaWR4XS5uYW1lID8gIHRydWUgOiBmYWxzZSk7XG4gICAgfVxuXG4gICAgJHNjb3BlLnN1Ym1pdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVudHJlaVwiKTtcbiAgICAgICAgY29uc29sZS5sb2cobXlWYWxpZGF0b3IudmFsaWRhdGUoKSk7XG4gICAgICAgIGlmKG15VmFsaWRhdG9yLnZhbGlkYXRlKCkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHZhciBpbml0aWFsRGF0ZSA9IGluaXRpYWxEYXRlUGlja2VyLmdldERhdGUoKTtcbiAgICAgICAgICAgIHZhciBmaW5hbERhdGUgPSBmaW5hbERhdGVQaWNrZXIuZ2V0RGF0ZSgpO1xuXG4gICAgICAgICAgICBpZighJHNjb3BlLmFsbERheSl7XG4gICAgICAgICAgICAgICAgaW5pdGlhbERhdGUuc2V0SG91cnMoJHNjb3BlLmRhdGUuaW5pdGlhbERhdGUuaG91cnMpO1xuICAgICAgICAgICAgICAgIGluaXRpYWxEYXRlLnNldE1pbnV0ZXMoJHNjb3BlLmRhdGUuaW5pdGlhbERhdGUubWludXRlcyk7IFxuICAgICAgICAgICAgICAgIGZpbmFsRGF0ZS5zZXRIb3Vycygkc2NvcGUuZGF0ZS5maW5hbERhdGUuaG91cnMpO1xuICAgICAgICAgICAgICAgIGZpbmFsRGF0ZS5zZXRNaW51dGVzKCRzY29wZS5kYXRlLmZpbmFsRGF0ZS5taW51dGVzKTsgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHNlc3Npb25EYXRhID0ge1xuICAgICAgICAgICAgICAgIG5hbWU6ICRzY29wZS5mb3JtRGF0YS5uYW1lLFxuICAgICAgICAgICAgICAgIGtpbmQ6ICRzY29wZS5mb3JtRGF0YS5raW5kLFxuICAgICAgICAgICAgICAgIGltZzogJHNjb3BlLmZvcm1EYXRhLmltZyxcbiAgICAgICAgICAgICAgICBwbGFjZTogJHNjb3BlLmZvcm1EYXRhLnBsYWNlLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAkc2NvcGUuZm9ybURhdGEuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgc3BlYWtlcnM6ICRzY29wZS5zcGVha2Vyc0xpc3QsXG4gICAgICAgICAgICAgICAgY29tcGFuaWVzOiAkc2NvcGUuY29tcGFuaWVzTGlzdCxcbiAgICAgICAgICAgICAgICBhbGxEYXk6ICRzY29wZS5hbGxEYXksXG4gICAgICAgICAgICAgICAgaW5pdGlhbERhdGU6IGluaXRpYWxEYXRlLFxuICAgICAgICAgICAgICAgIGZpbmFsRGF0ZTogZmluYWxEYXRlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzZXNzaW9uRGF0YSk7XG5cbiAgICAgICAgICAgIFNlc3Npb25GYWN0b3J5LlNlc3Npb24uY3JlYXRlKHNlc3Npb25EYXRhLCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICBpZihyZXNwb25zZS5lcnJvcikge1xuICAgICAgICAgICAgICAgICRzY29wZS5lcnJvciA9IHJlc3BvbnNlLmVycm9yO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICRzY29wZS5tZXNzYWdlID0gcmVzcG9uc2UubWVzc2FnZTtcblxuICAgICAgICAgICAgICAgIFNlc3Npb25GYWN0b3J5LlNlc3Npb24uZ2V0QWxsKGZ1bmN0aW9uIChzZXNzaW9ucykge1xuICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlc3Npb25zID0gc2Vzc2lvbnM7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8kbG9jYXRpb24ucGF0aChcIi9zZXNzaW9ucy9cIiArIHJlc3BvbnNlLmlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgcmVtb3ZlRWxlbWVudEZyb21MaXN0ID0gZnVuY3Rpb24obGlzdCwgZWwsIHRlc3RGdW5jdGlvbil7XG4gICAgICAgIGlmKGNvbmZpcm0oXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gcmVtb3ZlP1wiKSl7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSAtMTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0ZXN0RnVuY3Rpb24obGlzdFtpXSwgZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgICAgICBsaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBJbmsucmVxdWlyZU1vZHVsZXMoWydJbmsuRG9tLlNlbGVjdG9yXzEnLCdJbmsuVUkuRGF0ZVBpY2tlcl8xJ10sZnVuY3Rpb24oU2VsZWN0b3IsIERhdGVQaWNrZXIpe1xuICAgICAgICBpbml0aWFsRGF0ZVBpY2tlciA9IG5ldyBEYXRlUGlja2VyKCcjaW5pdGlhbERhdGUnKTtcbiAgICAgICAgZmluYWxEYXRlUGlja2VyID0gbmV3IERhdGVQaWNrZXIoJyNmaW5hbERhdGUnKTtcbiAgICB9KTtcblxuICAgIEluay5yZXF1aXJlTW9kdWxlcyggWydJbmsuVUkuRm9ybVZhbGlkYXRvcl8yJywgJ0luay5Eb20uU2VsZWN0b3JfMSddLCBmdW5jdGlvbihGb3JtVmFsaWRhdG9yLCBTZWxlY3Rvcil7XG4gICAgICAgIEZvcm1WYWxpZGF0b3Iuc2V0UnVsZSgnY2hvb3NlS2luZCcsICdTZWxlY3Qgb25lIG9wdGlvbi4nLCBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLmZvcm1EYXRhLmtpbmQgIT09IFwiXCI7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIEZvcm1WYWxpZGF0b3Iuc2V0UnVsZSgnY2hvb3NlRGF0ZScsICdTZWxlY3QgYSB2YWxpZCBkYXRlLicsIGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICAgIHJldHVybiAgJHNjb3BlLmFsbERheSB8fCAoISRzY29wZS5hbGxEYXkgXG4gICAgICAgICAgICAgICAgJiYgJHNjb3BlLmRhdGUuaW5pdGlhbERhdGUuaG91cnMgIT09IFwiXCIgXG4gICAgICAgICAgICAgICAgJiYgJHNjb3BlLmRhdGUuaW5pdGlhbERhdGUubWludXRlcyAhPT0gXCJcIlxuICAgICAgICAgICAgICAgICYmICRzY29wZS5kYXRlLmZpbmFsRGF0ZS5ob3VycyAhPT0gXCJcIiBcbiAgICAgICAgICAgICAgICAmJiAkc2NvcGUuZGF0ZS5maW5hbERhdGUubWludXRlcyAhPT0gXCJcIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG15VmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3IoJyNteUZvcm0nKTtcbiAgICB9KTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG50aGVUb29sQ29udHJvbGxlclxuLmNvbnRyb2xsZXIoJ1Nlc3Npb25zQ29udHJvbGxlcicsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkc2NvcGUsICRsb2NhdGlvbiwgJHdpbmRvdywgJHJvdXRlUGFyYW1zLCAkc2NlLCBTZXNzaW9uRmFjdG9yeSl7XG5cbiAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PUlOSVRJQUxJWkFUSU9OPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgdmFyIG9wdGlvbnMgPSByZXF1aXJlKCcuLy4uLy4uLy4uLy4uLy4uL29wdGlvbnMuanMnKTtcbiAgJHNjb3BlLmV2ZW50U291cmNlcyA9IFtdO1xuXG4gIC8qIGNvbmZpZyBvYmplY3QgKi9cbiAgJHNjb3BlLnVpQ29uZmlnID0ge1xuICAgIGNhbGVuZGFyOntcbiAgICAgIGhlaWdodDogNjUwLFxuICAgICAgZXZlbnRMaW1pdDogdHJ1ZSxcbiAgICAgIGhlYWRlcjp7XG4gICAgICAgIGxlZnQ6ICdwcmV2LCBuZXh0IHRvZGF5JyxcbiAgICAgICAgY2VudGVyOiAndGl0bGUnLFxuICAgICAgICByaWdodDogJ21vbnRoLGFnZW5kYVdlZWssYWdlbmRhRGF5J1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09RlVOQ1RJT05TPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgZ2V0S2luZENvbG9yID0gZnVuY3Rpb24oaWQpIHtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgb3B0aW9ucy5zZXNzaW9uLmtpbmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmKG9wdGlvbnMuc2Vzc2lvbi5raW5kW2ldLmlkID09IGlkKcKge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5zZXNzaW9uLmtpbmRbaV0uY29sb3I7XG4gICAgICB9IFxuICAgIH1cbiAgfVxuXG4gIHZhciBnZXRTZXNzaW9ucyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBldmVudHMgPSBbXTtcbiAgICBpZigkc2NvcGUuc2Vzc2lvbnMpe1xuICAgICAgZm9yKHZhciBpID0gMDsgaSA8ICRzY29wZS5zZXNzaW9ucy5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGV2ZW50cy5wdXNoKHtcbiAgICAgICAgICBpZDogJHNjb3BlLnNlc3Npb25zW2ldLmlkICxcbiAgICAgICAgICB0aXRsZTogJHNjb3BlLnNlc3Npb25zW2ldLm5hbWUsXG4gICAgICAgICAgYWxsRGF5OiAkc2NvcGUuc2Vzc2lvbnNbaV0uYWxsRGF5LFxuICAgICAgICAgIGNvbG9yOiBnZXRLaW5kQ29sb3IoJHNjb3BlLnNlc3Npb25zW2ldLmtpbmQpLFxuICAgICAgICAgIHN0YXJ0OiBuZXcgRGF0ZSgkc2NvcGUuc2Vzc2lvbnNbaV0uaW5pdGlhbERhdGUpLFxuICAgICAgICAgIGVuZDogbmV3IERhdGUoJHNjb3BlLnNlc3Npb25zW2ldLmZpbmFsRGF0ZSksXG4gICAgICAgICAgdXJsIDogXCIjL3Nlc3Npb24vXCIgKyAkc2NvcGUuc2Vzc2lvbnNbaV0uX2lkXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICByZXR1cm4gZXZlbnRzXG4gICAgfVxuICB9XG5cbiAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVNDT1BFIEZVTkNUSU9OUz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgJHNjb3BlLmV2ZW50U291cmNlcy5wdXNoKGdldFNlc3Npb25zKCkpO1xuXG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxudGhlVG9vbENvbnRyb2xsZXJcbi5jb250cm9sbGVyKCdWaWV3U2Vzc2lvbkNvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHNjb3BlLCAkaHR0cCwgJHJvdXRlUGFyYW1zLCAkbG9jYXRpb24pIHtcblxuXHQkc2NvcGUuc2Vzc2lvbiA9ICRzY29wZS5nZXRTZXNzaW9uKCRyb3V0ZVBhcmFtcy5pZCk7XG5cbn0pOyIsIid1c2Ugc3RyaWN0JztcblxudGhlVG9vbENvbnRyb2xsZXJcbiAgLmNvbnRyb2xsZXIoJ1NwZWFrZXJFbWFpbENvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHNjb3BlLCAkaHR0cCwgJHJvdXRlUGFyYW1zLCAkc2NlLCAkbG9jYXRpb24sIEVtYWlsRmFjdG9yeSkge1xuXG4gICAgJHJvb3RTY29wZS51cGRhdGUudGltZW91dChydW5Db250cm9sbGVyKTtcblxuICAgIGZ1bmN0aW9uIHJ1bkNvbnRyb2xsZXIoKXtcblxuICAgICAgJHNjb3BlLmVtYWlsID0gJGxvY2F0aW9uLnNlYXJjaCgpLmVtYWlsO1xuICAgICAgJHNjb3BlLnNwZWFrZXJJZCA9ICRyb3V0ZVBhcmFtcy5pZDtcbiAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAkc2NvcGUuZXJyb3IgPSBudWxsO1xuICAgICAgJHNjb3BlLm1lc3NhZ2UgPSBudWxsO1xuXG4gICAgICAkc2NvcGUuc3VibWl0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRzY29wZS5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgJHNjb3BlLmVycm9yID0gbnVsbDtcbiAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSBudWxsO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJzZW5kIGVtYWlsIHRvIFwiLCAkc2NvcGUuZW1haWwsIFwiIGZyb20gXCIsICRzY29wZS5zcGVha2VySWQpO1xuXG4gICAgICAgIEVtYWlsRmFjdG9yeS5TcGVha2VyLnNlbmQoeyBpZDogJHNjb3BlLnNwZWFrZXJJZCB9LCB7IGVtYWlsOiAkc2NvcGUuZW1haWwgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgIGlmKHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgICAkc2NvcGUuZXJyb3IgPSByZXNwb25zZS5lcnJvcjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSByZXNwb25zZS5tZXNzYWdlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH1cbiAgfSk7XG4iLCIndXNlIHN0cmljdCc7XG4gXG50aGVUb29sQ29udHJvbGxlclxuICAuY29udHJvbGxlcignQ3JlYXRlU3BlYWtlckNvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHNjb3BlLCAkaHR0cCwgJHJvdXRlUGFyYW1zLCAkbG9jYXRpb24sIFNwZWFrZXJGYWN0b3J5KSB7XG4gICAgXG4gICAgJHJvb3RTY29wZS51cGRhdGUudGltZW91dChydW5Db250cm9sbGVyKTtcblxuICAgIGZ1bmN0aW9uIHJ1bkNvbnRyb2xsZXIoKXtcblxuICAgICAgJHNjb3BlLnN1Ym1pdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc3BlYWtlckRhdGEgPSB0aGlzLmZvcm1EYXRhO1xuXG4gICAgICAgIHNwZWFrZXJEYXRhLnN0YXR1cyA9ICdTdWdnZXN0aW9uJztcblxuICAgICAgICBTcGVha2VyRmFjdG9yeS5TcGVha2VyLmNyZWF0ZShzcGVha2VyRGF0YSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICBpZihyZXNwb25zZS5lcnJvcikge1xuICAgICAgICAgICAgJHNjb3BlLmVycm9yID0gcmVzcG9uc2UuZXJyb3I7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRzY29wZS5tZXNzYWdlID0gcmVzcG9uc2UubWVzc2FnZTtcblxuICAgICAgICAgICAgU3BlYWtlckZhY3RvcnkuU3BlYWtlci5nZXRBbGwoZnVuY3Rpb24gKHNwZWFrZXJzKSB7XG4gICAgICAgICAgICAgICRzY29wZS5zcGVha2VycyA9IHNwZWFrZXJzO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKFwiL3NwZWFrZXIvXCIgKyByZXNwb25zZS5pZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfVxuICB9KTsiLCIndXNlIHN0cmljdCc7XG5cbnRoZVRvb2xDb250cm9sbGVyLmNvbnRyb2xsZXIoJ1NwZWFrZXJFbWJlZENvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHNjb3BlKSB7XG5cbiAgJHJvb3RTY29wZS51cGRhdGUudGltZW91dChydW5Db250cm9sbGVyKTtcblxuICBmdW5jdGlvbiBydW5Db250cm9sbGVyKCl7XG5cbiAgICBpZigkc2NvcGUuY29tbWVudHMpIHtcbiAgICAgICRzY29wZS5zcGVha2VyLmNvbW1lbnRzID0gJHNjb3BlLmNvbW1lbnRzLmZpbHRlcihmdW5jdGlvbihlKSB7XG4gICAgICAgIHJldHVybiBlLnRocmVhZCA9PSAnc3BlYWtlci0nKyRzY29wZS5zcGVha2VyLmlkO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYoJHNjb3BlLmV2ZW50KSB7XG4gICAgICAkc2NvcGUucGFydGljaXBhdGlvbiA9ICRzY29wZS5zcGVha2VyLnBhcnRpY2lwYXRpb25zLmZpbHRlcihmdW5jdGlvbihvKSB7XG4gICAgICAgIHJldHVybiBvLmV2ZW50ID09ICRzY29wZS5ldmVudC5pZDtcbiAgICAgIH0pWzBdO1xuICAgIH1cblxuICAgICRzY29wZS5nZXRVbnJlYWROb3RpZmljYXRpb25zID0gZnVuY3Rpb24gKHRocmVhZCkge1xuICAgICAgdmFyIG5vdGlmaWNhdGlvbnMgPSAkc2NvcGUubm90aWZpY2F0aW9ucy5maWx0ZXIoZnVuY3Rpb24obykge1xuICAgICAgICByZXR1cm4gby50aHJlYWQgPT0gdGhyZWFkO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbm90aWZpY2F0aW9ucztcbiAgICB9O1xuXG4gICAgJHNjb3BlLnNwZWFrZXIudW5yZWFkID0gJHNjb3BlLmdldFVucmVhZE5vdGlmaWNhdGlvbnMoJ3NwZWFrZXItJyArICRzY29wZS5zcGVha2VyLmlkKS5sZW5ndGggPiAwO1xuXG4gICAgJHNjb3BlLmdldE1lbWJlciA9IGZ1bmN0aW9uIChtZW1iZXJJZCkge1xuICAgICAgdmFyIG1lbWJlciA9ICRzY29wZS5tZW1iZXJzLmZpbHRlcihmdW5jdGlvbihvKSB7XG4gICAgICAgIHJldHVybiBvLmlkID09IG1lbWJlcklkO1xuICAgICAgfSk7XG5cbiAgICAgIGlmKG1lbWJlci5sZW5ndGg+MCkge1xuICAgICAgICByZXR1cm4gbWVtYmVyWzBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBuYW1lOiAnTm8gb25lJyxcbiAgICAgICAgICBmYWNlYm9vazogJzEwMDAwMDQ1NjMzNTk3MidcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgJHNjb3BlLnRpbWVTaW5jZSA9ZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgIHZhciBzZWNvbmRzID0gTWF0aC5mbG9vcigoRGF0ZS5ub3coKSAtIGRhdGUpIC8gMTAwMCk7XG5cbiAgICAgIHZhciBzdWZmaXggPSAnYWdvJztcbiAgICAgIGlmKHNlY29uZHMgPCAwKXtcbiAgICAgICAgc2Vjb25kcyA9IE1hdGguYWJzKHNlY29uZHMpO1xuICAgICAgICBzdWZmaXggPSAndG8gZ28nO1xuICAgICAgfVxuXG4gICAgICB2YXIgaW50ZXJ2YWwgPSBNYXRoLmZsb29yKHNlY29uZHMgLyAzMTUzNjAwMCk7XG5cbiAgICAgIGlmIChpbnRlcnZhbCA+IDEpIHtcbiAgICAgICAgICByZXR1cm4gaW50ZXJ2YWwgKyAnIHllYXJzICcgKyBzdWZmaXg7XG4gICAgICB9XG4gICAgICBpbnRlcnZhbCA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDI1OTIwMDApO1xuICAgICAgaWYgKGludGVydmFsID4gMSkge1xuICAgICAgICAgIHJldHVybiBpbnRlcnZhbCArICcgbW9udGhzICcgKyBzdWZmaXg7XG4gICAgICB9XG4gICAgICBpbnRlcnZhbCA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDg2NDAwKTtcbiAgICAgIGlmIChpbnRlcnZhbCA+IDEpIHtcbiAgICAgICAgICByZXR1cm4gaW50ZXJ2YWwgKyAnIGRheXMgJyArIHN1ZmZpeDtcbiAgICAgIH1cbiAgICAgIGludGVydmFsID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gMzYwMCk7XG4gICAgICBpZiAoaW50ZXJ2YWwgPiAxKSB7XG4gICAgICAgICAgcmV0dXJuIGludGVydmFsICsgJyBob3VycyAnICsgc3VmZml4O1xuICAgICAgfVxuICAgICAgaW50ZXJ2YWwgPSBNYXRoLmZsb29yKHNlY29uZHMgLyA2MCk7XG4gICAgICBpZiAoaW50ZXJ2YWwgPiAxKSB7XG4gICAgICAgICAgcmV0dXJuIGludGVydmFsICsgJyBtaW51dGVzICcgKyBzdWZmaXg7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihzZWNvbmRzKSArICcgc2Vjb25kcyAnICsgc3VmZml4O1xuICAgIH07XG4gIH1cblxufSk7XG4iLCJyZXF1aXJlKCcuL3NwZWFrZXIuanMnKTtcbnJlcXVpcmUoJy4vbGlzdC5qcycpO1xucmVxdWlyZSgnLi9jcmVhdGUuanMnKTtcbnJlcXVpcmUoJy4vY29uZmlybS5qcycpO1xucmVxdWlyZSgnLi9lbWJlZC5qcycpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG50aGVUb29sQ29udHJvbGxlclxuICAuY29udHJvbGxlcignU3BlYWtlcnNDb250cm9sbGVyJywgZnVuY3Rpb24gKCRyb290U2NvcGUsICRzY29wZSwgJGh0dHAsICRzY2UsIFNwZWFrZXJGYWN0b3J5KSB7XG5cbiAgICAkcm9vdFNjb3BlLnVwZGF0ZS50aW1lb3V0KHJ1bkNvbnRyb2xsZXIpO1xuXG4gICAgZnVuY3Rpb24gcnVuQ29udHJvbGxlcigpe1xuXG4gICAgICAkc2NvcGUubGltaXQgPSAyMDtcblxuICAgICAgJHNjb3BlLnN0YXR1c2VzID0gWydTdWdnZXN0aW9uJywnU2VsZWN0ZWQnLCdBcHByb3ZlZCcsJ0NvbnRhY3RlZCcsJ0luIENvbnZlcnNhdGlvbnMnLCdBY2NlcHRlZCcsJ1JlamVjdGVkJywnR2l2ZSBVcCddO1xuXG4gICAgICAkc2NvcGUuc3BlYWtlclByZWRpY2F0ZSA9ICd1cGRhdGVkJztcbiAgICAgICRzY29wZS5yZXZlcnNlID0gJ3RydWUnO1xuICAgICAgJHNjb3BlLmZpbHRlcmVkU3BlYWtlcnMgPSBbXTtcbiAgICAgICRzY29wZS5zZWFyY2hTcGVha2VycyA9IHt1bmFzc2lnbmVkOiB0cnVlLCB1bmFzc2lnbmVkT25seTogZmFsc2V9O1xuICAgICAgJHNjb3BlLnVucmVhZEZpcnN0ID0gdHJ1ZTtcblxuXG5cbiAgICAgIFNwZWFrZXJGYWN0b3J5LlNwZWFrZXIuZ2V0QWxsKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICRzY29wZS5zcGVha2VycyA9IHJlc3BvbnNlO1xuICAgICAgICAvLyRzY29wZS5maWx0ZXJlZFNwZWFrZXJzID0gJHNjb3BlLnNwZWFrZXJzO1xuICAgICAgfSk7XG5cbiAgICAgICRzY29wZS5zY3JvbGwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCRzY29wZS5saW1pdCA8PSAkc2NvcGUuc3BlYWtlcnMubGVuZ3RoKVxuICAgICAgICAgICRzY29wZS5saW1pdCArPSA4O1xuICAgICAgfTtcblxuICAgICAgJHNjb3BlLmNoZWNrUGVybWlzc2lvbiA9IGZ1bmN0aW9uIChtZW1iZXIpIHtcbiAgICAgICAgdmFyIHJvbGVzID0gJHNjb3BlLm1lLnJvbGVzLmZpbHRlcihmdW5jdGlvbihvKSB7XG4gICAgICAgICAgcmV0dXJuIG8uaWQgPT0gJ2RldmVsb3BtZW50LXRlYW0nIHx8IG8uaWQgPT0gJ2Nvb3JkaW5hdGlvbic7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmKHJvbGVzLmxlbmd0aCA9PT0gMCAmJiBtZW1iZXIuaWQgIT0gJHNjb3BlLm1lLmlkKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9O1xuXG4gICAgICAkc2NvcGUuYWRkU3BlYWtlciA9IGZ1bmN0aW9uKG1lbWJlciwgbmV3U3BlYWtlcikge1xuICAgICAgICAvL2NvbnNvbGUubG9nKG5ld1NwZWFrZXIpO1xuICAgICAgICB2YXIgc3BlYWtlckRhdGEgPSBuZXdTcGVha2VyO1xuXG4gICAgICAgIGlmKG5ld1NwZWFrZXIuaWQpIHtcbiAgICAgICAgICB2YXIgcGFydGljaXBhdGlvbiA9ICRzY29wZS5nZXRQYXJ0aWNpcGF0aW9uKHNwZWFrZXJEYXRhLCAkc2NvcGUuY3VycmVudEV2ZW50LmlkKTtcbiAgICAgICAgICBpZihwYXJ0aWNpcGF0aW9uKSB7XG4gICAgICAgICAgICBwYXJ0aWNpcGF0aW9uLm1lbWJlciA9IG1lbWJlci5pZDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3BlYWtlckRhdGEucGFydGljaXBhdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgIGV2ZW50OiAkc2NvcGUuY3VycmVudEV2ZW50LmlkLFxuICAgICAgICAgICAgICBzdGF0dXM6ICdTZWxlY3RlZCcsXG4gICAgICAgICAgICAgIG1lbWJlcjogbWVtYmVyLmlkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgU3BlYWtlckZhY3RvcnkuU3BlYWtlci51cGRhdGUoeyBpZDogc3BlYWtlckRhdGEuaWQgfSwgeyBwYXJ0aWNpcGF0aW9uczogc3BlYWtlckRhdGEucGFydGljaXBhdGlvbnMgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGlmKHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAkc2NvcGUuZXJyb3IgPSByZXNwb25zZS5lcnJvcjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICRzY29wZS5tZXNzYWdlID0gcmVzcG9uc2Uuc3VjY2VzcztcblxuICAgICAgICAgICAgICBTcGVha2VyRmFjdG9yeS5TcGVha2VyLmdldEFsbChmdW5jdGlvbiAoc3BlYWtlcnMpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuc3BlYWtlcnMgPSBzcGVha2VycztcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3BlYWtlckRhdGEucGFydGljaXBhdGlvbnMgPSBbe1xuICAgICAgICAgICAgZXZlbnQ6ICRzY29wZS5jdXJyZW50RXZlbnQuaWQsXG4gICAgICAgICAgICBzdGF0dXM6ICdTZWxlY3RlZCcsXG4gICAgICAgICAgICBtZW1iZXI6IG1lbWJlci5pZFxuICAgICAgICAgIH1dO1xuXG4gICAgICAgICAgU3BlYWtlckZhY3RvcnkuU3BlYWtlci5jcmVhdGUoc3BlYWtlckRhdGEsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBpZihyZXNwb25zZS5lcnJvcikge1xuICAgICAgICAgICAgICAkc2NvcGUuZXJyb3IgPSByZXNwb25zZS5lcnJvcjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICRzY29wZS5tZXNzYWdlID0gcmVzcG9uc2UubWVzc2FnZTtcblxuICAgICAgICAgICAgICBTcGVha2VyRmFjdG9yeS5TcGVha2VyLmdldEFsbChmdW5jdGlvbiAoc3BlYWtlcnMpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuc3BlYWtlcnMgPSBzcGVha2VycztcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vICRzY29wZS4kd2F0Y2goWydjdXJyZW50RXZlbnQnLCAnc2VhcmNoU3RhdHVzJ10sIGZ1bmN0aW9uKG5ld1ZhbHVlcywgb2xkVmFsdWVzLCBzY29wZSl7XG4gICAgICAvLyAgIC8vY29uc29sZS5sb2coJ2ZpbHRlcmluZyBzcGVha2VycyBieScsJHNjb3BlLnNlYXJjaFN0YXR1cywkc2NvcGUuY3VycmVudEV2ZW50KTtcbiAgICAgIC8vICAgaWYoJHNjb3BlLnNwZWFrZXJzKXtcbiAgICAgIC8vICAgICAkc2NvcGUuZmlsdGVyZWRTcGVha2VycyA9ICRzY29wZS5zcGVha2Vycy5maWx0ZXIoZnVuY3Rpb24obykge1xuICAgICAgLy8gICAgICAgcmV0dXJuIG8ucGFydGljaXBhdGlvbnMuZmlsdGVyKGZ1bmN0aW9uKHApIHtcbiAgICAgIC8vICAgICAgICAgaWYoJHNjb3BlLnNlYXJjaFN0YXR1cyAmJiAkc2NvcGUuc2VhcmNoU3RhdHVzICE9PSAnJykge1xuICAgICAgLy8gICAgICAgICAgIHJldHVybiBwLmV2ZW50ID09PSAkc2NvcGUuY3VycmVudEV2ZW50LmlkICYmIHAuc3RhdHVzID09PSAkc2NvcGUuc2VhcmNoU3RhdHVzO1xuICAgICAgLy8gICAgICAgICB9IGVsc2Uge1xuICAgICAgLy8gICAgICAgICAgIHJldHVybiBwLmV2ZW50ID09PSAkc2NvcGUuY3VycmVudEV2ZW50LmlkO1xuICAgICAgLy8gICAgICAgICB9XG4gICAgICAvLyAgICAgICB9KTtcbiAgICAgIC8vICAgICB9KTtcbiAgICAgIC8vICAgfVxuICAgICAgLy8gfSk7XG4gICAgfVxuICB9KTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG50aGVUb29sQ29udHJvbGxlclxuICAuY29udHJvbGxlcignU3BlYWtlckNvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHNjb3BlLCAkbG9jYXRpb24sICR3aW5kb3csICRyb3V0ZVBhcmFtcywgJHNjZSwgU3BlYWtlckZhY3RvcnksIE1lbWJlckZhY3RvcnksIE5vdGlmaWNhdGlvbkZhY3RvcnkpIHtcbiAgICBcbiAgICAkcm9vdFNjb3BlLnVwZGF0ZS50aW1lb3V0KHJ1bkNvbnRyb2xsZXIpO1xuXG4gICAgZnVuY3Rpb24gcnVuQ29udHJvbGxlcigpe1xuXG4gICAgICAkc2NvcGUuY29tbXVuaWNhdGlvbkV2ZW50ID0gJHNjb3BlLmN1cnJlbnRFdmVudDtcblxuICAgICAgJHNjb3BlLnNldENvbW11bmljYXRpb25FdmVudCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICRzY29wZS5jb21tdW5pY2F0aW9uRXZlbnQgPSBldmVudDtcbiAgICAgIH1cblxuICAgICAgJHNjb3BlLnRydXN0U3JjID0gZnVuY3Rpb24oc3JjKSB7XG4gICAgICAgIHJldHVybiAkc2NlLnRydXN0QXNSZXNvdXJjZVVybChzcmMrJyNwYWdlLWJvZHknKTtcbiAgICAgIH07XG5cbiAgICAgICRzY29wZS5jb252ZXJ0RW1haWxzID0gZnVuY3Rpb24odGV4dCkge1xuICAgICAgICB2YXIgbWFpbEV4cCA9IC9bXFx3XFwuXFwtXStcXEAoW1xcd1xcLV0rXFwuKStbXFx3XXsyLDR9KD8hW148XSo+KS9pZztcbiAgICAgICAgdmFyIHR3aXR0ZXJFeHAgPSAvKF58W15AXFx3XSlAKFxcd3sxLDE1fSlcXGIvZztcbiAgICAgICAgcmV0dXJuIHRleHQucmVwbGFjZShtYWlsRXhwLCc8YSBocmVmPVwibWFpbHRvOiQmXCI+JCY8L2E+JykucmVwbGFjZSh0d2l0dGVyRXhwLCckMTxhIGhyZWY9XCJodHRwOi8vdHdpdHRlci5jb20vJDJcIiB0YXJnZXQ9XCJfYmxhbmtcIj5AJDI8L2E+Jyk7XG4gICAgICB9O1xuXG4gICAgICAkc2NvcGUuc3VibWl0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzcGVha2VyRGF0YSA9IHRoaXMuZm9ybURhdGE7XG5cbiAgICAgICAgU3BlYWtlckZhY3RvcnkuU3BlYWtlci51cGRhdGUoeyBpZDpzcGVha2VyRGF0YS5pZCB9LCBzcGVha2VyRGF0YSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICBpZihyZXNwb25zZS5lcnJvcikge1xuICAgICAgICAgICAgJHNjb3BlLmVycm9yID0gcmVzcG9uc2UuZXJyb3I7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRzY29wZS5tZXNzYWdlID0gcmVzcG9uc2Uuc3VjY2VzcztcbiAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCdzcGVha2VyLycrc3BlYWtlckRhdGEuaWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICAkc2NvcGUuZGVsZXRlU3BlYWtlciA9IGZ1bmN0aW9uKHNwZWFrZXIpIHtcbiAgICAgICAgU3BlYWtlckZhY3RvcnkuU3BlYWtlci5kZWxldGUoeyBpZDpzcGVha2VyLmlkIH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgaWYocmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgICAgICRzY29wZS5lcnJvciA9IHJlc3BvbnNlLmVycm9yO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkc2NvcGUubWVzc2FnZSA9IHJlc3BvbnNlLnN1Y2Nlc3M7XG4gICAgICAgICAgfVxuICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCdzcGVha2Vycy8nKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICAkc2NvcGUuY2hlY2tQZXJtaXNzaW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcm9sZXMgPSAkc2NvcGUubWUucm9sZXMuZmlsdGVyKGZ1bmN0aW9uKG8pIHtcbiAgICAgICAgICByZXR1cm4gby5pZCA9PSAnZGV2ZWxvcG1lbnQtdGVhbScgfHwgby5pZCA9PSAnY29vcmRpbmF0aW9uJztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYocm9sZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9O1xuXG4gICAgICAkc2NvcGUuc3RhdHVzZXMgPSBbJ1N1Z2dlc3Rpb24nLCdTZWxlY3RlZCcsJ0FwcHJvdmVkJywnQ29udGFjdGVkJywnSW4gQ29udmVyc2F0aW9ucycsJ0FjY2VwdGVkJywnUmVqZWN0ZWQnLCdHaXZlIFVwJ107XG5cbiAgICAgICRzY29wZS5zcGVha2VyID0gJHNjb3BlLmZvcm1EYXRhID0gJHNjb3BlLmdldFNwZWFrZXIoJHJvdXRlUGFyYW1zLmlkKTtcblxuICAgICAgU3BlYWtlckZhY3RvcnkuU3BlYWtlci5nZXQoe2lkOiAkcm91dGVQYXJhbXMuaWR9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAkc2NvcGUuc3BlYWtlciA9ICRzY29wZS5mb3JtRGF0YSA9IHJlc3BvbnNlO1xuXG4gICAgICAgIE5vdGlmaWNhdGlvbkZhY3RvcnkuU3BlYWtlci5nZXRBbGwoe2lkOiAkcm91dGVQYXJhbXMuaWR9LCBmdW5jdGlvbihnZXREYXRhKSB7XG4gICAgICAgICAgJHNjb3BlLnNwZWFrZXJOb3RpZmljYXRpb25zID0gZ2V0RGF0YTtcblxuICAgICAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHZhciB3aW4gPSAkd2luZG93O1xuICAgICAgJHNjb3BlLiR3YXRjaCgnc3BlYWtlckZvcm0uJGRpcnR5JywgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgaWYodmFsdWUpIHtcbiAgICAgICAgICB3aW4ub25iZWZvcmV1bmxvYWQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJuICdZb3UgaGF2ZSB1bnNhdmVkIGNoYW5nZXMnO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICB9KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG50aGVUb29sQ29udHJvbGxlci5jb250cm9sbGVyKFwiU3Vic2NyaXB0aW9uQ29udHJvbGxlclwiLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHNjb3BlLCBTdWJzY3JpcHRpb25GYWN0b3J5KSB7XG5cbiAgJHJvb3RTY29wZS51cGRhdGUudGltZW91dChydW5Db250cm9sbGVyKTtcblxuICBmdW5jdGlvbiBydW5Db250cm9sbGVyKCl7XG5cbiAgICAkc2NvcGUubG9hZGluZyA9IHRydWU7XG5cbiAgICB2YXIgdGhyZWFkSWQgPSAkc2NvcGUudGhyZWFkLnN1YnN0cmluZygkc2NvcGUudGhyZWFkLmluZGV4T2YoXCItXCIpICsgMSk7XG4gICAgdmFyIHRocmVhZEtpbmQgPSAkc2NvcGUudGhyZWFkLnNwbGl0KCctJylbMF07XG5cbiAgICB2YXIgRmFjdG9yeTtcblxuICAgIHN3aXRjaCh0aHJlYWRLaW5kKSB7XG4gICAgICBjYXNlICdjb21wYW55JzpcbiAgICAgICAgRmFjdG9yeSA9IFN1YnNjcmlwdGlvbkZhY3RvcnkuQ29tcGFueTtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc3BlYWtlcic6XG4gICAgICAgIEZhY3RvcnkgPSBTdWJzY3JpcHRpb25GYWN0b3J5LlNwZWFrZXI7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RvcGljJzpcbiAgICAgICAgRmFjdG9yeSA9IFN1YnNjcmlwdGlvbkZhY3RvcnkuVG9waWM7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvL2NvbnNvbGUubG9nKCdUSFJFQUQnLCAkc2NvcGUudGhyZWFkLCB0aHJlYWRLaW5kLCB0aHJlYWRJZCk7XG4gICAgLy9jb25zb2xlLmxvZygnRkFDVE9SWVlZJywgU3Vic2NyaXB0aW9uRmFjdG9yeS5Db21wYW55LCBTdWJzY3JpcHRpb25GYWN0b3J5LlNwZWFrZXIsIFN1YnNjcmlwdGlvbkZhY3RvcnkuVG9waWMsIEZhY3RvcnkpO1xuXG4gICAgJHNjb3BlLmlzU3Vic2NyaWJlZCA9IGZhbHNlO1xuXG4gICAgJHNjb3BlLmdldFN0YXR1cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIEZhY3RvcnkuZ2V0KHtpZDogdGhyZWFkSWR9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdTVEFUVVMnLHJlc3BvbnNlLnN1Y2Nlc3MpXG4gICAgICAgIGlmKHJlc3BvbnNlLnN1Y2Nlc3MgPT0gJ3N1YnNjcmliZWQnKSB7XG4gICAgICAgICAgJHNjb3BlLmlzU3Vic2NyaWJlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJHNjb3BlLmlzU3Vic2NyaWJlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH07XG5cbiAgICAkc2NvcGUuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy9jb25zb2xlLmxvZygnQURERCcsIHRocmVhZEtpbmQsIHRocmVhZElkKTtcbiAgICAgIEZhY3RvcnkuYWRkKHtpZDogdGhyZWFkSWR9LCB7fSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgJHNjb3BlLmdldFN0YXR1cygpO1xuICAgICAgfSlcbiAgICB9O1xuXG4gICAgJHNjb3BlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy9jb25zb2xlLmxvZygnREVMRVRFJywgdGhyZWFkS2luZCwgdGhyZWFkSWQpO1xuICAgICAgRmFjdG9yeS5yZW1vdmUoe2lkOiB0aHJlYWRJZH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICRzY29wZS5nZXRTdGF0dXMoKTtcbiAgICAgIH0pXG4gICAgfTtcblxuICAgICRzY29wZS5nZXRTdGF0dXMoKTtcbiAgfVxufSk7XG4iLCJyZXF1aXJlKCcuL2VtYmVkJyk7IiwicmVxdWlyZSgnLi9tYW5hZ2VyJyk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnRoZVRvb2xDb250cm9sbGVyLmNvbnRyb2xsZXIoXCJUYWdNYW5hZ2VyQ29udHJvbGxlclwiLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHNjb3BlLCBUYWdGYWN0b3J5KSB7XG5cbiAgJHJvb3RTY29wZS51cGRhdGUudGltZW91dChydW5Db250cm9sbGVyKTtcblxuICBmdW5jdGlvbiBydW5Db250cm9sbGVyKCl7XG5cbiAgICAkc2NvcGUubG9hZGluZyA9IHRydWU7XG5cbiAgICAkc2NvcGUudGFnID0ge307XG5cbiAgICAkc2NvcGUubGlnaHRDb2xvcnMgPSBbXCIjZjdjNmM3XCIsIFwiI2ZhZDhjN1wiLCBcIiNmZWYyYzBcIiwgXCIjYmZlNWJmXCIsIFwiI2JmZGFkY1wiLCBcIiNjN2RlZjhcIiwgXCIjYmZkNGYyXCIsIFwiI2Q0YzVmOVwiXTtcbiAgICAkc2NvcGUuY29sb3JzID0gW1wiI2UxMWQyMVwiLCBcIiNlYjY0MjBcIiwgXCIjZmJjYTA0XCIsIFwiIzAwOTgwMFwiLCBcIiMwMDZiNzVcIiwgXCIjMjA3ZGU1XCIsIFwiIzAwNTJjY1wiLCBcIiM1MzE5ZTdcIl07XG5cbiAgICAkc2NvcGUuY2hhbmdlQ29sb3IgPSBmdW5jdGlvbiAoY29sb3IpIHtcbiAgICAgICRzY29wZS50YWcuY29sb3IgPSBjb2xvcjtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmNyZWF0ZVRhZyA9IGZ1bmN0aW9uICh0YWcpIHtcbiAgICAgIFRhZ0ZhY3RvcnkuVGFnLmNyZWF0ZSh0YWcsIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICAgICRzY29wZS50YWdzLnB1c2gocmVzcG9uc2UudGFnKTtcbiAgICAgICAgICAkc2NvcGUudGFnID0ge307XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAkc2NvcGUuc2F2ZVRhZyA9IGZ1bmN0aW9uICh0YWcpIHtcbiAgICAgIFRhZ0ZhY3RvcnkuVGFnLnVwZGF0ZSh7aWQ6IHRhZy5pZH0sIHRhZywgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgICAgdGFnLmVkaXRpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgICRzY29wZS5kZWxldGVUYWcgPSBmdW5jdGlvbiAodGFnKSB7XG4gICAgICBUYWdGYWN0b3J5LlRhZy5kZWxldGUoe2lkOiB0YWcuaWR9LCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAkc2NvcGUudGFncy5zcGxpY2UoJHNjb3BlLnRhZ3MuaW5kZXhPZih0YWcpLCAxKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgfVxufSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudGhlVG9vbENvbnRyb2xsZXIuY29udHJvbGxlcihcIlRvcGljRW1iZWRDb250cm9sbGVyXCIsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkc2NvcGUsICRsb2NhdGlvbiwgVG9waWNGYWN0b3J5LCBOb3RpZmljYXRpb25GYWN0b3J5KSB7XG5cbiAgJHJvb3RTY29wZS51cGRhdGUudGltZW91dChydW5Db250cm9sbGVyKTtcblxuICBmdW5jdGlvbiBydW5Db250cm9sbGVyKCl7XG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09SU5JVElBTElaQVRJT049PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgJHNjb3BlLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgJHNjb3BlLmVycm9yICAgICAgID0gXCJcIjtcbiAgICAkc2NvcGUuc2hvd1RhcmdldHMgPSBmYWxzZTtcblxuICAgICRzY29wZS5wb2xsS2luZHMgPSBbXCJ0ZXh0XCIsIFwiaW1hZ2VzXCJdO1xuXG4gICAgaWYgKCRzY29wZS5jb21tZW50cykge1xuICAgICAgJHNjb3BlLnRvcGljLmNvbW1lbnRzID0gJHNjb3BlLmNvbW1lbnRzLmZpbHRlcihmdW5jdGlvbiAoZSkge1xuICAgICAgICByZXR1cm4gZS50aHJlYWQgPT0gXCJ0b3BpYy1cIiArICRzY29wZS50b3BpYy5faWQ7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBzaG93KCRzY29wZS50b3BpYyk7XG5cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09QVVYRlVOQ1RJT05TPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgZnVuY3Rpb24gc2hvdyh0b3BpYykge1xuICAgICAgdG9waWMuc2hvdyA9IHtcbiAgICAgICAgdGV4dCAgICAgOiB0cnVlLFxuICAgICAgICB0YXJnZXRzICA6IHRydWUsXG4gICAgICAgIHBvbGwgICAgIDogZmFsc2UsXG4gICAgICAgIGR1ZWRhdGUgIDogZmFsc2UsXG4gICAgICAgIG1lZXRpbmcgIDogdHJ1ZSxcbiAgICAgICAgY2xvc2VkICAgOiBmYWxzZVxuICAgICAgfTtcblxuICAgICAgaWYgKHRvcGljLmtpbmQgPT09IFwiVG8gZG9cIikge1xuICAgICAgICB0b3BpYy5zaG93LmR1ZWRhdGUgPSB0cnVlO1xuICAgICAgICB0b3BpYy5zaG93LmNsb3NlZCAgPSB0cnVlO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodG9waWMua2luZCA9PT0gXCJEZWNpc2lvblwiKSB7XG4gICAgICAgIHRvcGljLnNob3cuZHVlZGF0ZSA9IHRydWU7XG4gICAgICAgIHRvcGljLnNob3cuY2xvc2VkICA9IHRydWU7XG4gICAgICAgIHRvcGljLnNob3cucG9sbCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgJHNjb3BlLmNoZWNrUGVybWlzc2lvbiA9IGZ1bmN0aW9uICh0b3BpYykge1xuICAgICAgaWYgKCEkc2NvcGUubWUucm9sZXMpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgIHZhciByb2xlcyA9ICRzY29wZS5tZS5yb2xlcy5maWx0ZXIoZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgcmV0dXJuIG8uaWQgPT0gJ2RldmVsb3BtZW50LXRlYW0nIHx8IG8uaWQgPT0gJ2Nvb3JkaW5hdGlvbic7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHJvbGVzLmxlbmd0aCA9PSAwICYmIHRvcGljLmF1dGhvciAhPSAkc2NvcGUubWUuaWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1GVU5DVElPTlM9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgJHNjb3BlLmRlbGV0ZVRvcGljID0gZnVuY3Rpb24gKHRvcGljKSB7XG4gICAgICBpZiAoY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyB0b3BpYz9cIikpIHtcbiAgICAgICAgVG9waWNGYWN0b3J5LlRvcGljLmRlbGV0ZSh7aWQ6IHRvcGljLl9pZH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0b3BpYy5kZWxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL3RvcGljcycpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgJHNjb3BlLnRvZ2dsZVRhZyA9IGZ1bmN0aW9uICh0YWcpIHtcbiAgICAgIHZhciBpbmRleCA9ICRzY29wZS50b3BpYy50YWdzLmluZGV4T2YodGFnKTtcblxuICAgICAgaWYgKGluZGV4ID09IC0xKSB7XG4gICAgICAgICRzY29wZS50b3BpYy50YWdzLnB1c2godGFnKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAkc2NvcGUudG9waWMudGFncy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAkc2NvcGUuZ2V0VGFnSWNvbiA9IGZ1bmN0aW9uICh0YWcpIHtcbiAgICAgIHJldHVybiAoJHNjb3BlLnRvcGljLnRhZ3MuaW5kZXhPZih0YWcuaWQpICE9PSAtMSA/IFwiY2hlY2tcIiA6IFwidGltZXNcIik7O1xuICAgIH07XG5cbiAgICAkc2NvcGUudG9nZ2xlVGFyZ2V0ID0gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgdmFyIGluZGV4ID0gJHNjb3BlLnRvcGljLnRhcmdldHMuaW5kZXhPZih0YXJnZXQpO1xuXG4gICAgICBpZiAoaW5kZXggPT0gLTEpIHtcbiAgICAgICAgJHNjb3BlLnRvcGljLnRhcmdldHMucHVzaCh0YXJnZXQpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgICRzY29wZS50b3BpYy50YXJnZXRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgICRzY29wZS50b2dnbGVBbGxUYXJnZXRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGogPSAkc2NvcGUubWVtYmVycy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgICAgJHNjb3BlLnRvZ2dsZVRhcmdldCgkc2NvcGUubWVtYmVyc1tpXS5pZCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgICRzY29wZS50b2dnbGVSb2xlVGFyZ2V0cyA9IGZ1bmN0aW9uIChyb2xlSWQpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBqID0gJHNjb3BlLm1lbWJlcnMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG4gICAgICAgIGZvcih2YXIgbyA9IDA7IG8gPCAkc2NvcGUubWVtYmVyc1tpXS5yb2xlcy5sZW5ndGg7IG8rKykge1xuICAgICAgICAgIGlmICgkc2NvcGUubWVtYmVyc1tpXS5yb2xlc1tvXS5pZCA9PSByb2xlSWQpIHtcbiAgICAgICAgICAgICRzY29wZS50b2dnbGVUYXJnZXQoJHNjb3BlLm1lbWJlcnNbaV0uaWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICAkc2NvcGUudG9nZ2xlVGFyZ2V0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICRzY29wZS5zaG93VGFyZ2V0cyA9ICEkc2NvcGUuc2hvd1RhcmdldHM7XG4gICAgfTtcblxuICAgICRzY29wZS5nZXRUYXJnZXRDb2xvciA9IGZ1bmN0aW9uIChtZW1iZXJJZCkge1xuICAgICAgcmV0dXJuICgkc2NvcGUudG9waWMudGFyZ2V0cy5pbmRleE9mKG1lbWJlcklkKSAhPT0gLTEgPyBcImJsdWVcIiA6IFwiXCIpO1xuICAgIH07XG5cbiAgICAkc2NvcGUuZm9jdXNPcHRpb24gPSBmdW5jdGlvbiAob3B0aW9uKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgaiA9ICRzY29wZS50b3BpYy5wb2xsLm9wdGlvbnMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG4gICAgICAgICRzY29wZS50b3BpYy5wb2xsLm9wdGlvbnNbaV0uZWRpdGluZyA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBvcHRpb24uZWRpdGluZyA9IHRydWU7XG4gICAgfTtcblxuICAgICRzY29wZS5hZGRPcHRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgb3B0aW9uID0ge1xuICAgICAgICBvcHRpb25UeXBlOiBcIkluZm9cIixcbiAgICAgICAgdGFyZ2V0czogW11cbiAgICAgIH07XG5cbiAgICAgICRzY29wZS50b3BpYy5wb2xsLm9wdGlvbnMucHVzaChvcHRpb24pO1xuXG4gICAgICAkc2NvcGUuZm9jdXNPcHRpb24ob3B0aW9uKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnJlbW92ZU9wdGlvbiA9IGZ1bmN0aW9uIChvcHRpb24pIHtcbiAgICAgICRzY29wZS50b3BpYy5wb2xsLm9wdGlvbnMuc3BsaWNlKCRzY29wZS50b3BpYy5wb2xsLm9wdGlvbnMuaW5kZXhPZihvcHRpb24pLCAxKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnNlbGVjdE9wdGlvbiA9IGZ1bmN0aW9uICh0b3BpYywgb3B0aW9uKSB7XG4gICAgICB2YXIgdXBkYXRlZFRvcGljID0gdG9waWM7XG5cbiAgICAgIGlmIChvcHRpb24udm90ZXMuaW5kZXhPZigkc2NvcGUubWUuaWQpICE9PSAtMSkge1xuICAgICAgICB1cGRhdGVkVG9waWMucG9sbC5vcHRpb25zW3VwZGF0ZWRUb3BpYy5wb2xsLm9wdGlvbnMuaW5kZXhPZihvcHRpb24pXS52b3Rlcy5zcGxpY2UodXBkYXRlZFRvcGljLnBvbGwub3B0aW9uc1t1cGRhdGVkVG9waWMucG9sbC5vcHRpb25zLmluZGV4T2Yob3B0aW9uKV0udm90ZXMuaW5kZXhPZigkc2NvcGUubWUuaWQpLCAxKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB1cGRhdGVkVG9waWMucG9sbC5vcHRpb25zW3VwZGF0ZWRUb3BpYy5wb2xsLm9wdGlvbnMuaW5kZXhPZihvcHRpb24pXS52b3Rlcy5wdXNoKCRzY29wZS5tZS5pZCk7XG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZWRUb3BpYy5fdm90aW5nID0gdHJ1ZTtcblxuICAgICAgVG9waWNGYWN0b3J5LlRvcGljLnVwZGF0ZSh7aWQ6IHVwZGF0ZWRUb3BpYy5faWR9LCB1cGRhdGVkVG9waWMsIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICBpZiAocmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiVGhlcmUgd2FzIGFuIGVycm9yLiBQbGVhc2UgY29udGFjdCB0aGUgRGV2IFRlYW0gYW5kIGdpdmUgdGhlbSB0aGUgZGV0YWlscyBhYm91dCB0aGUgZXJyb3IuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAvLy8vY29uc29sZS5sb2cocmVzcG9uc2Uuc3VjY2Vzcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAkc2NvcGUuc2F2ZSA9IGZ1bmN0aW9uICh0b3BpYykge1xuICAgICAgJHNjb3BlLmVycm9yID0gXCJcIjtcblxuICAgICAgLy9jb25zb2xlLmxvZyh0b3BpYyk7XG5cbiAgICAgIFRvcGljRmFjdG9yeS5Ub3BpYy51cGRhdGUoe2lkOiB0b3BpYy5faWR9LCB0b3BpYywgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgICAgdG9waWMuZWRpdGluZyA9ICF0b3BpYy5lZGl0aW5nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICRzY29wZS5lcnJvciA9IFwiVGhlcmUgd2FzIGFuIGVycm9yLiBQbGVhc2UgY29udGFjdCB0aGUgRGV2IFRlYW0gYW5kIGdpdmUgdGhlbSB0aGUgZGV0YWlscyBhYm91dCB0aGUgZXJyb3IuXCI7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAkc2NvcGUucmVhZCA9IGZ1bmN0aW9uICh0b3BpYykge1xuICAgICAgaWYgKCEkc2NvcGUubm90aWZpY2F0aW9ucykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgICRzY29wZS5ub3RpZmljYXRpb25zLmZpbHRlcihmdW5jdGlvbiAobykge1xuICAgICAgICByZXR1cm4gby50aHJlYWQgPT09IFwidG9waWMtXCIgKyB0b3BpYy5faWQ7XG4gICAgICB9KS5mb3JFYWNoKGZ1bmN0aW9uIChub3RpZmljYXRpb24pIHtcbiAgICAgICAgdmFyIGluZGV4ID0gbm90aWZpY2F0aW9uLnVucmVhZC5pbmRleE9mKCRzY29wZS5tZS5pZCk7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICBub3RpZmljYXRpb24udW5yZWFkLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgTm90aWZpY2F0aW9uRmFjdG9yeS5Ob3RpZmljYXRpb24udXBkYXRlKHtpZDogbm90aWZpY2F0aW9uLl9pZH0sIG5vdGlmaWNhdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAkc2NvcGUuZ2V0TWVtYmVyID0gZnVuY3Rpb24gKG1lbWJlcklkKSB7XG4gICAgICB2YXIgbWVtYmVyID0gJHNjb3BlLm1lbWJlcnMuZmlsdGVyKGZ1bmN0aW9uIChvKSB7XG4gICAgICAgIHJldHVybiBvLmlkID09IG1lbWJlcklkO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChtZW1iZXIgJiYgbWVtYmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIG1lbWJlclswXTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG5hbWU6IFwiTm8gb25lXCIsXG4gICAgICAgICAgZmFjZWJvb2s6IFwiMTAwMDAwNDU2MzM1OTcyXCJcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgJHNjb3BlLmdldFVucmVhZE5vdGlmaWNhdGlvbnMgPSBmdW5jdGlvbiAodGhyZWFkKSB7XG4gICAgICAvL2NvbnNvbGUubG9nKG5vdGlmaWNhdGlvbnMpO1xuICAgICAgdmFyIG5vdGlmaWNhdGlvbnMgPSAkc2NvcGUubm90aWZpY2F0aW9ucy5maWx0ZXIoZnVuY3Rpb24obykge1xuICAgICAgICByZXR1cm4gby50aHJlYWQgPT0gdGhyZWFkO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBub3RpZmljYXRpb25zO1xuICAgIH07XG5cbiAgICAgJHNjb3BlLnRvcGljLnVucmVhZCA9ICRzY29wZS5nZXRVbnJlYWROb3RpZmljYXRpb25zKCd0b3BpYy0nKyAkc2NvcGUudG9waWMuX2lkKS5sZW5ndGggPiAwO1xuXG4gICAgJHNjb3BlLnRpbWVTaW5jZSA9ZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgIHZhciBzZWNvbmRzID0gTWF0aC5mbG9vcigoRGF0ZS5ub3coKSAtIGRhdGUpIC8gMTAwMCk7XG5cbiAgICAgIHZhciBzdWZmaXggPSBcImFnb1wiO1xuICAgICAgaWYgKHNlY29uZHMgPCAwKXtcbiAgICAgICAgc2Vjb25kcyA9IE1hdGguYWJzKHNlY29uZHMpO1xuICAgICAgICBzdWZmaXggPSBcInRvIGdvXCI7XG4gICAgICB9XG5cbiAgICAgIHZhciBpbnRlcnZhbCA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDMxNTM2MDAwKTtcblxuICAgICAgaWYgKGludGVydmFsID4gMSkge1xuICAgICAgICAgIHJldHVybiBpbnRlcnZhbCArIFwiIHllYXJzIFwiICsgc3VmZml4O1xuICAgICAgfVxuICAgICAgaW50ZXJ2YWwgPSBNYXRoLmZsb29yKHNlY29uZHMgLyAyNTkyMDAwKTtcbiAgICAgIGlmIChpbnRlcnZhbCA+IDEpIHtcbiAgICAgICAgICByZXR1cm4gaW50ZXJ2YWwgKyBcIiBtb250aHMgXCIgKyBzdWZmaXg7XG4gICAgICB9XG4gICAgICBpbnRlcnZhbCA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDg2NDAwKTtcbiAgICAgIGlmIChpbnRlcnZhbCA+IDEpIHtcbiAgICAgICAgICByZXR1cm4gaW50ZXJ2YWwgKyBcIiBkYXlzIFwiICsgc3VmZml4O1xuICAgICAgfVxuICAgICAgaW50ZXJ2YWwgPSBNYXRoLmZsb29yKHNlY29uZHMgLyAzNjAwKTtcbiAgICAgIGlmIChpbnRlcnZhbCA+IDEpIHtcbiAgICAgICAgICByZXR1cm4gaW50ZXJ2YWwgKyBcIiBob3VycyBcIiArIHN1ZmZpeDtcbiAgICAgIH1cbiAgICAgIGludGVydmFsID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gNjApO1xuICAgICAgaWYgKGludGVydmFsID4gMSkge1xuICAgICAgICAgIHJldHVybiBpbnRlcnZhbCArIFwiIG1pbnV0ZXMgXCIgKyBzdWZmaXg7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihzZWNvbmRzKSArIFwiIHNlY29uZHMgXCIgKyBzdWZmaXg7XG4gICAgfTtcblxuICAgICRzY29wZS5mb3JtYXREYXRlID0gZnVuY3Rpb24gKHRpbWUpIHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZSh0aW1lKS50b1VUQ1N0cmluZygpO1xuICAgIH07XG4gIH1cbn0pO1xuIiwicmVxdWlyZSgnLi9saXN0Jyk7XG5yZXF1aXJlKCcuL3RvcGljJyk7XG5yZXF1aXJlKCcuL2VtYmVkJyk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudGhlVG9vbENvbnRyb2xsZXIuY29udHJvbGxlcihcIlRvcGljc0NvbnRyb2xsZXJcIiwgZnVuY3Rpb24gKCRyb290U2NvcGUsICRzY29wZSwgJGxvY2F0aW9uLCAkcm91dGVQYXJhbXMsIFRvcGljRmFjdG9yeSkge1xuXG4gICRyb290U2NvcGUudXBkYXRlLnRpbWVvdXQocnVuQ29udHJvbGxlcik7XG5cbiAgZnVuY3Rpb24gcnVuQ29udHJvbGxlcigpe1xuXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PUlOSVRJQUxJWkFUSU9OPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgICRzY29wZS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICRzY29wZS5raW5kcyA9IFtcIkluZm9cIiwgXCJUbyBkb1wiLCBcIkRlY2lzaW9uXCIsIFwiSWRlYVwiXTtcblxuICAgICRzY29wZS5zZWFyY2hUb3BpY3MgPSB7fTtcblxuICAgICRzY29wZS51bnJlYWRGaXJzdCA9IHRydWU7XG5cbiAgICBUb3BpY0ZhY3RvcnkuVG9waWMuZ2V0QWxsKGdvdFRvcGljcyk7XG5cbiAgICBmdW5jdGlvbiBnb3RUb3BpY3MgKHRvcGljcykge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICgkc2NvcGUubG9hZGluZykge1xuICAgICAgICAgIGdvdFRvcGljcyh0b3BpY3MpO1xuICAgICAgICB9XG4gICAgICB9LCAxMDAwKTtcblxuICAgICAgJHNjb3BlLnRvcGljcyA9IHRvcGljcztcblxuICAgICAgZm9yICh2YXIgaSA9IDAsIGogPSAkc2NvcGUudG9waWNzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuICAgICAgICAkc2NvcGUudG9waWNzW2ldLmZhY2Vib29rID0gJHNjb3BlLm1lbWJlcnMuZmlsdGVyKGZ1bmN0aW9uIChvKSB7XG4gICAgICAgICAgcmV0dXJuICRzY29wZS50b3BpY3NbaV0uYXV0aG9yID09PSBvLmlkO1xuICAgICAgICB9KVswXS5mYWNlYm9vaztcbiAgICAgIH1cblxuICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAkc2NvcGUuc2hvd09wZW4gPSB0cnVlO1xuICAgICRzY29wZS5saW1pdCA9IDEwO1xuXG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09RlVOQ1RJT05TPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgICRzY29wZS50aW1lID0gZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgcmV0dXJuICRzY29wZS50aW1lU2luY2UobmV3IERhdGUoZGF0ZSkpO1xuICAgIH07XG5cbiAgICAkc2NvcGUuY3JlYXRlVG9waWMgPSBmdW5jdGlvbihraW5kKSB7XG4gICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICBUb3BpY0ZhY3RvcnkuVG9waWMuY3JlYXRlKHtcbiAgICAgICAgYXV0aG9yOiAkc2NvcGUubWUuaWQsXG4gICAgICAgIGtpbmQ6IGtpbmQsXG4gICAgICAgIHRhZ3M6IFskc2NvcGUuc2VhcmNoVG9waWNzLnRhZ3NdXG4gICAgICB9LCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgICBUb3BpY0ZhY3RvcnkuVG9waWMuZ2V0QWxsKGZ1bmN0aW9uICh0b3BpY3MpIHtcbiAgICAgICAgICAgICRzY29wZS50b3BpY3MgPSB0b3BpY3M7XG4gICAgICAgICAgICAkc2NvcGUudG9waWNzLmZpbHRlcihmdW5jdGlvbiAobykge1xuICAgICAgICAgICAgICByZXR1cm4gby5faWQgPT0gcmVzcG9uc2UuaWQ7XG4gICAgICAgICAgICB9KVswXS5lZGl0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCd0b3BpYy8nK3Jlc3BvbnNlLmlkKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgICRzY29wZS5jb3VudCA9IGZ1bmN0aW9uIChvcGVuKSB7XG4gICAgICByZXR1cm4gJHNjb3BlLnRvcGljcy5maWx0ZXIoZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgcmV0dXJuIChvcGVuID8gIW8uY2xvc2VkIDogby5jbG9zZWQpO1xuICAgICAgfSkubGVuZ3RoO1xuICAgIH07XG5cbiAgICAkc2NvcGUuc2hvd25Ub3BpY3MgPSBmdW5jdGlvbiAob3Blbikge1xuICAgICAgcmV0dXJuICRzY29wZS50b3BpY3MuZmlsdGVyKGZ1bmN0aW9uIChvKSB7XG4gICAgICAgIHJldHVybiBvLmVkaXRpbmcgfHwgKG9wZW4gPyAhby5jbG9zZWQgOiBvLmNsb3NlZCkgJiYgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLnNlYXJjaFRvcGljcy50YWdzICYmIG8udGFncy5pbmRleE9mKCRzY29wZS5zZWFyY2hUb3BpY3MudGFncykgPT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgkc2NvcGUuc2VhcmNoVG9waWNzLnRhcmdldCAmJiBvLnRhcmdldHMuaW5kZXhPZigkc2NvcGUuc2VhcmNoVG9waWNzLnRhcmdldCkgPT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgkc2NvcGUuc2VhcmNoVG9waWNzLmtpbmQgJiYgby5raW5kICE9PSAkc2NvcGUuc2VhcmNoVG9waWNzLmtpbmQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0oKSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnNjcm9sbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCRzY29wZS5saW1pdCA8ICRzY29wZS50b3BpY3MubGVuZ3RoKVxuICAgICAgICAkc2NvcGUubGltaXQgKz0gNDtcbiAgICB9O1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxudGhlVG9vbENvbnRyb2xsZXIuY29udHJvbGxlcignVG9waWNDb250cm9sbGVyJywgZnVuY3Rpb24gKCRyb290U2NvcGUsICRzY29wZSwgJHJvdXRlUGFyYW1zLCAkbG9jYXRpb24sICR3aW5kb3csIFRvcGljRmFjdG9yeSwgTm90aWZpY2F0aW9uRmFjdG9yeSkge1xuXG4gICRyb290U2NvcGUudXBkYXRlLnRpbWVvdXQocnVuQ29udHJvbGxlcik7XG5cbiAgZnVuY3Rpb24gcnVuQ29udHJvbGxlcigpe1xuXG4gICAgJHNjb3BlLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgVG9waWNGYWN0b3J5LlRvcGljLmdldCh7aWQ6ICRyb3V0ZVBhcmFtcy5pZH0sIGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgJHNjb3BlLnRvcGljID0gcmVzdWx0O1xuXG4gICAgICAvL2NvbnNvbGUubG9nKCRsb2NhdGlvbi5zZWFyY2goKSk7XG4gICAgICBpZigkbG9jYXRpb24uc2VhcmNoKCkuZWRpdGluZyA9PSB0cnVlKSB7XG4gICAgICAgICRzY29wZS50b3BpYy5lZGl0aW5nPXRydWU7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ1RSVUVFRScpO1xuICAgICAgfVxuXG4gICAgICAkc2NvcGUudG9waWMuc2hvd0NvbW1lbnRzID0gdHJ1ZTtcblxuICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxudGhlVG9vbERpcmVjdGl2ZXNcbiAgLmRpcmVjdGl2ZSgnY29tbWVudEFyZWEnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRUFDJyxcbiAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2NvbW1lbnQvYXJlYS5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdDb21tZW50QXJlYUNvbnRyb2xsZXInLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgdGhyZWFkOiAnQCcsXG4gICAgICAgIHN1YnRocmVhZDogJ0AnLFxuICAgICAgICBtZTogJz0nLFxuICAgICAgICBtZW1iZXJzOiAnPSdcbiAgICAgIH1cbiAgICB9O1xuICB9KTsiLCIndXNlIHN0cmljdCc7XG5cbnRoZVRvb2xEaXJlY3RpdmVzXG4gIC5kaXJlY3RpdmUoJ2ZpcnN0Q29tbWVudCcsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFQUMnLFxuICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvY29tbWVudC9maXJzdC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdGaXJzdENvbW1lbnRDb250cm9sbGVyJyxcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgIHRocmVhZDogJ0AnXG4gICAgICB9XG4gICAgfTtcbiAgfSkiLCJyZXF1aXJlKCcuL2FyZWEnKTtcbnJlcXVpcmUoJy4vZmlyc3QnKTsiLCIndXNlIHN0cmljdCc7XG5cbnRoZVRvb2xEaXJlY3RpdmVzXG4gIC5kaXJlY3RpdmUoJ2NvbW11bmljYXRpb25BcmVhJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0VBQycsXG4gICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9jb21tdW5pY2F0aW9uL2FyZWEuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnQ29tbXVuaWNhdGlvbkFyZWFDb250cm9sbGVyJyxcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgIHRocmVhZDogJ0AnLFxuICAgICAgICBldmVudDogJz0nLFxuICAgICAgICBtZW1iZXJzSnNvbjogJ0BtZW1iZXJzJyxcbiAgICAgICAgbWVKc29uOiAnQG1lJyxcbiAgICAgICAgcm9sZXNKc29uOiAnQHJvbGVzJ1xuICAgICAgfVxuICAgIH07XG4gIH0pIiwiJ3VzZSBzdHJpY3QnO1xuXG50aGVUb29sRGlyZWN0aXZlc1xuICAuZGlyZWN0aXZlKCdjb21tdW5pY2F0aW9uJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0VBQycsXG4gICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9jb21tdW5pY2F0aW9uL2NvbW11bmljYXRpb24uaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnQ29tbXVuaWNhdGlvbkVtYmVkQ29udHJvbGxlcicsXG4gICAgICBzY29wZToge1xuICAgICAgICBjb21tdW5pY2F0aW9uOiAnPWNvbW11bmljYXRpb25PYmplY3QnLFxuICAgICAgICBtZW1iZXJzOiAnPScsXG4gICAgICAgIG1lOiAnPSdcbiAgICAgIH1cbiAgICB9O1xuICB9KSIsInJlcXVpcmUoJy4vYXJlYScpO1xucmVxdWlyZSgnLi9jb21tdW5pY2F0aW9uJyk7IiwiJ3VzZSBzdHJpY3QnO1xuXG50aGVUb29sRGlyZWN0aXZlc1xuICAuZGlyZWN0aXZlKCdjb21wYW55Q2FyZCcsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFQUMnLFxuICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvY29tcGFueS9jYXJkLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ0NvbXBhbnlFbWJlZENvbnRyb2xsZXInLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgY29tcGFueTogJz1jb21wYW55JyxcbiAgICAgICAgZXZlbnQ6ICc9ZXZlbnQnLFxuICAgICAgICBub3RpZmljYXRpb25zOiAnPW5vdGlmaWNhdGlvbnMnLFxuICAgICAgICBtZTogJz1tZScsXG4gICAgICAgIG1lbWJlcnM6ICc9bWVtYmVycydcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbiIsInJlcXVpcmUoJy4vY2FyZCcpOyIsInJlcXVpcmUoJy4vaW5wdXQnKSIsIid1c2Ugc3RyaWN0JztcblxudGhlVG9vbERpcmVjdGl2ZXNcbiAgLmRpcmVjdGl2ZShcbiAgICAnZGF0ZUlucHV0JyxcbiAgICBmdW5jdGlvbihkYXRlRmlsdGVyKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXF1aXJlOiAnbmdNb2RlbCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJzxpbnB1dCB0eXBlPVwiZGF0ZVwiPjwvaW5wdXQ+JyxcbiAgICAgICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxtLCBhdHRycywgbmdNb2RlbEN0cmwpIHtcbiAgICAgICAgICAgICAgICBuZ01vZGVsQ3RybC4kZm9ybWF0dGVycy51bnNoaWZ0KGZ1bmN0aW9uIChtb2RlbFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRlRmlsdGVyKG1vZGVsVmFsdWUsICd5eXl5LU1NLWRkJyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBuZ01vZGVsQ3RybC4kcGFyc2Vycy51bnNoaWZ0KGZ1bmN0aW9uKHZpZXdWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUodmlld1ZhbHVlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gIH0pIiwidGhlVG9vbERpcmVjdGl2ZXMgPSBhbmd1bGFyLm1vZHVsZShcInRoZVRvb2wuZGlyZWN0aXZlc1wiLCBbXSk7XG5cbnJlcXVpcmUoXCIuL2NvbW1lbnRcIik7XG5yZXF1aXJlKFwiLi9jb21tdW5pY2F0aW9uXCIpO1xucmVxdWlyZShcIi4vY29tcGFueVwiKTtcbnJlcXVpcmUoXCIuL2RhdGVcIik7XG5yZXF1aXJlKFwiLi9tYXJrZG93blwiKTtcbnJlcXVpcmUoXCIuL21lZXRpbmdcIik7XG5yZXF1aXJlKFwiLi9zcGVha2VyXCIpO1xucmVxdWlyZShcIi4vdGFnXCIpO1xucmVxdWlyZShcIi4vdG9waWNcIik7XG5yZXF1aXJlKFwiLi9zY3JvbGxcIik7XG5yZXF1aXJlKFwiLi9zdWJzY3JpcHRpb25cIik7XG5yZXF1aXJlKFwiLi9tZW1iZXJcIik7IiwiJ3VzZSBzdHJpY3QnO1xuXG50aGVUb29sRGlyZWN0aXZlc1xuICAuZGlyZWN0aXZlKCdjb21waWxlJywgWyckY29tcGlsZScsIGZ1bmN0aW9uICgkY29tcGlsZSkge1xuICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgc2NvcGUuJHdhdGNoKFxuICAgICAgICAgIGZ1bmN0aW9uKHNjb3BlKSB7XG4gICAgICAgICAgICAgLy8gd2F0Y2ggdGhlICdjb21waWxlJyBleHByZXNzaW9uIGZvciBjaGFuZ2VzXG4gICAgICAgICAgICByZXR1cm4gc2NvcGUuJGV2YWwoYXR0cnMuY29tcGlsZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgLy8gd2hlbiB0aGUgJ2NvbXBpbGUnIGV4cHJlc3Npb24gY2hhbmdlc1xuICAgICAgICAgICAgLy8gYXNzaWduIGl0IGludG8gdGhlIGN1cnJlbnQgRE9NXG4gICAgICAgICAgICBlbGVtZW50Lmh0bWwodmFsdWUpO1xuXG4gICAgICAgICAgICAvLyBjb21waWxlIHRoZSBuZXcgRE9NIGFuZCBsaW5rIGl0IHRvIHRoZSBjdXJyZW50XG4gICAgICAgICAgICAvLyBzY29wZS5cbiAgICAgICAgICAgIC8vIE5PVEU6IHdlIG9ubHkgY29tcGlsZSAuY2hpbGROb2RlcyBzbyB0aGF0XG4gICAgICAgICAgICAvLyB3ZSBkb24ndCBnZXQgaW50byBpbmZpbml0ZSBsb29wIGNvbXBpbGluZyBvdXJzZWx2ZXNcbiAgICAgICAgICAgICRjb21waWxlKGVsZW1lbnQuY29udGVudHMoKSkoc2NvcGUpO1xuICAgICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuICB9XSkiLCJyZXF1aXJlKCcuL2NvbXBpbGUnKTtcbnJlcXVpcmUoJy4vbWFya2Rvd24nKTsiLCIndXNlIHN0cmljdCc7XG5cbnRoZVRvb2xEaXJlY3RpdmVzXG4gIC5kaXJlY3RpdmUoJ21hcmtkb3duJywgWyckY29tcGlsZScsIGZ1bmN0aW9uICgkY29tcGlsZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIHZhciBodG1sVGV4dCA9IG1hcmtkb3duLnRvSFRNTChlbGVtZW50LnRleHQoKSk7XG4gICAgICAgICAgICBlbGVtZW50Lmh0bWwoaHRtbFRleHQucmVwbGFjZSgvXFxuL2csICc8YnI+JykpO1xuICAgICAgICB9XG4gICAgfTtcbiAgfV0pIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnRoZVRvb2xEaXJlY3RpdmVzLmRpcmVjdGl2ZShcImVtYmVkTWVldGluZ1wiLCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6IFwiRVwiLFxuICAgIHJlcGxhY2U6IHRydWUsXG4gICAgdGVtcGxhdGVVcmw6IFwidmlld3MvbWVldGluZy9lbWJlZC5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJNZWV0aW5nRW1iZWRDb250cm9sbGVyXCIsXG4gICAgc2NvcGU6IHtcbiAgICAgIG1lZXRpbmdJZDogXCI9XCIsXG4gICAgICBtZW1iZXJzOiBcIj1cIlxuICAgIH1cbiAgfTtcbn0pO1xuIiwicmVxdWlyZShcIi4vZW1iZWRcIik7XG4iLCIndXNlIHN0cmljdCc7XG5cbnRoZVRvb2xEaXJlY3RpdmVzXG4gIC5kaXJlY3RpdmUoJ21lbWJlckNhcmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRUFDJyxcbiAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL21lbWJlci9jYXJkLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ01lbWJlckVtYmVkQ29udHJvbGxlcicsXG4gICAgICBzY29wZToge1xuICAgICAgICBtZW1iZXI6ICc9bWVtYmVyT2JqZWN0JyxcbiAgICAgIH1cbiAgICB9O1xuICB9KVxuIiwicmVxdWlyZSgnLi9jYXJkLmpzJyk7IiwicmVxdWlyZShcIi4vcG9zaXRpb24uanNcIik7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnRoZVRvb2xEaXJlY3RpdmVzLmRpcmVjdGl2ZSgnd2hlblNjcm9sbGVkJywgWyckdGltZW91dCcsIGZ1bmN0aW9uKCR0aW1lb3V0KSB7XG4gIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxtLCBhdHRyKSB7XG5cbiAgICAvL2NvbnNvbGUubG9nKFwiT24gZGlyZWN0aXZlXCIpO1xuXG4gICAgLy9jb25zb2xlLmxvZyhlbG0pO1xuXG4gICAgdmFyIHJhdyA9IGVsbVswXTtcbiAgICAvL2NvbnNvbGUubG9nKHJhdyk7XG5cbiAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIC8vY29uc29sZS5sb2cocmF3LnNjcm9sbFRvcCk7XG4gICAgICAvL2NvbnNvbGUubG9nKHJhdy5zY3JvbGxIZWlnaHQpO1xuICAgICAgcmF3LnNjcm9sbFRvcCA9IHJhdy5zY3JvbGxIZWlnaHQ7XG4gICAgfSk7XG5cbiAgICBlbG0uYmluZCgnc2Nyb2xsJywgZnVuY3Rpb24oKSB7XG4gICAgICBpZiAocmF3LnNjcm9sbFRvcCA8PSAxMDApIHsgLy8gbG9hZCBtb3JlIGl0ZW1zIGJlZm9yZSB5b3UgaGl0IHRoZSB0b3BcbiAgICAgICAgdmFyIHNoID0gcmF3LnNjcm9sbEhlaWdodFxuICAgICAgICBzY29wZS4kYXBwbHkoYXR0ci53aGVuU2Nyb2xsZWQpO1xuICAgICAgICByYXcuc2Nyb2xsVG9wID0gcmF3LnNjcm9sbEhlaWdodCAtIHNoO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xufV0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG50aGVUb29sRGlyZWN0aXZlc1xuICAuZGlyZWN0aXZlKCdzcGVha2VyQ2FyZCcsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBRUMnLFxuICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgIHRlbXBsYXRlVXJsOiAndmlld3Mvc3BlYWtlci9jYXJkLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ1NwZWFrZXJFbWJlZENvbnRyb2xsZXInLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgc3BlYWtlcjogJz1zcGVha2VyJyxcbiAgICAgICAgZXZlbnQ6ICc9ZXZlbnQnLFxuICAgICAgICBub3RpZmljYXRpb25zOiAnPW5vdGlmaWNhdGlvbnMnLFxuICAgICAgICBtZTogJz1tZScsXG4gICAgICAgIG1lbWJlcnM6ICc9bWVtYmVycydcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbiIsImFyZ3VtZW50c1s0XVs2MF1bMF0uYXBwbHkoZXhwb3J0cyxhcmd1bWVudHMpIiwicmVxdWlyZSgnLi9zdWJzY3JpcHRpb24nKTsiLCIndXNlIHN0cmljdCc7XG5cbnRoZVRvb2xEaXJlY3RpdmVzXG4gIC5kaXJlY3RpdmUoJ3N1YnNjcmlwdGlvbicsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFQUMnLFxuICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgIHRlbXBsYXRlVXJsOiAndmlld3Mvc3Vic2NyaXB0aW9uL2J1dHRvbi5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdTdWJzY3JpcHRpb25Db250cm9sbGVyJyxcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgIHRocmVhZDogJ0AnXG4gICAgICB9XG4gICAgfTtcbiAgfSkiLCJhcmd1bWVudHNbNF1bNDddWzBdLmFwcGx5KGV4cG9ydHMsYXJndW1lbnRzKSIsIlwidXNlIHN0cmljdFwiO1xuXG50aGVUb29sRGlyZWN0aXZlc1xuICAuZGlyZWN0aXZlKFwidGFnTWFuYWdlclwiLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiBcIkVcIixcbiAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICB0ZW1wbGF0ZVVybDogXCJ2aWV3cy90YWcvbWFuYWdlci5odG1sXCIsXG4gICAgICBjb250cm9sbGVyOiBcIlRhZ01hbmFnZXJDb250cm9sbGVyXCIsXG4gICAgICBzY29wZToge1xuICAgICAgICB0YWdzOiBcIj10YWdzQXJyYXlcIixcbiAgICAgICAgc2VhcmNoOiBcIj1cIlxuICAgICAgfVxuICAgIH07XG4gIH0pXG4iLCJcInVzZSBzdHJpY3RcIjtcblxudGhlVG9vbERpcmVjdGl2ZXMuZGlyZWN0aXZlKFwidG9waWNDYXJkXCIsIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogXCJFXCIsXG4gICAgcmVwbGFjZTogdHJ1ZSxcbiAgICB0ZW1wbGF0ZVVybDogXCJ2aWV3cy90b3BpYy9jYXJkLmh0bWxcIixcbiAgICBjb250cm9sbGVyOiBcIlRvcGljRW1iZWRDb250cm9sbGVyXCIsXG4gICAgc2NvcGU6IHtcbiAgICAgIHRvcGljOiBcIj1cIixcbiAgICAgIG1lbWJlcnM6IFwiPVwiLFxuICAgICAgbWU6IFwiPVwiLFxuICAgICAgcm9sZXM6IFwiPVwiLFxuICAgICAgdGFnczogXCI9XCIsXG4gICAgICBjb21tZW50czogXCI9XCIsXG4gICAgICBub3RpZmljYXRpb25zOiBcIj1cIlxuICAgIH1cbiAgfTtcbn0pO1xuIiwicmVxdWlyZShcIi4vdG9waWNcIik7XG5yZXF1aXJlKFwiLi9jYXJkXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnRoZVRvb2xEaXJlY3RpdmVzLmRpcmVjdGl2ZShcInRvcGljXCIsIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogXCJFXCIsXG4gICAgcmVwbGFjZTogdHJ1ZSxcbiAgICB0ZW1wbGF0ZVVybDogXCJ2aWV3cy90b3BpYy90b3BpYy5odG1sXCIsXG4gICAgY29udHJvbGxlcjogXCJUb3BpY0VtYmVkQ29udHJvbGxlclwiLFxuICAgIHNjb3BlOiB7XG4gICAgICB0b3BpYzogXCI9XCIsXG4gICAgICBtZW1iZXJzOiBcIj1cIixcbiAgICAgIG1lOiBcIj1cIixcbiAgICAgIHJvbGVzOiBcIj1cIixcbiAgICAgIHRhZ3M6IFwiPVwiLFxuICAgICAgY29tbWVudHM6IFwiPVwiLFxuICAgICAgbm90aWZpY2F0aW9uczogXCI9XCJcbiAgICB9XG4gIH07XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxuYW5ndWxhci5tb2R1bGUoJ3RoZVRvb2wuZmlsdGVycycsIFtdKVxuICAuZmlsdGVyKCdpbnRlcnBvbGF0ZScsIFsndmVyc2lvbicsIGZ1bmN0aW9uKHZlcnNpb24pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24odGV4dCkge1xuICAgICAgcmV0dXJuIFN0cmluZyh0ZXh0KS5yZXBsYWNlKC9cXCVWRVJTSU9OXFwlL21nLCB2ZXJzaW9uKTtcbiAgICB9XG4gIH1dKVxuICAuZmlsdGVyKCdmaWx0ZXJFdmVudFN0YXR1cycsIGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG9ianMsIGV2ZW50LCBzZWFyY2gpIHtcbiAgICAgIHZhciByZXN1bHQgPSBvYmpzO1xuICAgICAgcmVzdWx0ID0gb2Jqcy5maWx0ZXIoZnVuY3Rpb24obykge1xuICAgICAgICBpZihvLnBhcnRpY2lwYXRpb25zLmxlbmd0aCA8PSAwKXtcbiAgICAgICAgICByZXR1cm4gc2VhcmNoLnVuYXNzaWduZWQgfHwgc2VhcmNoLnVuYXNzaWduZWRPbmx5O1xuICAgICAgICB9XG4gICAgICAgIGlmKGV2ZW50ICYmICFzZWFyY2gudW5hc3NpZ25lZE9ubHkpIHtcbiAgICAgICAgICByZXR1cm4gby5wYXJ0aWNpcGF0aW9ucy5maWx0ZXIoZnVuY3Rpb24ocCkge1xuICAgICAgICAgICAgaWYoc2VhcmNoLnN0YXR1cyAmJiBzZWFyY2guc3RhdHVzICE9PSAnJyAmJiBzZWFyY2gubWVtYmVyICYmIHNlYXJjaC5tZW1iZXIgIT09ICcnKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwLmV2ZW50ID09PSBldmVudC5pZCAmJiBwLnN0YXR1cyA9PT0gc2VhcmNoLnN0YXR1cyAmJiBwLm1lbWJlciA9PT0gc2VhcmNoLm1lbWJlcjtcbiAgICAgICAgICAgIH0gZWxzZSBpZihzZWFyY2guc3RhdHVzICYmIHNlYXJjaC5zdGF0dXMgIT09ICcnKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwLmV2ZW50ID09PSBldmVudC5pZCAmJiBwLnN0YXR1cyA9PT0gc2VhcmNoLnN0YXR1cztcbiAgICAgICAgICAgIH0gZWxzZSBpZihzZWFyY2gubWVtYmVyICYmIHNlYXJjaC5tZW1iZXIgIT09ICcnKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwLmV2ZW50ID09PSBldmVudC5pZCAmJiBwLm1lbWJlciA9PT0gc2VhcmNoLm1lbWJlcjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiBwLmV2ZW50ID09PSBldmVudC5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KS5sZW5ndGggPiAwO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfSlcbiAgLmZpbHRlcignZmlsdGVyUm9sZScsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmdW5jdGlvbihtZW1iZXJzLCByb2xlKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IG1lbWJlcnM7XG4gICAgICAgICAgaWYocm9sZSkge1xuICAgICAgICAgICAgcmVzdWx0ID0gbWVtYmVycy5maWx0ZXIoZnVuY3Rpb24obSkge1xuICAgICAgICAgICAgICByZXR1cm4gbS5yb2xlcy5maWx0ZXIoZnVuY3Rpb24ocikge1xuICAgICAgICAgICAgICAgIHJldHVybiByLmlkID09IHJvbGU7XG4gICAgICAgICAgICAgIH0pLmxlbmd0aCA+IDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH07XG4gIH0pOyIsIid1c2Ugc3RyaWN0JztcblxudGhlVG9vbFNlcnZpY2VzXG4gIC5mYWN0b3J5KCdDaGF0RmFjdG9yeScsIGZ1bmN0aW9uICgkcmVzb3VyY2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgQ2hhdDogJHJlc291cmNlKHVybF9wcmVmaXgrJy9hcGkvY2hhdC86aWQnLCBudWxsLCB7XG4gICAgICAgICd1cGRhdGUnOiB7bWV0aG9kOiAnUE9TVCd9LFxuICAgICAgICAnZ2V0QWxsJzoge21ldGhvZDogJ0dFVCcsIGlzQXJyYXk6dHJ1ZX1cbiAgICAgIH0pLFxuICAgICAgTWVzc2FnZTogJHJlc291cmNlKHVybF9wcmVmaXgrJy9hcGkvY2hhdC86aWQvbWVzc2FnZXMnLCBudWxsLCB7XG4gICAgICAgICdnZXRBbGwnOiB7bWV0aG9kOiAnR0VUJyxpc0FycmF5OnRydWV9XG4gICAgICB9KVxuICAgIH1cbiAgfSkiLCIndXNlIHN0cmljdCc7XG5cbnRoZVRvb2xTZXJ2aWNlc1xuICAuZmFjdG9yeSgnQ29tbWVudEZhY3RvcnknLCBmdW5jdGlvbiAoJHJlc291cmNlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIENvbW1lbnQ6ICRyZXNvdXJjZSh1cmxfcHJlZml4KycvYXBpL2NvbW1lbnQvOmlkJywgbnVsbCwge1xuICAgICAgICAnZ2V0QWxsJzoge21ldGhvZDogJ0dFVCcsIGlzQXJyYXk6IHRydWV9LFxuICAgICAgICAndXBkYXRlJzoge21ldGhvZDogJ1BVVCd9LFxuICAgICAgICAnY3JlYXRlJzoge21ldGhvZDogJ1BPU1QnfSxcbiAgICAgICAgJ2RlbGV0ZSc6IHttZXRob2Q6ICdERUxFVEUnfVxuICAgICAgfSksXG4gICAgICBDb21wYW55OiAkcmVzb3VyY2UodXJsX3ByZWZpeCsnL2FwaS9jb21wYW55LzppZC9jb21tZW50cycsIG51bGwsIHtcbiAgICAgICAgJ2dldEFsbCc6IHttZXRob2Q6ICdHRVQnLCBpc0FycmF5OiB0cnVlfVxuICAgICAgfSksXG4gICAgICBTcGVha2VyOiAkcmVzb3VyY2UodXJsX3ByZWZpeCsnL2FwaS9zcGVha2VyLzppZC9jb21tZW50cycsIG51bGwsIHtcbiAgICAgICAgJ2dldEFsbCc6IHttZXRob2Q6ICdHRVQnLCBpc0FycmF5OiB0cnVlfVxuICAgICAgfSksXG4gICAgICBUb3BpYzogJHJlc291cmNlKHVybF9wcmVmaXgrJy9hcGkvdG9waWMvOmlkL2NvbW1lbnRzJywgbnVsbCwge1xuICAgICAgICAnZ2V0QWxsJzoge21ldGhvZDogJ0dFVCcsIGlzQXJyYXk6IHRydWV9XG4gICAgICB9KSxcbiAgICAgIENvbW11bmljYXRpb246ICRyZXNvdXJjZSh1cmxfcHJlZml4KycvYXBpL2NvbW11bmljYXRpb24vOmlkL2NvbW1lbnRzJywgbnVsbCwge1xuICAgICAgICAnZ2V0QWxsJzoge21ldGhvZDogJ0dFVCcsIGlzQXJyYXk6IHRydWV9XG4gICAgICB9KVxuICAgIH1cbiAgfSkiLCIndXNlIHN0cmljdCc7XG5cbnRoZVRvb2xTZXJ2aWNlc1xuICAuZmFjdG9yeSgnQ29tbXVuaWNhdGlvbkZhY3RvcnknLCBmdW5jdGlvbiAoJHJlc291cmNlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIENvbW11bmljYXRpb246ICRyZXNvdXJjZSh1cmxfcHJlZml4KycvYXBpL2NvbW11bmljYXRpb24vOmlkJywgbnVsbCwge1xuICAgICAgICAnZ2V0QWxsJzoge21ldGhvZDogJ0dFVCcsIGlzQXJyYXk6IHRydWV9LFxuICAgICAgICAndXBkYXRlJzoge21ldGhvZDogJ1BVVCd9LFxuICAgICAgICAnY3JlYXRlJzoge21ldGhvZDogJ1BPU1QnfSxcbiAgICAgICAgJ2RlbGV0ZSc6IHttZXRob2Q6ICdERUxFVEUnfVxuICAgICAgfSksXG4gICAgICBDb21wYW55OiAkcmVzb3VyY2UodXJsX3ByZWZpeCsnL2FwaS9jb21wYW55LzppZC9jb21tdW5pY2F0aW9ucycsIG51bGwsIHtcbiAgICAgICAgJ2dldEFsbCc6IHttZXRob2Q6ICdHRVQnLCBpc0FycmF5OiB0cnVlfVxuICAgICAgfSksXG4gICAgICBTcGVha2VyOiAkcmVzb3VyY2UodXJsX3ByZWZpeCsnL2FwaS9zcGVha2VyLzppZC9jb21tdW5pY2F0aW9ucycsIG51bGwsIHtcbiAgICAgICAgJ2dldEFsbCc6IHttZXRob2Q6ICdHRVQnLCBpc0FycmF5OiB0cnVlfVxuICAgICAgfSlcbiAgICB9O1xuICB9KSIsIid1c2Ugc3RyaWN0JztcblxudGhlVG9vbFNlcnZpY2VzXG4gIC5mYWN0b3J5KCdDb21wYW55RmFjdG9yeScsIGZ1bmN0aW9uICgkcmVzb3VyY2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgQ29tcGFueTogJHJlc291cmNlKHVybF9wcmVmaXgrJy9hcGkvY29tcGFueS86aWQnLCBudWxsLCB7XG4gICAgICAgICdnZXRBbGwnOiB7bWV0aG9kOiAnR0VUJywgaXNBcnJheTp0cnVlfSxcbiAgICAgICAgJ3VwZGF0ZSc6IHttZXRob2Q6ICdQVVQnfSxcbiAgICAgICAgJ2NyZWF0ZSc6IHttZXRob2Q6ICdQT1NUJ30sXG4gICAgICAgICdkZWxldGUnOiB7bWV0aG9kOiAnREVMRVRFJ31cbiAgICAgIH0pLFxuICAgICAgTWVtYmVyOiAkcmVzb3VyY2UodXJsX3ByZWZpeCsnL2FwaS9tZW1iZXIvOmlkL2NvbXBhbmllcycsIG51bGwsIHtcbiAgICAgICAgJ2dldEFsbCc6IHttZXRob2Q6ICdHRVQnLCBpc0FycmF5OnRydWV9XG4gICAgICB9KVxuICAgIH07XG4gIH0pIiwiJ3VzZSBzdHJpY3QnO1xuXG50aGVUb29sU2VydmljZXNcbiAgLmZhY3RvcnkoJ0VtYWlsRmFjdG9yeScsIGZ1bmN0aW9uICgkcmVzb3VyY2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgQ29tcGFueTogJHJlc291cmNlKHVybF9wcmVmaXgrJy9hcGkvY29tcGFueS86aWQvc2VuZEluaXRpYWxFbWFpbCcsIG51bGwsIHtcbiAgICAgICAgJ3NlbmQnOiB7bWV0aG9kOiAnUE9TVCd9XG4gICAgICB9KSxcbiAgICAgIFNwZWFrZXI6ICRyZXNvdXJjZSh1cmxfcHJlZml4KycvYXBpL3NwZWFrZXIvOmlkL3NlbmRJbml0aWFsRW1haWwnLCBudWxsLCB7XG4gICAgICAgICdzZW5kJzoge21ldGhvZDogJ1BPU1QnfVxuICAgICAgfSlcbiAgICB9XG4gIH0pIiwiJ3VzZSBzdHJpY3QnO1xuXG50aGVUb29sU2VydmljZXNcbiAgLmZhY3RvcnkoJ0V2ZW50RmFjdG9yeScsIGZ1bmN0aW9uICgkcmVzb3VyY2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgRXZlbnQ6ICRyZXNvdXJjZSh1cmxfcHJlZml4KycvYXBpL2V2ZW50LzppZCcsIG51bGwsIHtcbiAgICAgICAgJ2dldEFsbCc6IHttZXRob2Q6ICdHRVQnLCBpc0FycmF5OiB0cnVlfSxcbiAgICAgICAgJ3VwZGF0ZSc6IHttZXRob2Q6ICdQVVQnfSxcbiAgICAgICAgJ2NyZWF0ZSc6IHttZXRob2Q6ICdQT1NUJ30sXG4gICAgICAgICdkZWxldGUnOiB7bWV0aG9kOiAnREVMRVRFJ31cbiAgICAgIH0pXG4gICAgfVxuICB9KSIsInRoZVRvb2xTZXJ2aWNlcyA9IGFuZ3VsYXIubW9kdWxlKCd0aGVUb29sLnNlcnZpY2VzJywgWyduZ1Jlc291cmNlJ10pO1xuXG5yZXF1aXJlKCcuL2NoYXQnKTtcbnJlcXVpcmUoJy4vY29tbWVudCcpO1xucmVxdWlyZSgnLi9jb21tdW5pY2F0aW9uJyk7XG5yZXF1aXJlKCcuL2NvbXBhbnknKTtcbnJlcXVpcmUoJy4vZW1haWwnKTtcbnJlcXVpcmUoJy4vbWVldGluZycpO1xucmVxdWlyZSgnLi9tZW1iZXInKTtcbnJlcXVpcmUoJy4vbWVzc2FnZScpO1xucmVxdWlyZSgnLi9ub3RpZmljYXRpb24nKTtcbnJlcXVpcmUoJy4vcm9sZScpO1xucmVxdWlyZSgnLi9zZXNzaW9uJyk7XG5yZXF1aXJlKCcuL3NvY2tldCcpO1xucmVxdWlyZSgnLi9zcGVha2VyJyk7XG5yZXF1aXJlKCcuL3N1YnNjcmlwdGlvbicpO1xucmVxdWlyZSgnLi90YWcnKTtcbnJlcXVpcmUoJy4vdG9waWMnKTtcbnJlcXVpcmUoJy4vZXZlbnQnKTtcbnJlcXVpcmUoJy4vaXRlbScpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG50aGVUb29sU2VydmljZXNcbiAgLmZhY3RvcnkoJ0l0ZW1GYWN0b3J5JywgZnVuY3Rpb24gKCRyZXNvdXJjZSkge1xuICAgIHJldHVybiB7XG4gICAgICBJdGVtOiAkcmVzb3VyY2UodXJsX3ByZWZpeCsnL2FwaS9pdGVtLzppZCcsIG51bGwsIHtcbiAgICAgICAgJ2dldEFsbCc6IHttZXRob2Q6ICdHRVQnLCBpc0FycmF5OiB0cnVlfSxcbiAgICAgICAgJ3VwZGF0ZSc6IHttZXRob2Q6ICdQVVQnfSxcbiAgICAgICAgJ2NyZWF0ZSc6IHttZXRob2Q6ICdQT1NUJ30sXG4gICAgICAgICdkZWxldGUnOiB7bWV0aG9kOiAnREVMRVRFJ31cbiAgICAgIH0pXG4gICAgfVxuICB9KSIsIid1c2Ugc3RyaWN0JztcblxudGhlVG9vbFNlcnZpY2VzXG4gIC5mYWN0b3J5KCdNZWV0aW5nRmFjdG9yeScsIGZ1bmN0aW9uICgkcmVzb3VyY2UpIHtcbiAgICByZXR1cm4gJHJlc291cmNlKHVybF9wcmVmaXgrJy9hcGkvbWVldGluZy86aWQnLCBudWxsLCB7XG4gICAgICAnZ2V0QWxsJzoge21ldGhvZDogJ0dFVCcsIGlzQXJyYXk6IHRydWV9LFxuICAgICAgJ2NyZWF0ZSc6IHttZXRob2Q6ICdQT1NUJ30sXG4gICAgICAndXBkYXRlJzoge21ldGhvZDogJ1BVVCd9LFxuICAgICAgJ2RlbGV0ZSc6IHttZXRob2Q6ICdERUxFVEUnfVxuICAgIH0pO1xuICB9KVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG50aGVUb29sU2VydmljZXNcbiAgLmZhY3RvcnkoJ01lbWJlckZhY3RvcnknLCBmdW5jdGlvbiAoJHJlc291cmNlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIE1lbWJlcjogJHJlc291cmNlKHVybF9wcmVmaXgrJy9hcGkvbWVtYmVyLzppZCcsIG51bGwsIHtcbiAgICAgICAgJ2dldEFsbCc6IHttZXRob2Q6ICdHRVQnLCBpc0FycmF5OnRydWV9LFxuICAgICAgICAndXBkYXRlJzoge21ldGhvZDogJ1BVVCd9LFxuICAgICAgICAnY3JlYXRlJzoge21ldGhvZDogJ1BPU1QnfSxcbiAgICAgICAgJ2RlbGV0ZSc6IHttZXRob2Q6ICdERUxFVEUnfVxuICAgICAgfSksXG4gICAgICBSb2xlOiAkcmVzb3VyY2UodXJsX3ByZWZpeCsnL2FwaS9yb2xlLzppZC9tZW1iZXJzJywgbnVsbCwge1xuICAgICAgICAnZ2V0QWxsJzoge21ldGhvZDogJ0dFVCcsIGlzQXJyYXk6IHRydWV9XG4gICAgICB9KSxcbiAgICAgIE1lOiAkcmVzb3VyY2UodXJsX3ByZWZpeCsnL2FwaS9teXNlbGYnLCBudWxsLCB7XG4gICAgICAgICdnZXQnOiB7bWV0aG9kOiAnR0VUJywgaXNBcnJheTogZmFsc2V9XG4gICAgICB9KVxuICAgIH07XG4gIH0pIiwiJ3VzZSBzdHJpY3QnO1xuXG50aGVUb29sU2VydmljZXNcbiAgLmZhY3RvcnkoJ01lc3NhZ2VGYWN0b3J5JywgZnVuY3Rpb24gKCRyZXNvdXJjZSkge1xuICAgIHJldHVybiAkcmVzb3VyY2UodXJsX3ByZWZpeCsnL2FwaS9tZXNzYWdlLzppZCcsIG51bGwsIHtcbiAgICAgICAgJ2dldEFsbCc6ICAgIHttZXRob2Q6ICdHRVQnLCBpc0FycmF5OiB0cnVlfVxuICAgICAgfSlcbiAgfSkiLCIndXNlIHN0cmljdCc7XG5cbnRoZVRvb2xTZXJ2aWNlcy5mYWN0b3J5KCdOb3RpZmljYXRpb25GYWN0b3J5JywgZnVuY3Rpb24gKCRyZXNvdXJjZSkge1xuICByZXR1cm4ge1xuICAgIE5vdGlmaWNhdGlvbjogJHJlc291cmNlKHVybF9wcmVmaXgrJy9hcGkvbm90aWZpY2F0aW9uLzppZCcsIG51bGwsIHtcbiAgICAgICdnZXRBbGwnOiB7bWV0aG9kOiAnR0VUJywgaXNBcnJheTogdHJ1ZX0sXG4gICAgICAndXBkYXRlJzoge21ldGhvZDogJ1BVVCd9XG4gICAgfSksXG4gICAgQ29tcGFueTogJHJlc291cmNlKHVybF9wcmVmaXgrJy9hcGkvY29tcGFueS86aWQvbm90aWZpY2F0aW9ucycsIG51bGwsIHtcbiAgICAgICdnZXRBbGwnOiB7bWV0aG9kOiAnR0VUJywgaXNBcnJheTogdHJ1ZX1cbiAgICB9KSxcbiAgICBTcGVha2VyOiAkcmVzb3VyY2UodXJsX3ByZWZpeCsnL2FwaS9zcGVha2VyLzppZC9ub3RpZmljYXRpb25zJywgbnVsbCwge1xuICAgICAgJ2dldEFsbCc6IHttZXRob2Q6ICdHRVQnLCBpc0FycmF5OiB0cnVlfVxuICAgIH0pLFxuICAgIFRvcGljOiAkcmVzb3VyY2UodXJsX3ByZWZpeCsnL2FwaS90b3BpYy86aWQvbm90aWZpY2F0aW9ucycsIG51bGwsIHtcbiAgICAgICdnZXRBbGwnOiB7bWV0aG9kOiAnR0VUJywgaXNBcnJheTogdHJ1ZX1cbiAgICB9KVxuICB9O1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnRoZVRvb2xTZXJ2aWNlc1xuICAuZmFjdG9yeSgnUm9sZUZhY3RvcnknLCBmdW5jdGlvbiAoJHJlc291cmNlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIFJvbGU6ICRyZXNvdXJjZSh1cmxfcHJlZml4KycvYXBpL3JvbGUvOmlkJywgbnVsbCwge1xuICAgICAgICAnZ2V0QWxsJzoge21ldGhvZDogJ0dFVCcsIGlzQXJyYXk6IHRydWV9LFxuICAgICAgfSksXG4gICAgICBNZW1iZXI6ICRyZXNvdXJjZSh1cmxfcHJlZml4KycvYXBpL3JvbGUvOmlkL21lbWJlcnMnLCBudWxsLCB7XG4gICAgICAgICdnZXRBbGwnOiB7bWV0aG9kOiAnR0VUJywgaXNBcnJheTogdHJ1ZX1cbiAgICAgIH0pXG4gICAgfTtcbiAgfSlcbiIsIid1c2Ugc3RyaWN0JztcblxudGhlVG9vbFNlcnZpY2VzXG4gIC5mYWN0b3J5KCdTZXNzaW9uRmFjdG9yeScsIGZ1bmN0aW9uICgkcmVzb3VyY2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgU2Vzc2lvbjogJHJlc291cmNlKHVybF9wcmVmaXgrJy9hcGkvc2Vzc2lvbi86aWQnLCBudWxsLCB7XG4gICAgICAgICdnZXRBbGwnOiB7bWV0aG9kOiAnR0VUJywgaXNBcnJheTogdHJ1ZX0sXG4gICAgICAgICd1cGRhdGUnOiB7bWV0aG9kOiAnUFVUJ30sXG4gICAgICAgICdjcmVhdGUnOiB7bWV0aG9kOiAnUE9TVCd9LFxuICAgICAgICAnZGVsZXRlJzoge21ldGhvZDogJ0RFTEVURSd9XG4gICAgICB9KSxcbiAgICAgIENvbXBhbnk6ICRyZXNvdXJjZSh1cmxfcHJlZml4KycvYXBpL2NvbXBhbnkvOmlkL3Nlc3Npb25zJywgbnVsbCwge1xuICAgICAgICAnZ2V0QWxsJzoge21ldGhvZDogJ0dFVCcsIGlzQXJyYXk6IHRydWV9XG4gICAgICB9KSxcbiAgICAgIFNwZWFrZXI6ICRyZXNvdXJjZSh1cmxfcHJlZml4KycvYXBpL3NwZWFrZXIvOmlkL3Nlc3Npb25zJywgbnVsbCwge1xuICAgICAgICAnZ2V0QWxsJzoge21ldGhvZDogJ0dFVCcsIGlzQXJyYXk6IHRydWV9XG4gICAgICB9KVxuICAgIH1cbiAgfSkiLCIndXNlIHN0cmljdCc7XG5cbnRoZVRvb2xTZXJ2aWNlc1xuICAuZmFjdG9yeSgnU29ja2V0RmFjdG9yeScsIGZ1bmN0aW9uICgkcmVzb3VyY2UsICRsb2NhdGlvbiwgJHJvb3RTY29wZSkge1xuICAgIHZhciBzb2NrZXQ7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbm5lY3Q6IGZ1bmN0aW9uKG5zcCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKHNvY2tldCk7XG4gICAgICAgIHNvY2tldCA9IGlvLmNvbm5lY3QobnNwLCB7bXVsdGlwbGV4OiBmYWxzZX0pO1xuICAgICAgfSxcbiAgICAgIG9uOiBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgICAgICBzb2NrZXQub24oZXZlbnROYW1lLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkoc29ja2V0LCBhcmdzKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgZW1pdDogZnVuY3Rpb24gKGV2ZW50TmFtZSwgZGF0YSwgY2FsbGJhY2spIHtcbiAgICAgICAgc29ja2V0LmVtaXQoZXZlbnROYW1lLCBkYXRhLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KHNvY2tldCwgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGRpc2Nvbm5lY3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc29ja2V0LmRpc2Nvbm5lY3QoKTtcbiAgICAgIH0sXG4gICAgICBzb2NrZXQ6IHNvY2tldFxuICAgIH07XG4gIH0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG50aGVUb29sU2VydmljZXNcbiAgLmZhY3RvcnkoJ1NwZWFrZXJGYWN0b3J5JywgZnVuY3Rpb24gKCRyZXNvdXJjZSkge1xuICAgIHJldHVybiB7XG4gICAgICBTcGVha2VyOiAkcmVzb3VyY2UodXJsX3ByZWZpeCsnL2FwaS9zcGVha2VyLzppZCcsIG51bGwsIHtcbiAgICAgICAgJ2dldEFsbCc6IHttZXRob2Q6ICdHRVQnLCBpc0FycmF5OnRydWV9LFxuICAgICAgICAndXBkYXRlJzoge21ldGhvZDogJ1BVVCd9LFxuICAgICAgICAnY3JlYXRlJzoge21ldGhvZDogJ1BPU1QnfSxcbiAgICAgICAgJ2RlbGV0ZSc6IHttZXRob2Q6ICdERUxFVEUnfVxuICAgICAgfSksXG4gICAgICBNZW1iZXI6ICRyZXNvdXJjZSh1cmxfcHJlZml4KycvYXBpL21lbWJlci86aWQvc3BlYWtlcnMnLCBudWxsLCB7XG4gICAgICAgICdnZXRBbGwnOiB7bWV0aG9kOiAnR0VUJywgaXNBcnJheTp0cnVlfVxuICAgICAgfSlcbiAgICB9O1xuICB9KSIsIlwidXNlIHN0cmljdFwiO1xuXG50aGVUb29sU2VydmljZXMuZmFjdG9yeShcIlN1YnNjcmlwdGlvbkZhY3RvcnlcIiwgZnVuY3Rpb24gKCRyZXNvdXJjZSkge1xuICByZXR1cm4ge1xuICAgIENvbXBhbnk6ICRyZXNvdXJjZSh1cmxfcHJlZml4ICsgXCIvYXBpL2NvbXBhbnkvOmlkL3N1YnNjcmlwdGlvblwiLCBudWxsLCB7XG4gICAgICBcImdldFwiOiB7bWV0aG9kOiBcIkdFVFwifSxcbiAgICAgIFwiYWRkXCI6IHttZXRob2Q6IFwiUE9TVFwifSxcbiAgICAgIFwicmVtb3ZlXCI6IHttZXRob2Q6IFwiREVMRVRFXCJ9XG4gICAgfSksXG4gICAgU3BlYWtlcjogJHJlc291cmNlKHVybF9wcmVmaXggKyBcIi9hcGkvc3BlYWtlci86aWQvc3Vic2NyaXB0aW9uXCIsIG51bGwsIHtcbiAgICAgIFwiZ2V0XCI6IHttZXRob2Q6IFwiR0VUXCJ9LFxuICAgICAgXCJhZGRcIjoge21ldGhvZDogXCJQT1NUXCJ9LFxuICAgICAgXCJyZW1vdmVcIjoge21ldGhvZDogXCJERUxFVEVcIn1cbiAgICB9KSxcbiAgICBUb3BpYzogJHJlc291cmNlKHVybF9wcmVmaXggKyBcIi9hcGkvdG9waWMvOmlkL3N1YnNjcmlwdGlvblwiLCBudWxsLCB7XG4gICAgICBcImdldFwiOiB7bWV0aG9kOiBcIkdFVFwifSxcbiAgICAgIFwiYWRkXCI6IHttZXRob2Q6IFwiUE9TVFwifSxcbiAgICAgIFwicmVtb3ZlXCI6IHttZXRob2Q6IFwiREVMRVRFXCJ9XG4gICAgfSlcbiAgfTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG50aGVUb29sU2VydmljZXNcbiAgLmZhY3RvcnkoJ1RhZ0ZhY3RvcnknLCBmdW5jdGlvbiAoJHJlc291cmNlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIFRhZzogJHJlc291cmNlKHVybF9wcmVmaXgrJy9hcGkvdGFnLzppZCcsIG51bGwsIHtcbiAgICAgICAgJ2dldEFsbCc6IHttZXRob2Q6ICdHRVQnLCBpc0FycmF5OiB0cnVlfSxcbiAgICAgICAgJ3VwZGF0ZSc6IHttZXRob2Q6ICdQVVQnfSxcbiAgICAgICAgJ2NyZWF0ZSc6IHttZXRob2Q6ICdQT1NUJ30sXG4gICAgICAgICdkZWxldGUnOiB7bWV0aG9kOiAnREVMRVRFJ31cbiAgICAgIH0pLFxuICAgICAgVG9waWM6ICRyZXNvdXJjZSh1cmxfcHJlZml4KycvYXBpL3RhZy86aWQvdG9waWNzJywgbnVsbCwge1xuICAgICAgICAnZ2V0QWxsJzoge21ldGhvZDogJ0dFVCcsIGlzQXJyYXk6IHRydWV9XG4gICAgICB9KVxuICAgIH07XG4gIH0pIiwiJ3VzZSBzdHJpY3QnO1xuXG50aGVUb29sU2VydmljZXNcbiAgLmZhY3RvcnkoJ1RvcGljRmFjdG9yeScsIGZ1bmN0aW9uICgkcmVzb3VyY2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgVG9waWM6ICRyZXNvdXJjZSh1cmxfcHJlZml4KycvYXBpL3RvcGljLzppZCcsIG51bGwsIHtcbiAgICAgICAgJ2dldEFsbCc6IHttZXRob2Q6ICdHRVQnLCBpc0FycmF5OiB0cnVlfSxcbiAgICAgICAgJ2NyZWF0ZSc6IHttZXRob2Q6ICdQT1NUJ30sXG4gICAgICAgICd1cGRhdGUnOiB7bWV0aG9kOiAnUFVUJ30sXG4gICAgICAgICdkZWxldGUnOiB7bWV0aG9kOiAnREVMRVRFJ31cbiAgICAgIH0pLFxuICAgICAgTWVtYmVyOiAkcmVzb3VyY2UodXJsX3ByZWZpeCsnL2FwaS9tZW1iZXIvOmlkL3RvcGljcycsIG51bGwsIHtcbiAgICAgICAgJ2dldEFsbCc6IHsgbWV0aG9kOiAnR0VUJywgaXNBcnJheTogdHJ1ZSB9XG4gICAgICB9KVxuICAgIH07XG4gIH0pXG4iLCJ1cmxfcHJlZml4ID0gcmVxdWlyZSgnLi8uLi8uLi9jb25maWcnKS51cmw7XG5cbnJlcXVpcmUoJy4vYW5ndWxhckFwcC9hcHAuanMnKTtcbnJlcXVpcmUoJy4vYW5ndWxhckFwcC9jb250cm9sbGVycycpO1xucmVxdWlyZSgnLi9hbmd1bGFyQXBwL2RpcmVjdGl2ZXMnKTtcbnJlcXVpcmUoJy4vYW5ndWxhckFwcC9maWx0ZXJzJyk7XG5yZXF1aXJlKCcuL2FuZ3VsYXJBcHAvc2VydmljZXMnKTsiLCJ2YXIgcHJvY2Vzcz1yZXF1aXJlKFwiX19icm93c2VyaWZ5X3Byb2Nlc3NcIik7dmFyIGNvbmZpZyA9IHtcbiAgdXJsOiBwcm9jZXNzLmVudi5FVkVOVERFQ0tfVVJMIHx8ICdodHRwOi8vbG9jYWxob3N0OjgwODAnLFxuICBwb3J0OiBwcm9jZXNzLmVudi5FVkVOVERFQ0tfUE9SVCB8fCA4MDgwLFxufTtcblxuY29uZmlnLm1vbmdvID0ge1xuICB1cmw6IHByb2Nlc3MuZW52LkVWRU5UREVDS19NT05HT19VUkwgfHwgJ21vbmdvZGI6Ly9sb2NhbGhvc3Qvc2luZm8nXG59O1xuXG5jb25maWcuY29va2llID0ge1xuICBuYW1lOiBwcm9jZXNzLmVudi5FVkVOVERFQ0tfQ09PS0lFX05BTUUgfHwgJ2V2ZW50ZGVjaycsXG4gIHBhc3N3b3JkOiBwcm9jZXNzLmVudi5FVkVOVERFQ0tfQ09PS0lFX1BBU1NXT1JEIHx8ICdZT1VSIENPT0tJRSBQQVNTV09SRCdcbn07XG5cbmNvbmZpZy5tYWlsZ3VuID0ge1xuICBlbWFpbDogcHJvY2Vzcy5lbnYuRVZFTlRERUNLX01BSUxHVU5fRU1BSUwgfHwgJ3Rvb2xAYmFuYW5hbWFya2V0LmV1JyxcbiAgYXBpOiBwcm9jZXNzLmVudi5FVkVOVERFQ0tfTUFJTEdVTl9BUEkgfHwgJ2tleS03am0xYzAwOWV6anY4NXBrbTFycWZ4ZXZ1ZmVvdmI0MycsXG4gIHB1YmxpY0FwaTogcHJvY2Vzcy5lbnYuRVZFTlRERUNLX01BSUxHVU5fUFVCTElDX0FQSSB8fCAncHVia2V5LTBibHY2ZHJzNjM3NDVveHJ1M2l0dmZnMXVycDY2Mnk4J1xufTtcblxuY29uZmlnLmZhY2Vib29rID0ge1xuICBhcHBJZDogcHJvY2Vzcy5lbnYuRVZFTlRERUNLX0ZBQ0VCT09LX0FQUF9JRCB8fCAnNDU3MjA3NTA3NzQ0MTU5JyxcbiAgYXBwU2VjcmV0OiBwcm9jZXNzLmVudi5FVkVOVERFQ0tfRkFDRUJPT0tfQVBQX1NFQ1JFVCB8fCAnOWYwMjdjNTJlMDBiYzNhZGJhYmNkOTI2YTNjOTViOTcnXG59O1xuXG5jb25maWcuYnVueWFuID0ge1xuICBuYW1lOiByZXF1aXJlKCcuL3BhY2thZ2UuanNvbicpLm5hbWUsXG4gIGxldmVsOiBwcm9jZXNzLmVudi5FVkVOVERFQ0tfTE9HX0xFVkVMIHx8ICd0cmFjZSdcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBjb25maWc7IiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxucHJvY2Vzcy5uZXh0VGljayA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhblNldEltbWVkaWF0ZSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnNldEltbWVkaWF0ZTtcbiAgICB2YXIgY2FuUG9zdCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnBvc3RNZXNzYWdlICYmIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyXG4gICAgO1xuXG4gICAgaWYgKGNhblNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGYpIHsgcmV0dXJuIHdpbmRvdy5zZXRJbW1lZGlhdGUoZikgfTtcbiAgICB9XG5cbiAgICBpZiAoY2FuUG9zdCkge1xuICAgICAgICB2YXIgcXVldWUgPSBbXTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBldi5zb3VyY2U7XG4gICAgICAgICAgICBpZiAoKHNvdXJjZSA9PT0gd2luZG93IHx8IHNvdXJjZSA9PT0gbnVsbCkgJiYgZXYuZGF0YSA9PT0gJ3Byb2Nlc3MtdGljaycpIHtcbiAgICAgICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm4gPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKGZuKTtcbiAgICAgICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSgncHJvY2Vzcy10aWNrJywgJyonKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XG4gICAgfTtcbn0pKCk7XG5cbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn1cblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuIiwidmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zZXNzaW9uID0ge1xuXHRraW5kOiBbXG5cdFx0e2lkOiAna2V5bm90ZScsIG5hbWU6ICdLZXlub3RlJywgY29sb3I6JyM0MzlCRTgnfSxcblx0XHR7aWQ6ICdtZWV0dXAnLCBuYW1lOiAnTWVldHVwJywgY29sb3I6ICcjNDdGMjMwJ30sXG5cdFx0e2lkOiAncHJlc2VudGF0aW9uJywgbmFtZTogJ1ByZXNlbnRhdGlvbicsIGNvbG9yOiAnIzVGNEVGNSd9LFxuXHRcdHtpZDogJ3RhbGsnLCBuYW1lOiAnVGFsaycsIGNvbG9yOiAnI0ZBODQwNSd9LFxuXHRcdHtpZDogJ3dvcmtzaG9wJywgbmFtZTogJ1dvcmtzaG9wJywgY29sb3I6ICcjRjUxNDE0J31cblx0XVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBvcHRpb25zOyIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJuYW1lXCI6IFwiZXZlbnRkZWNrXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMC4wXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJldmVudGRlY2sgPT09PT09PT1cIixcbiAgXCJtYWluXCI6IFwiaW5kZXguanNcIixcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcInN0YXJ0XCI6IFwibm9kZSBzZXJ2ZXJBcHAvaW5kZXguanMgfCBidW55YW5cIixcbiAgICBcIm1vblwiOiBcIm5vZGVfbW9kdWxlcy8uYmluL25vZGVtb24gc2VydmVyQXBwL2luZGV4LmpzIHwgYnVueWFuXCIsXG4gICAgXCJkaXN0XCI6IFwibm9kZV9tb2R1bGVzLy5iaW4vYnJvd3NlcmlmeSAtdCBicmZzIC0tZGVidWcgLWUgY2xpZW50QXBwL2pzL3RoZVRvb2wuanMgLW8gcHVibGljL2pzL3RoZVRvb2wuanNcIixcbiAgICBcInRlc3RcIjogXCJlY2hvIFxcXCJFcnJvcjogbm8gdGVzdCBzcGVjaWZpZWRcXFwiICYmIGV4aXQgMVwiXG4gIH0sXG4gIFwicmVwb3NpdG9yeVwiOiB7XG4gICAgXCJ0eXBlXCI6IFwiZ2l0XCIsXG4gICAgXCJ1cmxcIjogXCJnaXQ6Ly9naXRodWIuY29tL1NJTkZPL2V2ZW50ZGVjay5naXRcIlxuICB9LFxuICBcImF1dGhvclwiOiBcIkZyYW5jaXNjbyBEaWFzIDxmcmFuY2lzY29AYmFpb2RpYXMuY29tPiAoaHR0cDovL2ZyYW5jaXNjb2RpYXMubmV0LylcIixcbiAgXCJsaWNlbnNlXCI6IFwiQlNELTItQ2xhdXNlXCIsXG4gIFwiYnVnc1wiOiB7XG4gICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vU0lORk8vZXZlbnRkZWNrL2lzc3Vlc1wiXG4gIH0sXG4gIFwiaG9tZXBhZ2VcIjogXCJodHRwczovL2dpdGh1Yi5jb20vU0lORk8vZXZlbnRkZWNrXCIsXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImNyb25cIjogXCJ+MS4wLjRcIixcbiAgICBcImhhcGlcIjogXCJ+My4wLjBcIixcbiAgICBcImhhcGktYXV0aC1jb29raWVcIjogXCJ+MS4wLjJcIixcbiAgICBcImhhbmRsZWJhcnNcIjogXCJ+Mi4wLjAtYWxwaGEuMlwiLFxuICAgIFwiYXN5bmNcIjogXCJ+MC4yLjlcIixcbiAgICBcIm1vbmdvb3NlXCI6IFwifjMuOC40XCIsXG4gICAgXCJtYXJrZG93blwiOiBcIn4wLjUuMFwiLFxuICAgIFwiZW1haWxqc1wiOiBcIn4wLjMuOFwiLFxuICAgIFwic29ja2V0LmlvXCI6IFwifjEuMC4yXCIsXG4gICAgXCJzb2NrZXQuaW8tY2xpZW50XCI6IFwifjEuMC4yXCIsXG4gICAgXCJyZXF1ZXN0XCI6IFwifjIuMzYuMFwiLFxuICAgIFwibWFpbGd1blwiOiBcIn4wLjQuMlwiLFxuICAgIFwibWFpbGNvbXBvc2VyXCI6IFwifjAuMi4xMlwiLFxuICAgIFwiYnVueWFuXCI6IFwifjEuMC4xXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwibm9kZW1vblwiOiBcIn4wLjcuMTBcIixcbiAgICBcImNvbG9yc1wiOiBcIn4wLjYuMlwiLFxuICAgIFwiZ2F6ZVwiOiBcIn4wLjQuM1wiLFxuICAgIFwiYnJmc1wiOiBcIjAuMC44XCIsXG4gICAgXCJicm93c2VyaWZ5XCI6IFwifjMuMjAuMFwiLFxuICAgIFwidGFibGV0b3BcIjogXCJ+MS4zLjNcIlxuICB9XG59XG4iXX0=
