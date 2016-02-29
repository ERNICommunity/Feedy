'use strict';

angular.module('feedyApp')
    .controller('QuestionController', function ($scope, $state, Question) {

        $scope.questions = [];
        $scope.loadAll = function() {
            Question.query(function(result) {
               $scope.questions = result;
            });
        };
        $scope.loadAll();


        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.question = {
                answerType: null,
                text: null,
                isMandatory: false,
                id: null
            };
        };
    });
