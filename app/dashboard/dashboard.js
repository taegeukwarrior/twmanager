'use strict';

angular.module('twpati.dashboard', ['ngRoute', 'ngMaterial', 'firebase'])

.factory('Auth', ['$firebaseAuth',
  function($firebaseAuth) {
    return $firebaseAuth();
  }
])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/dashboard', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'dashboard'
  });
}])

.controller('dashboard', ['$scope', 'Auth',
  function($scope, Auth) {

  }
]);
