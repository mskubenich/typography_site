(function () {

    "use strict";

    angular.module('TypographySiteApp')
        .controller('ProductLabelsController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'ProductLabelsFactory', 'CountryFlagsFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, product_labels, flags) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.getHtml = function(html){
                    return $sce.trustAsHtml(html);
                };


                $scope.filters = {};

                if($state.current.name == 'product_labels'){
                    $scope.product_label = [];

                    var timer = false;
                    $scope.$watch('filters', function(){
                        if(timer){
                            $timeout.cancel(timer)
                        }
                        timer= $timeout(function(){
                            $scope.retrieveProductLabels();
                        }, 500)
                    }, true);

                    $scope.page = 1;
                    $scope.retrieveProductLabels = function(){
                        product_labels.all({page: $scope.page, query: $scope.filters}).success(function (data) {
                            $scope.product_labels = data.product_labels;
                            $scope.count = data.count;

                            var pagination = $('#product_labels-pagination');
                            pagination.empty();
                            pagination.removeData('twbs-pagination');
                            pagination.unbind('page');

                            if($scope.count > 0){
                                pagination.twbsPagination({
                                    totalPages: Math.ceil($scope.count / 9),
                                    startPage: $scope.page,
                                    visiblePages: 9,
                                    onPageClick: function (event, page) {
                                        $scope.page = page;
                                        $scope.retrieveProductLabels();
                                    }
                                })
                            }
                        }).error(function (data) {

                        });
                    };

                    $scope.retrieveProductLabels();
                }

                $scope.destroy = function(id){
                    var scope = $scope;
                    SweetAlert.swal({
                            title: "Are you sure?",
                            text: "Your will not be able to recover this product_label!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                            cancelButtonText: "No, cancel plx!",
                            closeOnConfirm: true,
                            closeOnCancel: true,
                            allowOutsideClick: true },
                        function(isConfirm){
                            if (isConfirm) {
                                product_labels.destroy(id).success(function(){
                                    $scope.retrieveProductLabels();
                                });
                            } else {

                            }
                        }
                    );
                };

                if($state.current.name == 'new_product_label' || $state.current.name == 'edit_product_label'){

                    $scope.product_label = {};


                    if($state.current.name == 'edit_product_label'){
                        product_labels.show($stateParams.id)
                            .success(function(data){
                                $timeout(function(){
                                    $scope.product_label = data.product_label;
                                }, 0);
                            }
                        )
                    }

                    $scope.submitProductLabel = function(){
                        $scope.submitted = true;
                        if($scope.ProductLabelForm.$invalid ){
                            return false;
                        }

                        $scope.formPending = true;
                        product_labels.upsert($scope.product_label)
                            .success(function(){
                                $scope.formPending = false;
                                $state.go('product_labels')
                            })
                            .error(function(data){
                                $scope.validation_errors = data.errors;
                                $scope.formPending = false;
                            })
                    };
                }

                if($state.current.name == 'show_product_label'){
                    product_labels.show($stateParams.id).success(function(data){
                        $scope.product_label = data.product_label;

                    });
                }
            }])

}());