'use strict';

angular.module('feedyApp')
    .controller('EntryController', function ($scope, $state, Entry) {

        $scope.entrys = [];
        $scope.loadAll = function() {
            Entry.query(function(result) {
               $scope.entrys = result;
            });
        };
        $scope.loadAll();


        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.entry = {
                isSigned: false,
                status: null,
                created: null,
                lastEdited: null,
                firstRead: null,
                id: null
            };
        };
    });
