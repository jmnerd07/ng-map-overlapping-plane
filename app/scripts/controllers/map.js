'use strict';

/**
 * @ngdoc function
 * @name mapAppApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the mapAppApp
 */
angular.module('mapAppApp')
  .controller('MapCtrl', ['$scope', 'plottingService', function ($scope, plottingService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.title = 'Map';
    var vm = this;
	vm.onMapOverlayCompleted = function(e){
		var pointVertices = e.overlay.getPath().b;
		var bounds = {};
		var latitudes = {};
		var longitudes = {};
		if(typeof pointVertices !== 'object')
		{
			return console.log('Error: line 23');
		}
		window.bounds = (typeof window.bounds === 'object' ? window.bounds : []);

		window.polygons =  (typeof window.polygons === 'object' ? window.polygons : []);
		for(var i in pointVertices) {
			bounds[i] = {'latitude': pointVertices[i].toJSON().lat, 'longitude': pointVertices[i].toJSON().lng };	
		
			latitudes[ pointVertices[i].toJSON().lat ] = i;
			longitudes[ pointVertices[i].toJSON().lng ] = i; 		
		}
		
		window.polygons[ window.polygons.length ] = bounds;

		window.bounds[window.bounds.length] = {latitudes: latitudes, longitudes: longitudes };
		
		if(window.polygons.length === 2) {
			console.log( window.polygons );
			console.log(plottingService.isOverlapping(window.polygons));
			window.bounds = [];
			window.polygons = [];
		}
	};

  }]);
