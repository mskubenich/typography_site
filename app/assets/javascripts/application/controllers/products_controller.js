(function () {

    "use strict";

    angular.module('TypographySiteApp')
        .controller('ProductsController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'ProductsFactory', 'CountryFlagsFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, products, flags) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.getHtml = function(html){
                    return $sce.trustAsHtml(html);
                };


                $scope.filters = {};

                if($state.current.name == 'products'){
                    $scope.product = [];

                    var timer = false;
                    $scope.$watch('filters', function(){
                        if(timer){
                            $timeout.cancel(timer)
                        }
                        timer= $timeout(function(){
                            $scope.retrieveProducts();
                        }, 500)
                    }, true);

                    $scope.page = 1;
                    $scope.retrieveProducts = function(){
                        products.all({page: $scope.page, query: $scope.filters}).success(function (data) {
                            $scope.products = data.products;
                            $scope.count = data.count;

                            var pagination = $('#products-pagination');
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
                                        $scope.retrieveProducts();
                                    }
                                })
                            }
                        }).error(function (data) {

                        });
                    };

                    $scope.retrieveProducts();
                }

                $scope.destroy = function(id){
                    var scope = $scope;
                    SweetAlert.swal({
                            title: "Are you sure?",
                            text: "Your will not be able to recover this product!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                            cancelButtonText: "No, cancel plx!",
                            closeOnConfirm: true,
                            closeOnCancel: true,
                            allowOutsideClick: true },
                        function(isConfirm){
                            if (isConfirm) {
                                products.destroy(id).success(function(){
                                    $scope.retrieveProducts();
                                });
                            } else {

                            }
                        }
                    );
                };

                if($state.current.name == 'new_product' || $state.current.name == 'edit_product'){

                    $scope.product = {};


                    if($state.current.name == 'edit_product'){
                        products.show($stateParams.id)
                            .success(function(data){
                                $timeout(function(){
                                    $scope.product = data.product;
                                }, 0);
                            }
                        )
                    }

                    $scope.submitProduct = function(){
                        $scope.submitted = true;
                        if($scope.ProductForm.$invalid ){
                            return false;
                        }

                        $scope.formPending = true;
                        products.upsert($scope.product)
                            .success(function(){
                                $scope.formPending = false;
                                $state.go('products')
                            })
                            .error(function(data){
                                $scope.validation_errors = data.errors;
                                $scope.formPending = false;
                            })
                    };
                }

                if($state.current.name == 'show_product'){
                    products.show($stateParams.id).success(function(data){
                        $scope.product = data.product;

                        $timeout(function() {
                            $('.product_images_slider').on('init', function(){
                                $(window).resize();
                            });
                            $scope.theCopulationSlider = $('.product_images_slider').slick({
                                dots: true,
                                infinite: true,
                                speed: 700,
                                autoplay: true,
                                arrows: true,
                                autoplaySpeed: 5000
                            });
                        }, 0);
                    });
                }
            }])

}());