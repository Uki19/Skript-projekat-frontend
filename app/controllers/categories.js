/**
 * Created by Uki on 8/28/16.
 */
var app = angular.module('doctorsApp');


app.controller('categories', function ($scope, $rootScope, $http, Upload, $location, resources, BASE_URL) {


    $scope.getDoctorCategories = function () {
        $http.get(BASE_URL + resources.categories)
            .then(function (response) {
                $scope.allCategories = response.data;
            });
    };

});