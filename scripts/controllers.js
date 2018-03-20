'use strict';

angular.module('startupApp')

/*.constant("messagesURL", "/messages")*/

    .controller('IndexController', ['$scope', function ($scope) {
        $scope.heloMsg = "Salut lume!";
        $scope.subtitle = "This is a boilerplate Angular App which contains: AngularJS, Bootstrap, Gulp, Sass, BrowserSync"
    }])

;