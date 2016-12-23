var app = angular.module('flapperNews');

app.controller('AuthCtrl', function($scope, $state, auth) {
    $scope.user = {};

    $scope.register = function() { // Registratiefunctie, bij error geeft hij error terug en redirect naar home
        auth.register($scope.user).error(function(error) {
            $scope.error = error;
        }).then(function() {
            $state.go('home');
        });
    };

    $scope.logIn = function() { // Loginfunctie, bij error geeft hij error terug en redirect naar home
        auth.logIn($scope.user).error(function(error) {
            $scope.error = error;
        }).then(function() {
            $state.go('home');
        });
    };
});
