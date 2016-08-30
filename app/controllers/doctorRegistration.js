/**
 * Created by Uki on 8/28/16.
 */
var app = angular.module('doctorsApp');


app.controller('doctorRegistration', function ($scope, $rootScope, $http, Upload, $location, resources, BASE_URL) {


    $scope.newDoctor = {};
    var imageFile = {};

    $scope.postDoctor = function (file) {

        $scope.newDoctor.userId = $rootScope.currentUser.id;
        console.log(imageFile);
        Upload.upload({
            url: BASE_URL + resources.doctors,
            data: {
                name: $scope.newDoctor.name,
                description: $scope.newDoctor.description,
                ordinationId: $scope.newDoctor.ordinationId,
                categoryId: $scope.newDoctor.categoryId,
                userId: $scope.newDoctor.userId,
                file: imageFile
            }
        }).then(function (response) {
            $scope.registrationSuccess = "Successfully registered!";
            $rootScope.currentUser.doctorId = response.data.id;
            console.log(response.data);
        }, function (response) {
            $scope.registrationError = "Failed to register!";
        });
    };

    $scope.getDoctorCategories = function () {
        $http.get(BASE_URL + resources.categories)
            .then(function (response) {
                $scope.allCategories = response.data;
            });
    };

    $scope.onFileSelect = function ($file) {
        imageFile = $file;
    };

    $scope.getOrdinations = function () {
        $http.get(BASE_URL + resources.ordinations)
            .then(function (response) {
                $scope.ordinations = response.data;
            });
    };


});