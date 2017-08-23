/**
 * Created by Peter on 15.7.2017 г..
 */
'use strict';

angular.module('conFusion.services', ['ngResource'])
  .constant("baseURL","http://192.168.0.24:3000/") // in the NEXT module we change that to the SERVER LOCATION (IP Address)
  // MY IP IS:  192.168.0.103  and it replaces localhost above!!!!
  .factory('menuFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    return $resource(baseURL + "dishes/:id", null, {
      'update': {
        method: 'PUT'
      }
    });

  }])
  .factory('promotionFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
    return $resource(baseURL + "promotions/:id");

  }])
  .factory('$localStorage', ['$window', function($window) {
    return {
      store: function(key, value) {
        $window.localStorage[key] = value;
      },
      get: function(key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      storeObject: function(key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function(key,defaultValue) {
        return JSON.parse($window.localStorage[key] || defaultValue);
      }
    }
  }])
  .factory('corporateFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    return $resource(baseURL+"leadership/:id");
  }])
  .factory('feedbackFactory', ['$resource', 'baseURL', function($resource,baseURL) {


    return $resource(baseURL+"feedback/:id");

  }])
  .factory('favoriteFactory', ['$resource','$localStorage', 'baseURL', function ($resource, $localStorage,baseURL) {
    var favFac = {};
    var favorites = [];

    favFac.addToFavorites = function (index) {
      for (var i = 0; i < favorites.length; i++) {
        if (favorites[i].id == index)
          return;
      }
      favorites.push({id: index});
      favFac.storeFavorites();
      // TODO Add the popup for sucess here!
    };
    favFac.deleteFromFavorites = function (index) {
    var editableFavs = $localStorage.getObject('favorites', []);
      for (var i = 0; i < editableFavs.length; i++) {
        if (editableFavs[i].id == index) {
          editableFavs.splice(i, 1);
          favorites=editableFavs;
          favFac.storeFavorites();
          // TODO add the popup here!
        }
      }
    };
    favFac.storeFavorites = function () {
      $localStorage.storeObject('favorites', favorites);
    };

    favFac.getFavorites = function () {
      // $localStorage.getObject('favorites', []);
      return favorites;
    };

    return favFac;
  }]);

