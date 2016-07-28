'use strict';

angular.module('twpati.home', ['ngRoute', 'ngMaterial', 'firebase'])

.factory('Auth', ['$firebaseAuth',
  function($firebaseAuth) {
    return $firebaseAuth();
  }
])

.run(['$rootScope', '$location', function($rootScope, $location){
  $rootScope.$on('$routeChangeError', function(event, next, previous, error){
    if(error === "AUTH_REQUIRED") {
      $location.path('/home');
    }
  });
}])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/home', {
    templateUrl: 'landing_home/home.html',
    controller: 'homeCtrl',
    resolve: {
      'currentAuth' : ['Auth', function(Auth){
        return Auth.$waitForSignIn();
      }]
    }
  }).when('/dashboard', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'dashboard',
    resolve: {
      'currentAuth' : ['Auth', function(Auth){
        return Auth.$requireSignIn();
      }]
    }
  });
}])

.controller('homeCtrl', ['$scope', '$mdSidenav', '$mdDialog', 'Auth', 'currentAuth',
  function($scope, $mdSidenav, $mdDialog, Auth, currentAuth) {

    /** Sidenav Controller **/
    $scope.sideClick = function() {
      $mdSidenav('left').toggle();
    };

    $scope.closeSide = function() {
      $mdSidenav('left').close();
    };

    /** Login Dialog Controller **/

    $scope.loginDialog = function($event) {
      $mdDialog.show({
        controller: loginDialogCtrl,
        templateUrl: 'dialog/loginDialog.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        clickOutsideToClose: true
      });
    };

    function loginDialogCtrl($scope, $mdDialog, $mdToast, Auth) {

      var fireAuth = Auth;

      $scope.signIn = function() {
        var email = $scope.users.email;
        var pass = $scope.users.pwd;

        $scope.email = null;
        $scope.error = null;

        fireAuth.$signInWithEmailAndPassword(email, pass)
        .then(function(firebaseUser){
          console.log("Sign In as :", firebaseUser.email);
        })
        .catch(function(error){
          console.log(error.message);
          $mdToast.showSimple(error.message);
        });
      }



    };
  }
]);
