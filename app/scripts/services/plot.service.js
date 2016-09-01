'use strict';

/**
 * @ngdoc service
 * @name mapAppApp.plotService
 * @description
 * # plotService
 * Service in the mapAppApp.
 */
angular.module('mapAppApp')
  .service('plotService', function () {
    this._isOverlapping = function(coordinates, bounds) {
    	var finalCoord = [];
    	var countOverlap = 0;
    	for(var i in bounds[1])
    	{
    		var iPositionX = 0;
    		var positionDataX = [];
            var latitudesOrdered = Object.keys(coordinates[0].latitudes);
            latitudesOrdered.sort();

            var pointX = 0, pointY = 0;
            for(var iLat in latitudesOrdered)
            {
                if(Number(bounds[1][i].latitude) > Number(latitudesOrdered[iLat]) /*&& Number(bounds[1][i].latitude) < Number(latitudesOrdered[latitudesOrdered.length - 1])*/)
                {
                    pointX = iPositionX;
                    console.log('Position X: ' + pointX);
                }
                iPositionX++;
            }
            /*if(Number(latitudesOrdered[0]) < Number(bounds[1][i].latitude) || Number(bounds[1][i].latitude) < Number(latitudesOrdered[latitudesOrdered.length - 1]))
            {
                isX = true;
            }
            console.log(Number(latitudesOrdered[0]) < Number(bounds[1][i].latitude));*/
    		/*for(var iLat in latitudesOrdered)
    		{
                var x = Number(latitudesOrdered[iLat]);
    			console.log('x < bounds[1]['+ i + '].latitude => ' + x + ' < ' + bounds[1][i].latitude + ' = ' + (x <  bounds[1][i].latitude));

    			if(x <  bounds[1][i].latitude)
    			{
    				positionDataX.push( { 
    					latitude: bounds[1][i].latitude, 
    					position: iPositionX
    				});
    				iPositionX++;
    			}
                    console.log('position: ' + iPositionX );
    		}*/

    		var iPositionY = 0;
    		var positionDataY = [];
            var longitudesOrdered = Object.keys(coordinates[0].longitudes);
            longitudesOrdered.sort();
            for(var iLng in longitudesOrdered)
            {
                if(Number(bounds[1][i].longitude) > Number(longitudesOrdered[iLng]) /*&& Number(bounds[1][i].longitude) < Number(longitudesOrdered[longitudesOrdered.length - 1])*/)
                {
                    pointY = iPositionY;
                    console.log('Position Y: '+ pointY);
                }
                    iPositionY++;
            }
            /*if(Number(longitudesOrdered[0]) > Number(bounds[1][i].longitude) || Number(bounds[1][i].longitude) < Number(longitudesOrdered[longitudesOrdered.length - 1]))
            {
                isY = true;
            }
            console.log(Number(longitudesOrdered[0]) > Number(bounds[1][i].longitude));*/
    		/*for(var iLng in longitudesOrdered)
    		{
                var y = Number(longitudesOrdered[iLng]);
    			console.log('y < bounds[1]['+ i + '].longitude => ' + y + ' < ' + bounds[1][i].longitude + ' = ' + (y <  bounds[1][i].longitude));

    			if(Number(y) < bounds[1][i].longitude)
    			{
    				positionDataY.push( { 
    					longitude: bounds[1][i].longitude, 
    					position: iPositionY
    				});
    				iPositionY++;
    			}
                    console.log('position: ' + iPositionY );
    		}*/
    		/*if( (iPositionX < (coordinates[0].latitudes.length - 1) && iPositionX > 0) && (iPositionY < ( coordinates[0].longitudes.length - 1) && iPositionY > 0))
    		{
    			countOverlap += 1;

    		}*/
    		if((pointX > 0 && pointY > 0) && (pointY != pointX)) {
                countOverlap++;
            }
            else {
                countOverlap--;
            }
            console.log(' ----------- ');
    		finalCoord[i] = { x: positionDataX, y: positionDataY};
    	}

        console.log('Overlap: ' + countOverlap);
    	return (countOverlap > 0 ? true : false);
    }
  });