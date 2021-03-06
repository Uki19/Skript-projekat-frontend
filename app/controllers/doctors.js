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

    $scope.getLatestDoctors = function () {
        console.log('test');
        $http.get(BASE_URL + resources.doctorsLatest)
            .then(function (response) {
                $scope.doctors = response.data;
            });
    };

    $scope.getDoctor = function() {
        $http.get(BASE_URL + resources.doctor + $routeParams.id)
            .then(function (response) {
                $scope.doctor = response.data;
            })
    };


    $scope.postDoctorReview = function() {
        var newReview = {
            title: $scope.title,
            comment: $scope.comment,
            stars: $scope.stars,
            authorId: $rootScope.currentUser.id,
            doctorId: $routeParams.id
        };
        $http.post(BASE_URL + resources.doctor + $routeParams.id + resources.reviews, newReview)
            .then(function(response){
                response.data.author = {
                    firstname: $rootScope.currentUser.firstname,
                    lastname: $rootScope.currentUser.lastname
                };
                $scope.doctor.reviews.push(response.data);
                $scope.postReviewSuccess = "Successfully added review";
            }, function (response) {
                $scope.postReviewFail = "Failed to post review";
            });
    };

    var selectedDate = {};

    $scope.bookDoctor = function (doctorId) {
        var userId = $rootScope.currentUser.id;
        $http.post(BASE_URL + resources.book,{
            userId: userId,
            doctorId: doctorId,
            date: $scope.selectedDate.date
        })
            .then(function () {
               $scope.showSuccess = true;
            });
    };

    $scope.getDoctorsReservations = function (callback) {
        $http.get(BASE_URL + resources.doctor + $routeParams.id + resources.doctorReservations)
            .then(function (response) {
               callback(response.data);
            });
    };

    $scope.getDoctorsByCategory = function () {
        var categoryId = $routeParams.categoryId;
        $http.get(BASE_URL + resources.doctors + resources.categories + categoryId)
            .then(function (response) {
                $scope.showLoadingIndicator = false;
                $scope.doctors = response.data;
                $scope.selectedCategory = $scope.doctors[0].category.name;
            });
    };

    $scope.initData = function () {
        if($routeParams.categoryId){
            $scope.getDoctorsByCategory();
        } else {
            $scope.getDoctors();
        }
    };

    //CALENDAR
    $scope.checkAvailability = function ($view, $dates, $leftDate, $upDate, $rightDate) {
        $scope.getDoctorsReservations(function (reservations) {
            for (var i = 0; i < $dates.length; i++) {
                $dates[i].utcDateValue -= (2*60*60*1000);
                if (i < 7 || i > 20) $dates[i].selectable = false;
                for(var j=0; j < reservations.length; j++){
                    if($dates[i].utcDateValue == reservations[j].date) {
                        $dates[i].selectable = false;
                    }
                }
            }
        });

    }

});