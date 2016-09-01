'use strict';

describe('Service: plottingService', function () {

  // load the service's module
  beforeEach(module('mapAppApp'));

  // instantiate service
  var plottingService;
  beforeEach(inject(function (_plottingService_) {
    plottingService = _plottingService_;
  }));

  it('should do something', function () {
    expect(!!plottingService).toBe(true);
  });
/*  it('should show 1', function() {
    expect(plottingService.isOverlapping({
      "0": 
        { "0": { latitude: 1 : longitude: 1 }, "1" : { latitude: 3 , longitude: 5 } }, 
      "1": 
        {"0": { latitude: 2, longitude: 4 } }  
    })).toBe(1);
  })*/
});
