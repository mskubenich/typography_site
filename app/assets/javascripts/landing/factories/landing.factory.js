(function () {
    'use strict';
    angular.module('TypographySiteLandingApp').factory('LandingFactory', ['AuthHttp', function($http){
        return {
            get: function(){
                return $http.get('/landing');
            },
        }
    }])
}());