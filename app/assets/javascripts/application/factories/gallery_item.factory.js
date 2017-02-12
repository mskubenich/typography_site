(function () {
    'use strict';
    angular.module('TypographySiteApp').factory('GalleryItemsFactory', ['AuthHttp', function($http){
        return {

            upsert: function(gallery_item){
                var fd = new FormData();

                if(gallery_item.image && gallery_item.image.file ){
                    fd.append('gallery_item[image]', gallery_item.image.file );
                }
                fd.append('gallery_item[description]', gallery_item.description || '');

                if(gallery_item.id){
                    return $http.put('/gallery_items/' + gallery_item.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/gallery_items', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                return $http.get('/gallery_items.json?page=' + options.page);
            },

            show: function(id){
                return $http.get('/gallery_items/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/gallery_items/' + id)
            }
        }
    }])
}());