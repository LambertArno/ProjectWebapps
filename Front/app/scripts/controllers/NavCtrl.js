var app = angular.module('flapperNews');
app.controller('NavCtrl', function($scope, auth) {
    $scope.isLoggedIn = auth.isLoggedIn; // Voor de juiste weergave van de navbar
    $scope.currentUser = auth.currentUser; // Voor de naam van de user in de navbar
    $scope.logOut = auth.logOut; // Logoutfunctie
});
