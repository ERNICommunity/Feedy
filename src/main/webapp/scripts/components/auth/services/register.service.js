'use strict';

angular.module('feedyApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


