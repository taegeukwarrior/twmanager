'use strict';

// Declare app level module which depends on views, and components
angular.module('twpati', [
  'ngRoute',
  'twpati.home'
])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.otherwise({
    redirectTo: '/home'
  })
}])
