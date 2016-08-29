/**
 * Created by Uki on 8/29/16.
 */
var app = angular.module('doctorsApp');

app.controller('articles', function ($scope, $http, $routeParams, BASE_URL, resources) {

    $scope.getArticles = function () {
        $scope.showLoadingIndicator = true;
        $http.get(BASE_URL + resources.articles)
            .then(function (response) {
                $scope.articles = response.data;
                $scope.showLoadingIndicator = false;
            })
    };

    $scope.getArticle = function () {
        $http.get(BASE_URL + resources.articles + $routeParams.id)
            .then(function (response) {
                $scope.article = response.data;
            });
    }
});