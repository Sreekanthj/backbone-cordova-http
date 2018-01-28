/*global require*/
'use strict';

require.config({
  shim: {
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    },
  },
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/lodash/dist/lodash',
    bootstrap: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap'  }
});

require([
  'backbone',
  'routes/router'
], function (Backbone, Router) {
  Backbone.history.start();

  var oldBackboneSync = Backbone.sync;

  function isPhoneGap() {
    return (window.cordova || window.PhoneGap || window.phonegap) 
    && /^file:\/{3}[^\/]/i.test(window.location.href) 
    && /ios|iphone|ipod|ipad|android/i.test(navigator.userAgent);
}


  Backbone.sync = function( method, model, options ) {

        if(method == "read"){

            if(isPhoneGap()){
                cordova.plugin.http.get(model.url, {}, { Origin: "null" }, function(response) {
                    // prints 200
                    console.log(response.status);
                    try {
                        console.log(response.data);
                        options.success(response.data);
                        if(model instanceof Backbone.Collection){
                            model.reset(JSON.parse(response.data));
                        }else{
                            model.set(JSON.parse(response.data));
                        }
                    } catch(e) {
                        console.error("JSON parsing error");
                    }
                }, function(response) {
                    console.log(response.status);
                    console.log(response.error);
                });
            }else{

                $.ajax({
                    type : 'GET',
                    url : model.url,
                    dataType : 'json',
                    success : function(data) {
                        console.log(data);
                        if(model instanceof Backbone.Collection){
                            model.reset(JSON.parse(JSON.stringify(data)));
                        }else{
                            model.set(JSON.parse(JSON.stringify(data)));
                        }
                    }
                });
            }
        }
  }
 
  var oldBackboneModel = Backbone.Model;

  Backbone.Model.prototype.fetchMobile = function(data){
    cordova.plugin.http.get(this.url, {}, { Origin: "null" }, function(response) {
        // prints 200
        console.log(response.status);
        try {
            console.log(response.data);
            //this.parse(JSON.parse(response.data));
        } catch(e) {
            console.error("JSON parsing error");
        }
    }, function(response) {
        console.log(response.status);
        console.log(response.error);
    });
      
  }

//   Backbone.Model.fetch = function(){
//     cordovaHTTP.post(url, data, { Origin: "null" }, function(response) {
//         // prints 200
//         console.log(response.status);
//         try {
//             console.log(response.data.message);
//         } catch(e) {
//             console.error("JSON parsing error");
//         }
//     }, function(response) {
//         console.log(response.status);
//         console.log(response.error);
//     });
//   }
});
