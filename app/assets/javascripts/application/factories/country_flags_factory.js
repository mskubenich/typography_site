(function () {
    'use strict';
    angular.module('TypographySiteApp').factory('CountryFlagsFactory', ['$http', function($http){
        return {
            all: function(){
                var request = '/country_flags.json';
                return $http.get(request);
            }
        }
    }])
}());