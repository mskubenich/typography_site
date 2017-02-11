(function () {

    "use strict";

    angular.module('TypographySiteApp')
        .controller('SolutionLabelsController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'SolutionLabelsFactory', 'CountryFlagsFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, solution_labels, flags) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.getHtml = function(html){
                    return $sce.trustAsHtml(html);
                };


                $scope.filters = {};

                if($state.current.name == 'solution_labels'){
                    $scope.solution_label = [];

                    var timer = false;
                    $scope.$watch('filters', function(){
                        if(timer){
                            $timeout.cancel(timer)
                        }
                        timer= $timeout(function(){
                            $scope.retrieveSolutionLabels();
                        }, 500)
                    }, true);

                    $scope.page = 1;
                    $scope.retrieveSolutionLabels = function(){
                        solution_labels.all({page: $scope.page, query: $scope.filters}).success(function (data) {
                            $scope.solution_labels = data.solution_labels;
                            $scope.count = data.count;

                            var pagination = $('#solution_labels-pagination');
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
                                        $scope.retrieveSolutionLabels();
                                    }
                                })
                            }
                        }).error(function (data) {

                        });
                    };

                    $scope.retrieveSolutionLabels();
                }

                $scope.destroy = function(id){
                    var scope = $scope;
                    SweetAlert.swal({
                            title: "Are you sure?",
                            text: "Your will not be able to recover this solution_label!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                            cancelButtonText: "No, cancel plx!",
                            closeOnConfirm: true,
                            closeOnCancel: true,
                            allowOutsideClick: true },
                        function(isConfirm){
                            if (isConfirm) {
                                solution_labels.destroy(id).success(function(){
                                    $scope.retrieveSolutionLabels();
                                });
                            } else {

                            }
                        }
                    );
                };

                if($state.current.name == 'new_solution_label' || $state.current.name == 'edit_solution_label'){

                    $scope.solution_label = {};


                    if($state.current.name == 'edit_solution_label'){
                        solution_labels.show($stateParams.id)
                            .success(function(data){
                                $timeout(function(){
                                    $scope.solution_label = data.solution_label;
                                }, 0);
                            }
                        )
                    }

                    $scope.submitSolutionLabel = function(){
                        $scope.submitted = true;
                        if($scope.SolutionLabelForm.$invalid ){
                            return false;
                        }

                        $scope.formPending = true;
                        solution_labels.upsert($scope.solution_label)
                            .success(function(){
                                $scope.formPending = false;
                                $state.go('solution_labels')
                            })
                            .error(function(data){
                                $scope.validation_errors = data.errors;
                                $scope.formPending = false;
                            })
                    };
                }

                if($state.current.name == 'show_solution_label'){
                    solution_labels.show($stateParams.id).success(function(data){
                        $scope.solution_label = data.solution_label;

                    });
                }
            }])

}());