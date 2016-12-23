var app = angular.module('flapperNews');

app.factory('auth', function($http, $window) {
    var auth = {};
    auth.saveToken = function(token) { // Token opslaan in localstorage
        $window.localStorage['flapper-news-token'] = token;
    };

    auth.getToken = function() { // Token ophalen
        return $window.localStorage['flapper-news-token'];
    };
    auth.isLoggedIn = function() { // Controle of een user aangemeld is
        var token = auth.getToken();

        if (token) {
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };
    auth.currentUser = function() { // Geeft de username van de huidig aangemelde gebruiker terug
        if (auth.isLoggedIn()) {
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.username;
        }
    };
    auth.register = function(user) { // Functie om te registreren
        return $http.post('http://localhost:3000/users/register', user).success(function(data) {
            auth.saveToken(data.token);
        });
    };
    auth.logIn = function(user) { // Functie om aan te melden
        return $http.post('http://localhost:3000/users/login/', user, {
            headers: {
                Authorization: 'Bearer ' + auth.getToken(),
            }
        }).success(function(data) { // Bij succesvolle login slaat token op
            auth.saveToken(data.token);
        });
    };
    auth.logOut = function() { // Afmeldfunctie, verwijdert token uit localStorage
        $window.localStorage.removeItem('flapper-news-token');
        auth.remove('flapper-news-token');
    };
    return auth;
});
