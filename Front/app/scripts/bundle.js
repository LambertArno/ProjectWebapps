(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var app = angular.module('flapperNews', [
    'ngMaterial',
    'ui.router'
]);

var AUTH = require('./controllers/AuthCtrl.js'),
    NAV = require('./controllers/NavCtrl.js'),
    POSTS = require('./controllers/PostsCtrl.js'),
    MAIN = require('./controllers/MainCtrl.js'),
    CONFIG = require('./config.js'),
    AUTHFACT = require('./factories/authFactory.js'),
    POSTSFACT = require('./factories/postsFactory.js');
},{"./config.js":2,"./controllers/AuthCtrl.js":3,"./controllers/MainCtrl.js":4,"./controllers/NavCtrl.js":5,"./controllers/PostsCtrl.js":6,"./factories/authFactory.js":7,"./factories/postsFactory.js":8}],2:[function(require,module,exports){
var app = angular.module('flapperNews');

app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/home.html',
            controller: 'MainCtrl',
            resolve: {
                postPromise: ['posts',
                    function(posts) {
                        return posts.getAll();
                    }
                ]
            }
        }).state('posts', {
            url: '/posts/{id}',
            templateUrl: 'views/posts.html',
            controller: 'PostsCtrl',
            resolve: {
                post: ['$stateParams', 'posts',
                    function($stateParams, posts) {
                        return posts.get($stateParams.id);
                    }
                ]
            }
        }).state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'AuthCtrl',
            onEnter: ['$state', 'auth',
                function($state, auth) {
                    if (auth.isLoggedIn()) {
                        $state.go('home');
                    }
                }
            ]
        })
        .state('register', {
            url: '/register',
            templateUrl: 'views/register.html',
            controller: 'AuthCtrl',
            onEnter: ['$state', 'auth',
                function($state, auth) {
                    if (auth.isLoggedIn()) {
                        $state.go('home');
                    }
                }
            ]
        });

    $urlRouterProvider.otherwise('/');
});

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
var app = angular.module('flapperNews');

app.controller('MainCtrl', function($scope, posts, auth) {
    $scope.posts = posts.posts; // Alle posts
    $scope.isLoggedIn = auth.isLoggedIn; // Om te weten of user mag posten
    $scope.addPost = function() {
        if (!$scope.title || $scope.title === '' || !$scope.content || $scope.content === '') {
            return;
        }
        posts.create({
            title: $scope.title,
            link: $scope.link,
            content: $scope.content,
        });
        $scope.title = '';
        $scope.link = '';
        $scope.content = '';
    };
    $scope.incrementUpvotes = function(post) {
        posts.upvote(post);
    };
    $scope.incrementDownvotes = function(post) {
        posts.downvote(post);
    };
}).directive('copyright',function(){ // Directive voor de copyright tekst
    return {
        template: 'Copyright © 2016 The Business Network | Powered by <a class="designed-by" href="http://www.aldesign.be" target="_blank">AL Design</a>'
    };
}).directive('voettekst', function(){ // Directive om de footer weer te geven
  return {
    templateUrl: "./views/footer-directive.html"
  };
});

},{}],5:[function(require,module,exports){
var app = angular.module('flapperNews');
app.controller('NavCtrl', function($scope, auth) {
    $scope.isLoggedIn = auth.isLoggedIn; // Voor de juiste weergave van de navbar
    $scope.currentUser = auth.currentUser; // Voor de naam van de user in de navbar
    $scope.logOut = auth.logOut; // Logoutfunctie
});

},{}],6:[function(require,module,exports){
var app = angular.module('flapperNews');

app.controller('PostsCtrl', function($state, $scope, posts, post, auth) {
    $scope.post = post;
    $scope.currentUser = auth.currentUser(); // Om te kijken of user kan deleten
    $scope.isLoggedIn = auth.isLoggedIn; // Om te weten of user mag reageren
    $scope.addComment = function() {
        if ($scope.body === '') {
            return;
        }
        posts.addComment(post._id, {
            body: $scope.body,
            author: "",
        }).success(function(comment) {
            $scope.post.comments.push(comment);
        });
        $scope.body = '';
    };
    $scope.incrementUpvotes = function(comment) {
        posts.upvoteComment(post, comment);
    };
    $scope.incrementDownvotes = function(comment) {
        posts.downvoteComment(post, comment);
    };
    $scope.deletePost = function() {
      posts.removePost(post).success($state.go('home'));
    };
});

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
var app = angular.module('flapperNews');

app.factory('posts', function($http, auth) {
    var o = {
        posts: []
    };
    o.getAll = function() { // Haalt alle posts op
        return $http.get('http://localhost:3000/posts/').success(function(data) {
            angular.copy(data, o.posts);
        });
    };
    o.create = function(post) { // Creërt post
        return $http.post('http://localhost:3000/posts/', post, {
            headers: {
                Authorization: 'Bearer ' + auth.getToken()
            }
        }).success(function(data) { // Bij succes, pusht data naar db
            o.posts.push(data);
        });
    };
    o.upvote = function(post) { // Doet upvote op post
        return $http.put('http://localhost:3000/posts/' + post._id + '/upvote', null, {
            headers: {
                Authorization: 'Bearer ' + auth.getToken()
            }
        }).success(function(data) { // Bij succes, upvotes + 1
            post.upvotes += 1;
        });
    };
    o.downvote = function(post) { // Doet downvote op post
        return $http.put('http://localhost:3000/posts/' + post._id + '/downvote', null, {
            headers: {
                Authorization: 'Bearer ' + auth.getToken()
            }
        }).success(function(data) { // Bij succes, downvotes + 1
            post.downvotes += 1;
        });
    };
    o.get = function(id) { // Haalt 1 post op
        return $http.get('http://localhost:3000/posts/' + id).then(function(res) {
            return res.data;
        });
    };
    o.addComment = function(id, comment) { // Voegt comment toe aan post
        return $http.post('http://localhost:3000/posts/' + id + '/comments', comment, {
            headers: {
                Authorization: 'Bearer ' + auth.getToken()
            }
        });
    };

    o.upvoteComment = function(post, comment) { // Doet upvote op comment
        return $http.put('http://localhost:3000/posts/' + post._id + '/comments/' + comment._id + '/upvote', null, {
            headers: {
                Authorization: 'Bearer ' + auth.getToken()
            }
        }).success(function(data) { // Bij succes, comment upvotes + 1
            comment.upvotes += 1;
        });
    };
    o.downvoteComment = function(post, comment) { // Doet downvote op comment
        return $http.put('http://localhost:3000/posts/' + post._id + '/comments/' + comment._id + '/downvote', null, {
            headers: {
                Authorization: 'Bearer ' + auth.getToken()
            }
        }).success(function(data) { // Bij succes, comment downvotes - 1
            comment.downvotes += 1;
        });
    };
    o.removePost = function(post) { // Deletefunctie
      return $http.get('http://localhost:3000/posts/' + post._id + '/delete');
    };
    return o;
});

},{}]},{},[1]);
