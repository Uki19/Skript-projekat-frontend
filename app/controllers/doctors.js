/**
 * Created by Uros Zivaljevic on 5/22/16.
 */
var app = angular.module('doctorsApp');


app.controller('doctors', function ($scope, $rootScope, $http, $routeParams, BASE_URL, resources ) {

    var hours = {
        "12:00 AM": 1,
        "1:00 AM": 2,
        "2:00 AM": 3,
        "3:00 AM": 4,
        "4:00 AM": 5,
        "5:00 AM": 6,
        "6:00 AM": 7,
        "7:00 AM": 8,
        "8:00 AM": 9,
        "9:00 AM": 10,
        "10:00 AM": 11,
        "11:00 AM": 12,
        "12:00 PM": 13,
        "1:00 PM": 14,
        "2:00 PM": 15,
        "3:00 PM": 16,
        "4:00 PM": 17,
        "5:00 PM": 18,
        "6:00 PM": 19,
        "7:00 PM": 20,
        "8:00 PM": 21,
        "9:00 PM": 22,
        "10:00 PM": 23,
        "11:00 PM": 24
    };


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
    };

    var selectedDate = {};

    $scope.bookDoctor = function (doctorId) {
        var userId = $rootScope.currentUser.id;
        var selectedHour = $scope.selectedDate.date;
        var hourId = hours[selectedHour];
        $http.post(BASE_URL + resources.book,{
            userId: userId,
            doctorId: doctorId,
            hourId: hourId
        })
            .then(function () {
               $scope.showSuccess = true;
            });
    };

    $scope.selectedHour = function (newDate, oldDate) {
        console.log(newDate);
    };

    $scope.getDoctorsReservations = function (callback) {
        $http.get(BASE_URL + resources.doctors + $routeParams.id + resources.doctorReservations)
            .then(function (response) {
               callback(response.data);
            });
    };

    //CALENDAR
    $scope.checkAvailability = function ($view, $dates, $leftDate, $upDate, $rightDate) {
        $scope.getDoctorsReservations(function (reservations) {
            for (var i = 0; i < $dates.length; i++) {
                if (i < 7 || i > 20) $dates[i].selectable = false;
            }
            reservations.forEach(function (reservation) {
                $dates[reservation.hourId-1].selectable = false;
            });
        });

    }

});