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
      posts.removePost(post);
    }
});
