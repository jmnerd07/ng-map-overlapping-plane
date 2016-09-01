'use strict';

/**
 * @ngdoc overview
 * @name mapAppApp
 * @description
 * # mapAppApp
 *
 * Main module of the application.
 */
angular
  .module('mapAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/map.html',
        controller: 'MapCtrl',
        controllerAs: 'map'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
