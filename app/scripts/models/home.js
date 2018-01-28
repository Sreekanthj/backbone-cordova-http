/*global define*/

define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var HomeModel = Backbone.Model.extend({
    url: 'https://jsonplaceholder.typicode.com/posts/',

    initialize: function() {
    },

    defaults: {
    },

    validate: function(attrs, options) {
    },

    parse: function(response, options)  {
      return response;
    }
  });

  return HomeModel;
});
