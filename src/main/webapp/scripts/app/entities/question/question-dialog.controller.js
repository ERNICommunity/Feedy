'use strict';

angular.module('feedyApp').controller('QuestionDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Question', 'Option', 'Form',
        function($scope, $stateParams, $uibModalInstance, entity, Question, Option, Form) {

        $scope.question = entity;
        $scope.options = Option.query();
        $scope.forms = Form.query();
        $scope.load = function(id) {
            Question.get({id : id}, function(result) {
                $scope.question = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('feedyApp:questionUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.question.id != null) {
                Question.update($scope.question, onSaveSuccess, onSaveError);
            } else {
                Question.save($scope.question, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
