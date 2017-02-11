(function () {

    "use strict";

    angular.module('TypographySiteApp')
        .controller('OrdersController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'OrdersFactory', 'CountryFlagsFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, orders, flags) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.getHtml = function(html){
                    return $sce.trustAsHtml(html);
                };


                $scope.filters = {};

                if($state.current.name == 'orders'){
                    $scope.order = [];

                    var timer = false;
                    $scope.$watch('filters', function(){
                        if(timer){
                            $timeout.cancel(timer)
                        }
                        timer= $timeout(function(){
                            $scope.retrieveOrders();
                        }, 500)
                    }, true);

                    $scope.page = 1;
                    $scope.retrieveOrders = function(){
                        orders.all({page: $scope.page, query: $scope.filters}).success(function (data) {
                            $scope.orders = data.orders;
                            $scope.count = data.count;

                            var pagination = $('#orders-pagination');
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
                                        $scope.retrieveOrders();
                                    }
                                })
                            }
                        }).error(function (data) {

                        });
                    };

                    $scope.retrieveOrders();
                }

                $scope.destroy = function(id){
                    var scope = $scope;
                    SweetAlert.swal({
                            title: "Are you sure?",
                            text: "Your will not be able to recover this order!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                            cancelButtonText: "No, cancel plx!",
                            closeOnConfirm: true,
                            closeOnCancel: true,
                            allowOutsideClick: true },
                        function(isConfirm){
                            if (isConfirm) {
                                orders.destroy(id).success(function(){
                                    $scope.retrieveOrders();
                                });
                            } else {

                            }
                        }
                    );
                };

                if($state.current.name == 'new_order' || $state.current.name == 'edit_order'){

                    $scope.order = {};


                    if($state.current.name == 'edit_order'){
                        orders.show($stateParams.id)
                            .success(function(data){
                                $timeout(function(){
                                    $scope.order = data.order;
                                }, 0);
                            }
                        )
                    }

                    $scope.submitOrder = function(){
                        $scope.submitted = true;
                        if($scope.OrderForm.$invalid ){
                            return false;
                        }

                        $scope.formPending = true;
                        orders.upsert($scope.order)
                            .success(function(){
                                $scope.formPending = false;
                                $state.go('orders')
                            })
                            .error(function(data){
                                $scope.validation_errors = data.errors;
                                $scope.formPending = false;
                            })
                    };
                }

                if($state.current.name == 'show_order'){
                    orders.show($stateParams.id).success(function(data){
                        $scope.order = data.order;

                    });
                }
            }])

}());