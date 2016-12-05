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