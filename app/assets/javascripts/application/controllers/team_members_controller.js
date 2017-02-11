(function () {

    "use strict";

    angular.module('TypographySiteApp')
        .controller('TeamMembersController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'TeamMembersFactory', 'CountryFlagsFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, team_members, flags) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.getHtml = function(html){
                    return $sce.trustAsHtml(html);
                };


                $scope.filters = {};

                if($state.current.name == 'team_members'){
                    $scope.team_member = [];

                    var timer = false;
                    $scope.$watch('filters', function(){
                        if(timer){
                            $timeout.cancel(timer)
                        }
                        timer= $timeout(function(){
                            $scope.retrieveTeamMembers();
                        }, 500)
                    }, true);

                    $scope.page = 1;
                    $scope.retrieveTeamMembers = function(){
                        team_members.all({page: $scope.page, query: $scope.filters}).success(function (data) {
                            $scope.team_members = data.team_members;
                            $scope.count = data.count;

                            var pagination = $('#team_members-pagination');
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
                                        $scope.retrieveTeamMembers();
                                    }
                                })
                            }
                        }).error(function (data) {

                        });
                    };

                    $scope.retrieveTeamMembers();
                }

                $scope.destroy = function(id){
                    var scope = $scope;
                    SweetAlert.swal({
                            title: "Are you sure?",
                            text: "Your will not be able to recover this team_member!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                            cancelButtonText: "No, cancel plx!",
                            closeOnConfirm: true,
                            closeOnCancel: true,
                            allowOutsideClick: true },
                        function(isConfirm){
                            if (isConfirm) {
                                team_members.destroy(id).success(function(){
                                    $scope.retrieveTeamMembers();
                                });
                            } else {

                            }
                        }
                    );
                };

                if($state.current.name == 'new_team_member' || $state.current.name == 'edit_team_member'){

                    $scope.team_member = {};


                    if($state.current.name == 'edit_team_member'){
                        team_members.show($stateParams.id)
                            .success(function(data){
                                $timeout(function(){
                                    $scope.team_member = data.team_member;
                                }, 0);
                            }
                        )
                    }

                    $scope.submitTeamMember = function(){
                        $scope.submitted = true;
                        if($scope.TeamMemberForm.$invalid ){
                            return false;
                        }

                        $scope.formPending = true;
                        team_members.upsert($scope.team_member)
                            .success(function(){
                                $scope.formPending = false;
                                $state.go('team_members')
                            })
                            .error(function(data){
                                $scope.validation_errors = data.errors;
                                $scope.formPending = false;
                            })
                    };
                }

                if($state.current.name == 'show_team_member'){
                    team_members.show($stateParams.id).success(function(data){
                        $scope.team_member = data.team_member;

                    });
                }
            }])

}());