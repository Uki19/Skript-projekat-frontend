/**
 * Created by Uki on 8/28/16.
 */
var app = angular.module('doctorsApp');


app.controller('doctorRegistration', function ($scope, $rootScope, $http, $location, resources, BASE_URL) {


    $scope.newDoctor = {};

    $scope.postDoctor = function () {

        $scope.newDoctor.userId = $rootScope.currentUser.id;
        $http.post(BASE_URL + resources.doctors, $scope.newDoctor)
            .then(function (response) {
                $rootScope.currentUser.doctorId = response.data.id;
                console.log(response.data);
            });
    };

    $scope.getDoctorCategories = function () {
        $http.get(BASE_URL + resources.categories)
            .then(function (response) {
                $scope.allCategories = response.data;
            });
    };

    $scope.getOrdinations = function () {
        $http.get(BASE_URL + resources.ordinations)
            .then(function (response) {
                $scope.ordinations = response.data;
            });
    };


});