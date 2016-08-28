/**
 * Created by Uki on 8/28/16.
 */
var app = angular.module('doctorsApp');


app.controller('doctorRegistration', function ($scope, $rootScope, $http, $location, resources, BASE_URL) {


    $scope.postDoctor = function () {
        var ordinationId = 1;
        var userId = $rootScope.currentUser.id;
        var newDoctor = {
            name: $scope.doctorName,
            description: $scope.doctorDesc,
            ordinationId: ordinationId,
            userId: userId
        };
        $scope.newDoctorOrdinationId = ordinationId;
        $http.post(BASE_URL + resources.doctors, newDoctor)
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

    //temp
    $scope.getOrdinations = function () {
        $http.get(BASE_URL + resources.ordinations)
            .then(function (response) {
                $scope.ordinations = response.data;
            });
    };


});