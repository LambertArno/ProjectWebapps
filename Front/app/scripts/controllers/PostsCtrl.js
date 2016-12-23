var app = angular.module('flapperNews');

app.controller('PostsCtrl', function($scope, posts, post, auth) {
    $scope.post = post;
    $scope.currentUser = auth.currentUser();
    console.log(auth.currentUser());
    $scope.isLoggedIn = auth.isLoggedIn;
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
});
