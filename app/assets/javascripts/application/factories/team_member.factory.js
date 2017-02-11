(function () {
    'use strict';
    angular.module('TypographySiteApp').factory('TeamMembersFactory', ['AuthHttp', function($http){
        return {

            upsert: function(team_member){
                var fd = new FormData();


                fd.append('team_member[photo][file]', team_member.photo.file );
                if(team_member.photo.id != undefined){
                    fd.append('team_member[photo][id]', team_member.photo.id );
                    fd.append('team_member[photo][removed]', !!team_member.photo.removed );
                }
                if(team_member.name){
                    fd.append('team_member[name]', team_member.name );
                }
                if(team_member.position){
                    fd.append('team_member[position]', team_member.position );
                }

                if(team_member.id){
                    return $http.put('/team_members/' + team_member.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/team_members', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                return $http.get('/team_members.json?page=' + options.page);
            },

            show: function(id){
                return $http.get('/team_members/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/team_members/' + id)
            }
        }
    }])
}());