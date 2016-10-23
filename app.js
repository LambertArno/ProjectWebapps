var app = angular.module('projectGarage', ['ui.router']);

app.factory('autos', [function () {
    var o = {
        autos: [
            {merk: 'audi', type: 'A5'}
        ]
    };
    return o;
}])





app.controller('MainCtrl', [
'$scope',
'autos',
function ($scope, autos) {

}]);

app.controller('HomeCtrl', [
    '$scope',
    'autos',
    function ($scope, autos) {
        
    }
])

app.controller('ShowroomCtrl', [
    '$scope',
    'autos',
    function ($scope, autos) {
        $scope.autos = autos.autos;
    }
]);






//ROUTERS

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl'
        })
        
        .state('showroom', {
            url: '/showroom',
            templateUrl: 'views/showroom.html',
            controller: 'ShowroomCtrl'
        });
        
        $urlRouterProvider.otherwise('home');
        
    }
]);