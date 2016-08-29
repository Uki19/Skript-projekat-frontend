/**
 * Created by Uros Zivaljevic on 5/22/16.
 */
var app = angular.module('doctorsApp', ['ngRoute', 'ui.bootstrap.datetimepicker', 'ngFileUpload']);

//var baseUrl = "https://skript-projekat.herokuapp.com/api";
var baseUrl = "http://localhost:3000/api";

app.constant("BASE_URL", baseUrl);

app.value('resources', {
    userLogin:      "/users/login",
    userRegister:   "/users/register",
    doctors:        "/doctors/",
    reviews:        "/reviews/",
    ordinations:    "/ordinations/",
    articles:    "/articles/",
    categories:     "/categories/",
    book:           "/book/",
    doctorReservations: "/reservations/",
    myProfile:      "/users/",
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
            // resolve: authenticationResolver,
            templateUrl: 'doctorsPage.html',
            controller: 'doctors'
        })
        .when('/doctors/:id', {
            // resolve: authenticationResolver,
            templateUrl: 'doctorPage.html',
            controller: 'doctors'
        })
        .when('/ordinations', {
            // resolve: authenticationResolver,
            templateUrl: 'ordinationsPage.html',
            controller: 'ordinations'
        })
        .when('/ordinations/:id', {
            // resolve: authenticationResolver,
            templateUrl: 'ordinationPage.html',
            controller: 'ordinations'
        })
        .when('/registerDoctor', {
            // resolve: authenticationResolver,
            templateUrl: 'registerDoctor.html',
            controller: 'doctorRegistration'
        })
        .when('/myProfile', {
            // resolve: authenticationResolver,
            templateUrl: 'profile.html',
            controller: 'users'
        })
        .when('/articles', {
            // resolve: authenticationResolver,
            templateUrl: 'articlesPage.html',
            controller: 'articles'
        })
        .when('/articles/:id', {
            // resolve: authenticationResolver,
            templateUrl: 'articlePage.html',
            controller: 'articles'
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
