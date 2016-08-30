/**
 * Created by Uros Zivaljevic on 5/25/16.
 */
var app = angular.module('doctorsApp');


app.controller('users', function ($scope, $rootScope, $http, $location, resources, Upload, BASE_URL) {

    var imageFile = {};

    $scope.register = function () {
        var email = $scope.registerEmail;
        var password = $scope.registerPassword;
        var firstname = $scope.registerFirstName;
        var lastname = $scope.registerLastName;
        var city = $scope.registerCity;
        Upload.upload({
            url: BASE_URL+resources.userRegister,
            data: {
                firstname: firstname,
                lastname: lastname,
                password: password,
                email: email,
                city: city,
                file: imageFile
            }
        }).then(function (response) {
            if(response.status == 201){
                $scope.registrationSuccess = "success";
            }
        }, function (response) {
            $scope.registrationError = response.data;
        });
    };

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
                    if(response.status == 200) {
                        $scope.loginSuccess = "success";
                        $rootScope.currentUser = response.data;
                        console.log($rootScope.currentUser);
                        $location.path('/home');
                    }



            },
            function(response){
                $scope.loginError = response.data;
            })
    };

    $scope.getMyUser = function () {
        var userId = $rootScope.currentUser.id;
        $http.get(BASE_URL + resources.myProfile + userId)
            .then(function (response) {
                $scope.user = response.data;
            })
    };

    $scope.onFileSelect = function($file){
        imageFile = $file;
    }

});