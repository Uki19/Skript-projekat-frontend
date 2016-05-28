/**
 * Created by Uros Zivaljevic on 5/22/16.
 */
var app = angular.module('doctorsApp');


app.controller('doctors', function ($scope, $http, $routeParams, resources, BASE_URL) {

    $scope.getDoctors = function () {
        $http.get(BASE_URL + resources.doctors)
            .then(function (response) {
                $scope.doctors = response.data;
            });
    };

    $scope.getDoctor = function() {
        console.log($routeParams.id);
        $http.get(BASE_URL + resources.doctors + $routeParams.id)
            .then(function (response) {
                $scope.doctor = response.data;
            })
    };

    $scope.postDoctor = function () {
        var ordinationId = 1;
        var newDoctor = {
            name: $scope.newDoctorName,
            description: $scope.newDoctorDescription,
            ordinationId: $scope.newDoctorOrdinationId
        };
        $scope.newDoctorOrdinationId = ordinationId;
        $http.post(BASE_URL + resources.doctors, $scope.newDoctor)
            .then(function (response) {
                $scope.doctors.push(newDoctor);
                console.log(response);
            })
    }
});