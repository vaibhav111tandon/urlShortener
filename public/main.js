var app = angular.module('shortUrlApp', []);
app.controller('shortAppCtrl', ($scope) => {
    $scope.urlToShorten = 'Hello World';
});