'use strict';

angular.module('feedyApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('colleagues', {
                parent: 'site',
                url: '/colleagues',
                data: {
                    authorities: []
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/pages/colleagues.html',
                        controller: 'ColleaguesController'
                    }
                },
                resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('main');
                        return $translate.refresh();
                    }]
                }
            });
    });
