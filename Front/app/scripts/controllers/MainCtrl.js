var app = angular.module('flapperNews');

app.controller('MainCtrl', function($scope, posts, auth) {
    $scope.posts = posts.posts;
    $scope.isLoggedIn = auth.isLoggedIn;
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
});
