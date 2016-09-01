'use strict';

/**
 * @ngdoc service
 * @name mapAppApp.plottingService
 * @description
 * # plottingService
 * Service in the mapAppApp.
 */
angular.module('mapAppApp')
  .service('plottingService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.isOverlapping = function(planeCoordinates) {
    	var subjPlane = planeCoordinates[0];
    	var clipPlane = planeCoordinates[1];
    	if(checkOnSegmentPointsExists(subjPlane, clipPlane)) return true;
    	if(checkIntersectingLines(subjPlane, clipPlane)) return true;
    	return false;


    };
    function checkIntersectingLines(subjPlane, clipPlane)
    { 
    	var limit = 0;
    	var subjPointA, subjPointB;
    	var clipPointA, clipPointB;
    	var count = 0;
    	var lengthOfSubj = Object.keys(subjPlane).length,
    		lengthOfClip = Object.keys(clipPlane).length;

    	while(limit < lengthOfSubj)
    	{
    		subjPointA = subjPlane[limit];
    		subjPointB = (limit === lengthOfSubj - 1 ? subjPlane[0] : subjPlane[limit + 1]);
    		for(var i = 0; i < lengthOfClip ; i++)
    		{
    			clipPointA = clipPlane[i];
    			clipPointB = (i === lengthOfClip - 1 ? clipPlane[0] : clipPlane[i + 1] );
    			if( isIntersecting(subjPointA, clipPointA, subjPointB, clipPointB) ) {
    				count++;
    			}
    		}
    		limit++;
    	}
    	return (count > 0 ? true : false);
    };
    function isIntersecting(subjPointA , clipPointA, subjPointB, clipPointB) {
    	var orientation1 = getOrientation(subjPointA, clipPointA, subjPointB),
    		orientation2 = getOrientation(subjPointA, clipPointA, clipPointB),
    		orientation3 = getOrientation(subjPointB, clipPointB, subjPointA),
    		orientation4 = getOrientation(subjPointB, clipPointB, clipPointA);

    	if(orientation1 !== orientation2 && orientation3 !== orientation4) return true;
    	if(orientation1 + orientation2 + orientation3 + orientation4 <= 4) return false;
    	if(orientation1 === 0 && isPointOnSegment(subjPointA, subjPointB, clipPointA) ) return true;
    	if(orientation2 === 0 && isPointOnSegment(subjPointA, clipPointB, clipPointA) ) return true;
    	if(orientation3 === 0 && isPointOnSegment(subjPointB, subjPointA, clipPointB) ) return true;
    	if(orientation4 === 0 && isPointOnSegment(subjPointB, clipPointA, clipPointB) ) return true;

    	return false;
    }
    function checkOnSegmentPointsExists(subjPlane, clipPlane)
    {
    	var limit = 0;
    	var subjPointA, subjPointB;
    	var count = 0;
    	var lengthOfSubj = Object.keys(subjPlane).length,
    		lengthOfClip = Object.keys(clipPlane).length;

    	while(limit < lengthOfSubj)
    	{
    		subjPointA = subjPlane[limit];
    		subjPointB = (limit === lengthOfSubj - 1 ? subjPlane[0] : subjPlane[limit + 1]);
    		for(var i = 0; i < lengthOfClip ; i++)
    		{    			
    			if( isPointOnSegment(subjPointA, subjPointB, clipPlane[i]) ) {
    				count++;
    			}
    		}
    		limit++;
    	}
    	return (count > 0 ? true : false);
    };
    function checkIsInside(subjPlane, clipPlane)
    {

    }
    function getOrientation(subjPointA, subjPointB, clipPointA) {
    	var numOrientation = (Math.abs(subjPointB.longitude) - Math.abs(subjPointA.longitude)) * (Math.abs(clipPointA.latitude) - Math.abs(subjPointB.latitude)) -
    							(Math.abs(subjPointB.latitude) - Math.abs(subjPointA.latitude)) * (Math.abs(clipPointA.longitude) - Math.abs(subjPointB.longitude));
    	if( parseInt(numOrientation) === 0) return 0; // colinear
    	return (parseInt(numOrientation) > 0) ? 1 : 2 ; // 1 : clockwise, 2 : counterclockwish
    }

    function isPointOnSegment(subjPointA, subjPointB, clipPoint)
    {
    	if(	( clipPoint.latitude <= Math.max(subjPointA.latitude, subjPointB.latitude) && clipPoint.latitude >= Math.min(subjPointA.latitude, subjPointB.latitude)) &&
    		( clipPoint.longitude <= Math.max(subjPointA.longitude, subjPointB.longitude) && clipPoint.longitude >= Math.min(subjPointA.longitude, subjPointB.longitude) )
    	) {
    		return true;
    	}
    	return false;
    }
  });
