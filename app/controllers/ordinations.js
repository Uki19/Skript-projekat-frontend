/**
 * Created by Uros Zivaljevic on 5/22/16.
 */
var app = angular.module('doctorsApp');

app.controller('ordinations', function ($scope, $http, BASE_URL, resources) {
    $http.get(BASE_URL + resources.ordinations)
        .then(function (response) {
            $scope.ordinations = response.data;
        })
});