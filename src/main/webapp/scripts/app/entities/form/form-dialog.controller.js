'use strict';

angular.module('feedyApp').controller('FormDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Form', 'Question',
        function($scope, $stateParams, $uibModalInstance, entity, Form, Question) {

        $scope.form = entity;
        $scope.questions = Question.query();
        $scope.load = function(id) {
            Form.get({id : id}, function(result) {
                $scope.form = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('feedyApp:formUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.form.id != null) {
                Form.update($scope.form, onSaveSuccess, onSaveError);
            } else {
                Form.save($scope.form, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
