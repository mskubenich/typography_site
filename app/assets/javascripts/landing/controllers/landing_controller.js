(function () {

    "use strict";

    angular.module('TypographySiteLandingApp')
        .controller('LandingController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce',
            'toaster', 'LandingFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, toaster, landing) {

                landing.get().success(function(data){
                   $scope.gallery_items = data.gallery_items
                });

                $scope.myInterval = 5000;
                $scope.noWrapSlides = false;
                $scope.active = 0;
                var gallery_items = $scope.gallery_items = [];
                var currIndex = 0;

            }])
}());