'use strict';

angular.module('feedyApp').controller('AnswerDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Answer', 'Question', 'Option',
        function($scope, $stateParams, $uibModalInstance, $q, entity, Answer, Question, Option) {

        $scope.answer = entity;
        $scope.questions = Question.query({filter: 'answer-is-null'});
        $q.all([$scope.answer.$promise, $scope.questions.$promise]).then(function() {
            if (!$scope.answer.question || !$scope.answer.question.id) {
                return $q.reject();
            }
            return Question.get({id : $scope.answer.question.id}).$promise;
        }).then(function(question) {
            $scope.questions.push(question);
        });
        $scope.options = Option.query();
        $scope.load = function(id) {
            Answer.get({id : id}, function(result) {
                $scope.answer = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('feedyApp:answerUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.answer.id != null) {
                Answer.update($scope.answer, onSaveSuccess, onSaveError);
            } else {
                Answer.save($scope.answer, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
