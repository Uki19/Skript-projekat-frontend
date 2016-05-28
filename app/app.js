/**
 * Created by Uros Zivaljevic on 5/22/16.
 */
var app = angular.module('doctorsApp', ['ngRoute']);

// var baseUrl = "https://skript-projekat.herokuapp.com/api";
var baseUrl = "http://localhost:3000/api";

app.constant("BASE_URL", baseUrl);

app.value('resources',{
    userLogin:      "/users/login",
    userRegister:   "/users/register",
    doctors:        "/doctors/",
    ordinations:    "/ordinations/"
});

app.config(function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'registerLogin.html',
            controller: 'users'
        })
        .when('/home', {
            resolve: authenticationResolver,
            templateUrl: 'home.html',
            controller: 'doctors'
        })
        .when('/doctors', {
            templateUrl: 'doctorsPage.html',
            controller: 'doctors'
        })
        .when('/doctors/:id', {
            templateUrl: 'doctorPage.html',
            controller: 'doctors'
        })
        .when('/ordinations', {
            templateUrl: 'ordinationsPage.html',
            controller: 'ordinations'
        })
        .when('/ordinations/:id', {
            templateUrl: 'ordinationPage.html',
            controller: 'ordinations'
        })
        .otherwise({
            redirectTo: '/'
        });
});

var authenticationResolver = {
    "check": function ($location, $rootScope) {
        if (!$rootScope.currentUser)
            $location.path('/login');
    }
}
