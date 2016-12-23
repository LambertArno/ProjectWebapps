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
