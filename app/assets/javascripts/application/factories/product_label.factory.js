(function () {
    'use strict';
    angular.module('TypographySiteApp').factory('ProductLabelsFactory', ['AuthHttp', function($http){
        return {

            upsert: function(product_label){
                var fd = new FormData();

                if(product_label.title){
                    fd.append('product_label[title]', product_label.title );
                }

                if(product_label.id){
                    return $http.put('/product_labels/' + product_label.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/product_labels', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                return $http.get('/product_labels.json?page=' + options.page);
            },

            show: function(id){
                return $http.get('/product_labels/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/product_labels/' + id)
            }
        }
    }])
}());