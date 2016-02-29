'use strict';

angular.module('feedyApp')
    .controller('AnswerController', function ($scope, $state, Answer) {

        $scope.answers = [];
        $scope.loadAll = function() {
            Answer.query(function(result) {
               $scope.answers = result;
            });
        };
        $scope.loadAll();


        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.answer = {
                text: null,
                id: null
            };
        };
    });
