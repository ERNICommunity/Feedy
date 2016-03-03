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
                        templateUrl: 'scripts/app/pages/colleagues/colleagues.html',
                        controller: 'ColleaguesController'
                    }
                },
                resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('colleagues');
                        return $translate.refresh();
                    }]
                }
            })
            .state('colleagues-detail', {
                parent: 'colleagues',
                url: '/user/:login',
                data: {
                    authorities: [],
                },
                views: {
                    'content@': {
                        controller: 'ColleaguesDetailsController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('user.management');
                        return $translate.refresh();
                    }]
                }
            })
    });
