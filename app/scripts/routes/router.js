/*global define*/

define([
  'jquery',
  'backbone',
  'views/home'
], function ($, Backbone, Home) {
  'use strict';

  var AppRouter = Backbone.Router.extend({
    routes: {
      '':'homeView'
    }
  });

  var app_router = new AppRouter;
  
  app_router.on('route:homeView', function(actions) {
      var home = new Home();
      home.render();
  });

  return AppRouter;
});
