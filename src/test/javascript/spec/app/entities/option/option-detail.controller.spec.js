'use strict';

describe('Controller Tests', function() {

    describe('Option Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockOption, MockQuestion;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockOption = jasmine.createSpy('MockOption');
            MockQuestion = jasmine.createSpy('MockQuestion');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Option': MockOption,
                'Question': MockQuestion
            };
            createController = function() {
                $injector.get('$controller')("OptionDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'feedyApp:optionUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
