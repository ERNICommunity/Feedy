'use strict';

angular.module('feedyApp')
    .controller('QuestionDetailController', function ($scope, $rootScope, $stateParams, entity, Question, Option, Form) {
        $scope.question = entity;
        $scope.load = function (id) {
            Question.get({id: id}, function(result) {
                $scope.question = result;
            });
        };
        var unsubscribe = $rootScope.$on('feedyApp:questionUpdate', function(event, result) {
            $scope.question = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
