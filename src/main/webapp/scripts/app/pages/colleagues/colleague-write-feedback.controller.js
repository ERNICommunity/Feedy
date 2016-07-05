'use strict';

angular.module('feedyApp')
    .controller('FeedbackController',
     ['$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Answer', 'Question', 'Entry',
        function ($scope, $stateParams, $uibModalInstance, $q, entity, Answer, Question, Entry) {

        $scope.answer = entity;

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
    });
