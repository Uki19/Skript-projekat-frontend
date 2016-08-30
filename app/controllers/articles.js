/**
 * Created by Uki on 8/29/16.
 */
var app = angular.module('doctorsApp');

app.controller('articles', function ($scope, $http, $routeParams, BASE_URL, resources, $rootScope) {

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
    };

    $scope.getLatestArticles = function () {
        $http.get(BASE_URL + resources.articlesLatest)
            .then(function (response) {
                $scope.articles = response.data;
            });
    };

    $scope.newArticle = {};

    $scope.postArticle = function () {
        $scope.newArticle.doctorId = $rootScope.currentUser.doctorId;
        $http.post(BASE_URL + resources.articles, $scope.newArticle)
            .then(function (response) {
                if(response.status == 201) {
                    $scope.article = response.data;
                    $scope.addArticleSuccess = "successfully added article!";
                }
            }, function (response) {
                $scope.addArticleFail = "failed to add article!";
            });
    }

});