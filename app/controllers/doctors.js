/**
 * Created by Uros Zivaljevic on 5/22/16.
 */
var app = angular.module('doctorsApp');


app.controller('doctors', function ($scope, $rootScope, $http, $routeParams, BASE_URL, resources ) {

    $scope.getDoctors = function () {
        $scope.showLoadingIndicator = true;
        $http.get(BASE_URL + resources.doctors)
            .then(function (response) {
                $scope.showLoadingIndicator = false;
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

    // $scope.postDoctor = function () {
    //     var ordinationId = 1;
    //     var userId = $rootScope.currentUser.id;
    //     var newDoctor = {
    //         name: $scope.doctorName,
    //         description: $scope.doctorDesc,
    //         ordinationId: ordinationId,
    //         userId: userId
    //     };
    //     $scope.newDoctorOrdinationId = ordinationId;
    //     $http.post(BASE_URL + resources.doctors, newDoctor)
    //         .then(function (response) {
    //             console.log("added");
    //         });
    // };


    $scope.postDoctorReview = function() {
        console.log($rootScope.currentUser);
        var newReview = {
            title: $scope.title,
            comment: $scope.comment,
            stars: $scope.stars,
            authorId: $rootScope.currentUser.id,
            doctorId: $routeParams.id
        };
        $http.post(BASE_URL + resources.doctors + $routeParams.id + resources.reviews, newReview)
            .then(function(response){
                response.data.author = {
                    firstname: $rootScope.currentUser.firstname,
                    lastname: $rootScope.currentUser.lastname
                };
                $scope.doctor.reviews.push(response.data);
                // $scope.getDoctor();
            });
    }
});