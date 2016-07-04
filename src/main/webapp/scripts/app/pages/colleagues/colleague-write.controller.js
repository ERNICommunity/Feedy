'use strict';

angular.module('feedyApp')
    .controller('ColleagueWriteController', function ($scope, $stateParams, $uibModalInstance, User, Form, Question) {
        $scope.user = {};
        $scope.selectedForm ={};
        $scope.forms = Form.query(function(result){
            $scope.selectedForm = result[0];
        });

        $scope.load = function (login) {
            User.get({login: login}, function(result) {
                $scope.user = result;
            });
        };
        $scope.load($stateParams.login);

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

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
    });

