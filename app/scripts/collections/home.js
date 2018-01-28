/*global define*/

define([
  'underscore',
  'backbone',
  'models/Home'
], function (_, Backbone, HomeModel) {
  'use strict';

  var HomeCollection = Backbone.Collection.extend({
    baseUrl: 'https://jsonplaceholder.typicode.com/posts/',
    model: HomeModel
  });

  return HomeCollection;
});
