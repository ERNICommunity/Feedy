'use strict';

angular.module('feedyApp')
    .controller('AnswerDetailController', function ($scope, $rootScope, $stateParams, entity, Answer, Question, Option) {
        $scope.answer = entity;
        $scope.load = function (id) {
            Answer.get({id: id}, function(result) {
                $scope.answer = result;
            });
        };
        var unsubscribe = $rootScope.$on('feedyApp:answerUpdate', function(event, result) {
            $scope.answer = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
