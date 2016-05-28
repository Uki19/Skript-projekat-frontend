/**
 * Created by Uros Zivaljevic on 5/25/16.
 */
var app = angular.module('doctorsApp');


app.controller('users', function ($scope, $rootScope, $http, $location, resources, BASE_URL) {

    $scope.register = function () {
        var email = $scope.registerEmail;
        var password = $scope.registerPassword;
        var firstname = $scope.registerFirstName;
        var lastname = $scope.registerLastName;
        var city = $scope.registerCity;
        $http.post(BASE_URL+resources.userRegister,
            {
                firstname: firstname,
                lastname: lastname,
                password: password,
                email: email,
                city: city
            }).then(function (response) {
        }, function (response) {
            console.log(response.data);
        })
    }

    $scope.login = function() {
        var email = $scope.loginEmail;
        var password = $scope.loginPassword;
        console.log(email);
        console.log(password);
        $http.post(BASE_URL + resources.userLogin,
            {
                email: email,
                password: password
            })
            .then(function(response){
                $rootScope.currentUser = response.data;
                $location.path('/home');
            },
            function(response){
                console.log(response.data);
            })
    }

});