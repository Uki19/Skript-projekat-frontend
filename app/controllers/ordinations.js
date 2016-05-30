/**
 * Created by Uros Zivaljevic on 5/22/16.
 */
var app = angular.module('doctorsApp');

app.controller('ordinations', function ($scope, $http, $routeParams, BASE_URL, resources) {

    $scope.getOrdinations = function () {
        $scope.showLoadingIndicator = true;
        $http.get(BASE_URL + resources.ordinations)
            .then(function (response) {
                $scope.ordinations = response.data;
                $scope.showLoadingIndicator = false;
            })
    };

    $scope.getOrdination = function () {
        $http.get(BASE_URL + resources.ordinations + $routeParams.id)
            .then(function (response) {
                $scope.ordination = response.data;
            });
    }
});