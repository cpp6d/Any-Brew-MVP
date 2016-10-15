var app = angular.module('app', ['ngRoute']);

app.config($routeProvider=>{
	$routeProvider
	.when('/favorites', {
		templateUrl: 'views/favorites.html',
		controllers: 'MyFactory'
	})
	.when('/search', {
		templateUrl: 'views/search.html',
		controllers: 'MyFactory'
	})
	.otherwise({
		template: '<h1>Welcome to AnyBrew</h1>',
		controllers: 'MyFactory'
	})
});

app.factory('MyFactory', function($http){
	var addBrewery = function(entry){
		return $http.post('/',{
			'search': entry
		})
		.then(data=>{
			return data.data
		})	
	}

	var addFavorites = function(entry){
		return $http.post('/api/favorites' , {
			'favorites': entry
		})
		.then(data=>{
			console.log('return data for favorites',data)
		})
	};

	var getFavorites= function(){
		return $http.get('/api/favorites')
		.then(response=>{
			return response.data;
		})
	}

	return {addBrewery:addBrewery,addFavorites:addFavorites, getFavorites:getFavorites};	
})

app.controller('myController', ['$scope','MyFactory', function($scope, MyFactory){
	
	$scope.brewery=[];
	$scope.favorites=[];

	$scope.addBrewery = function(search){
		console.log($scope.favorites);
		MyFactory.addBrewery(search)
		.then(data=>{
			$scope.brewery = data;
		})
	}
	
	$scope.addFavorites = entry =>{
		MyFactory.addFavorites(entry);
	}
	
	$scope.getFavorites = () =>{
		MyFactory.getFavorites()
			.then(data=>{
				$scope.favorites=data;
			})
	}
}])
