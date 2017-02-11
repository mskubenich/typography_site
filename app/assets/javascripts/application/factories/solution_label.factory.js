(function () {
    'use strict';
    angular.module('TypographySiteApp').factory('SolutionLabelsFactory', ['AuthHttp', function($http){
        return {

            upsert: function(solution_label){
                var fd = new FormData();

                if(solution_label.title){
                    fd.append('solution_label[title]', solution_label.title );
                }

                if(solution_label.id){
                    return $http.put('/solution_labels/' + solution_label.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/solution_labels', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                return $http.get('/solution_labels.json?page=' + options.page);
            },

            show: function(id){
                return $http.get('/solution_labels/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/solution_labels/' + id)
            }
        }
    }])
}());